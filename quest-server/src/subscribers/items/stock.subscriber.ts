import { AocSubscriber } from "@atlantis-of-code/aoc-server";
import {
  ChangeSet,
  ChangeSetType,
  EntityManager,
  EntityName,
  EventArgs,
  EventSubscriber,
  FlushEventArgs
} from '@mikro-orm/core';
import Big from 'big.js';
import { addMilliseconds, compareAsc, format, isAfter, isEqual } from 'date-fns';
import { DeliveryNote } from '../../entities/invoicing/delivery-note';
import { StockLine } from '../../entities/invoicing/stock-line';
import { Ticket } from '../../entities/invoicing/ticket';
import { Item } from '../../entities/items/item';
import { Stock } from '../../entities/items/stock';
import { StockCount } from '../../entities/items/stock-count';
import { StockLog, StockTransferType } from '../../entities/items/stock-log';
import { Store } from '../../entities/items/store';
import { StoreTransfer } from '../../entities/items/store-transfer';
import { StoreTransferLine } from '../../entities/items/store-transfer-line';

@AocSubscriber
export class StockSubscriber implements EventSubscriber<Item | Store> {
  getSubscribedEntities(): EntityName<Item | Store>[] {
    return [Item, Store];
  }

  async afterCreate(args: EventArgs<Item | Store>) {
    const entity = args.entity;
    if (entity instanceof Item) {
      await this.createStockFromNewItem(entity, args.em);
    } else {
      await this.createStockFromNewStore(entity, args.em);
    }
  }

  private async createStockFromNewItem(item: Item, em: EntityManager) {
    const stores = await em.find(Store, {});
    const data: Partial<Stock>[] = stores.map(store => ({item, store, quantity: '0'}));;
    await em.insertMany(Stock, data);
  }

  private async createStockFromNewStore(store: Store, em: EntityManager) {
    const items = await em.find(Item, {});
    const data: Partial<Stock>[] = items.map(item => ({item, store, quantity: '0'}));
    await em.insertMany(Stock, data);
  }

  async onFlush(args: FlushEventArgs) {
    // Process new store transfers (basically assign the same date when creating them)
    await this.processNewStoreTransfers(args);
    // Process new store transfer lines (generate new stock logs)
    await this.processNewStoreTransferLines(args);
    // Process updated store transfer lines
    await this.processUpdatesOnStoreTransferLines(args);
    // Process deleted store transfer lines
    await this.processDeletionsOnStoreTransferLines(args);
    // Process new stock lines (from ticket or delivery notes)
    await this.processNewStockLines(args);
    // Process updated stock lines
    await this.processUpdatesOnStockLines(args);
    // Process deleted stock lines
    await this.processDeletionsOnStockLines(args)
    // Process new generated stock logs
    await this.processStockLogs(args);
  }

  private async processNewStoreTransfers(args: FlushEventArgs) {
    const changeSets: ChangeSet<Partial<StoreTransfer>>[] = args.uow.getChangeSets().filter(cs => cs.entity instanceof StoreTransfer && cs.type === ChangeSetType.CREATE);
    for (const cs of changeSets) {
      cs.entity.date = args.em.getTransactionContext().date;
    }
  }

  private async processNewStoreTransferLines(args: FlushEventArgs) {
    const changeSets: ChangeSet<Partial<StoreTransferLine>>[] = args.uow.getChangeSets().filter(cs => cs.entity instanceof StoreTransferLine && cs.type === ChangeSetType.CREATE);
    for (const cs of changeSets) {
      const storeTransferLine = cs.entity as StoreTransferLine;
      const storeTransfer = this.getParentDocumentFromLine(storeTransferLine, args);
      const sourceStockLog = new StockLog();
      sourceStockLog.store = storeTransferLine.storeTransfer.sourceStore;
      sourceStockLog.item = storeTransferLine.item;
      sourceStockLog.storeTransferLine = storeTransferLine;
      sourceStockLog.quantity = Big(storeTransferLine.quantity).neg().toString();
      sourceStockLog.date = args.em.getTransactionContext().date;
      sourceStockLog.type = 'Transfer';
      sourceStockLog.document_name = await this.getDocumentName(storeTransfer, args);
      sourceStockLog.document_operation = this.getDocumentOperation(storeTransfer, args);
      sourceStockLog.description = 'New inter-warehouse transfer line (source)';
      sourceStockLog.previous_stock = Number.MAX_SAFE_INTEGER.toString();
      args.uow.computeChangeSet(sourceStockLog);

      const targetStockLog = new StockLog();
      targetStockLog.storeTransferLine = storeTransferLine;
      targetStockLog.item = storeTransferLine.item;
      targetStockLog.store = storeTransferLine.storeTransfer.targetStore;
      targetStockLog.quantity = storeTransferLine.quantity;
      targetStockLog.date = args.em.getTransactionContext().date;
      targetStockLog.type = 'Transfer';
      targetStockLog.document_name = await this.getDocumentName(storeTransfer, args);
      targetStockLog.document_operation = sourceStockLog.document_operation;
      targetStockLog.description = "New inter-warehouse transfer line (target)";
      targetStockLog.previous_stock = Number.MAX_SAFE_INTEGER.toString();
      args.uow.computeChangeSet(targetStockLog);

      args.uow.recomputeSingleChangeSet(storeTransferLine);
    }
  }

  private async processUpdatesOnStoreTransferLines(args: FlushEventArgs) {
    const changeSets: ChangeSet<Partial<StoreTransferLine>>[] = args.uow.getChangeSets().filter(cs => cs.entity instanceof StoreTransferLine && [ChangeSetType.UPDATE, ChangeSetType.UPDATE_EARLY].includes(cs.type));
    for (const cs of changeSets) {
      const storeTransferLine = cs.entity;
      const prevStoreTransferLine = cs.originalEntity;
      const storeTransfer = this.getParentDocumentFromLine(storeTransferLine, args) as StoreTransfer;
      const prevStoreTransfer = await args.em.fork().findOne(StoreTransfer, { id: storeTransfer.id });
      const documentOperation = this.getDocumentOperation(storeTransfer, args);
      if (storeTransfer.sourceStore.id !== prevStoreTransfer.sourceStore.id || !Big(storeTransferLine.quantity ?? '0').eq(prevStoreTransferLine.quantity)) {
        const stockLogCorrection = new StockLog();
        stockLogCorrection.store = prevStoreTransfer.sourceStore;
        stockLogCorrection.item = await args.em.findOne(Item, { id: prevStoreTransferLine.item as any });
        stockLogCorrection.date = args.em.getTransactionContext().date;
        stockLogCorrection.document_operation = documentOperation;
        stockLogCorrection.storeTransferLine = storeTransferLine as StoreTransferLine;
        stockLogCorrection.previous_stock = '0';
        stockLogCorrection.type = 'Transfer';
        stockLogCorrection.quantity = prevStoreTransferLine.quantity;
        stockLogCorrection.document_name = await this.getDocumentName(storeTransfer, args);
        stockLogCorrection.description = 'Correction of transfer line between warehouses (source)';
        args.uow.computeChangeSet(stockLogCorrection);
        const newStockLog = new StockLog();
        newStockLog.store = storeTransfer.sourceStore;
        newStockLog.item = storeTransferLine.item;
        newStockLog.date = args.em.getTransactionContext().date;
        newStockLog.document_operation = documentOperation;
        newStockLog.storeTransferLine = storeTransferLine as StoreTransferLine;
        newStockLog.previous_stock = '0';
        newStockLog.type = 'Transfer';
        newStockLog.quantity = Big(storeTransferLine.quantity).neg().toString();
        newStockLog.document_name = await this.getDocumentName(storeTransfer, args);
        newStockLog.description = 'Update transfer line between warehouses (source)';
        args.uow.computeChangeSet(newStockLog);
      }
      if (storeTransfer.targetStore.id !== prevStoreTransfer.targetStore.id || !Big(storeTransferLine.quantity ?? '0').eq(prevStoreTransferLine.quantity)) {
        const stockLogCorrection = new StockLog();
        stockLogCorrection.store = prevStoreTransfer.targetStore;
        stockLogCorrection.item = await args.em.findOne(Item, { id: prevStoreTransferLine.item as any });
        stockLogCorrection.date = args.em.getTransactionContext().date;
        stockLogCorrection.document_operation = documentOperation;
        stockLogCorrection.storeTransferLine = storeTransferLine as StoreTransferLine;
        stockLogCorrection.previous_stock = '0';
        stockLogCorrection.type = 'Transfer';
        stockLogCorrection.quantity = Big(prevStoreTransferLine.quantity).neg().toString();
        stockLogCorrection.document_name = await this.getDocumentName(storeTransfer, args);
        stockLogCorrection.description = 'Correction of transfer line between warehouses (target)';
        args.uow.computeChangeSet(stockLogCorrection);
        const newStockLog = new StockLog();
        newStockLog.store = storeTransfer.targetStore;
        newStockLog.item = storeTransferLine.item;
        newStockLog.date = args.em.getTransactionContext().date;
        newStockLog.document_operation = documentOperation;
        newStockLog.storeTransferLine = storeTransferLine as StoreTransferLine;
        newStockLog.previous_stock = '0';
        newStockLog.type = 'Transfer';
        newStockLog.quantity = storeTransferLine.quantity;
        newStockLog.document_name = await this.getDocumentName(storeTransfer, args);
        newStockLog.description = 'Update transfer line between warehouses (target)';
        args.uow.computeChangeSet(newStockLog);
      }
    }
  }

  async processDeletionsOnStoreTransferLines(args: FlushEventArgs) {
    const changeSets: ChangeSet<Partial<StoreTransferLine>>[] = args.uow.getChangeSets().filter(cs => cs.entity instanceof StoreTransferLine && cs.entity.item && [ChangeSetType.DELETE, ChangeSetType.DELETE_EARLY].includes(cs.type));
    for (const cs of changeSets) {
      const storeTransferLine = cs.entity;
      const traspasoEstoc = this.getParentDocumentFromLine(storeTransferLine, args) as StoreTransfer;
      const documentOperation = this.getDocumentOperation(traspasoEstoc, args);
      const originalStoreTransfer = await args.em.fork().findOne(StoreTransfer, {id: traspasoEstoc.id});
      const documentName = await this.getDocumentName(originalStoreTransfer, args);
      const originalStoreTransferLine = await args.em.fork().findOne(StoreTransferLine, { id: storeTransferLine.id });
      const sourceStockLogCorrection = new StockLog();
      sourceStockLogCorrection.storeTransferLine = originalStoreTransferLine;
      sourceStockLogCorrection.type = 'Transfer';
      sourceStockLogCorrection.date = args.em.getTransactionContext().date;
      sourceStockLogCorrection.item = originalStoreTransferLine.item;
      sourceStockLogCorrection.store = originalStoreTransfer.sourceStore;
      sourceStockLogCorrection.quantity = originalStoreTransferLine.quantity;
      sourceStockLogCorrection.document_operation = documentOperation;
      sourceStockLogCorrection.document_name = documentName;
      sourceStockLogCorrection.description = `Correction of transfer line between warehouses by deletion (source)`;
      args.uow.computeChangeSet(sourceStockLogCorrection);
      const targetStockLogCorrection = new StockLog();
      targetStockLogCorrection.storeTransferLine = originalStoreTransferLine;
      targetStockLogCorrection.type = 'Transfer';
      targetStockLogCorrection.date = args.em.getTransactionContext().date;
      targetStockLogCorrection.item = originalStoreTransferLine.item;
      targetStockLogCorrection.store = originalStoreTransfer.targetStore;
      targetStockLogCorrection.quantity = Big(originalStoreTransferLine.quantity).neg().toString();
      targetStockLogCorrection.document_operation = documentOperation;
      targetStockLogCorrection.document_name = documentName;
      targetStockLogCorrection.description = `Correction of transfer line between warehouses by deletion (target)`;
      args.uow.computeChangeSet(targetStockLogCorrection);
    }
  }

  private async processNewStockLines(args: FlushEventArgs) {
    const changeSets: ChangeSet<Partial<StockLine>>[] =
      args.uow.getChangeSets().filter(cs => cs.entity instanceof StockLine && cs.entity.item && cs.entity.store && cs.type === ChangeSetType.CREATE);
    for (const cs of changeSets) {
      const stockLine = cs.entity;
      const document = this.getParentDocumentFromLine(stockLine, args);
      // Creamos un nuevo movimiento de estoc
      const stockLog = new StockLog();
      stockLog.stockLine = stockLine as StockLine;
      stockLog.item = stockLine.item;
      stockLog.store = stockLine.store;
      stockLog.date = args.em.getTransactionContext().date;
      stockLog.quantity = Big(stockLine.quantity).mul('-1').toString();
      stockLog.type = document instanceof DeliveryNote ? 'Delivery note' : 'Ticket';
      stockLog.document_name = await this.getDocumentName(document, args);
      stockLog.customer_name = await this.getCustomerName(document, args);
      stockLog.document_operation = this.getDocumentOperation(document, args);
      stockLog.description = `New stock line (#${stockLine.order})`;
      stockLog.previous_stock = Number.MAX_SAFE_INTEGER.toString();
      args.uow.computeChangeSet(stockLog);
      args.uow.recomputeSingleChangeSet(stockLine);
    }
  }

  private async processUpdatesOnStockLines(args: FlushEventArgs) {
    const changeSets: ChangeSet<Partial<StockLine>>[] =
      args.uow.getChangeSets().filter(cs => cs.entity instanceof StockLine && cs.entity.item && cs.entity.store && [ChangeSetType.UPDATE, ChangeSetType.UPDATE_EARLY].includes(cs.type));
    for (const cs of changeSets) {
      const stockLine = cs.entity;
      // We check for changes in the warehouse; if there are any, we need to generate two movements,
      // one for correction on the original warehouse and another new one for the new warehouse.
      // There will be no need to check the quantities anymore. If the quantity has changed,
      // a correction movement on the same warehouse will be sufficient.
      if (StockLine.field.QUANTITY in cs.payload || StockLine.entity.STORE in cs.payload) {
        const document = this.getParentDocumentFromLine(stockLine, args);
        const type: StockTransferType = document instanceof DeliveryNote ? 'Delivery note' : 'Ticket';
        const documentOperation = this.getDocumentOperation(document, args);
        const previousDocument = await args.em.fork().findOne(document.constructor, {id: document.id}, {populate: ['fiscalYear', 'customer']});
        const previousDocumentName = await this.getDocumentName(previousDocument, args);
        const previousCustomerName = await this.getCustomerName(previousDocument, args);
        const correctionStockLog = new StockLog();
        correctionStockLog.stockLine = stockLine as StockLine;
        correctionStockLog.type = type;
        correctionStockLog.document_operation = documentOperation;
        correctionStockLog.document_name = previousDocumentName;
        correctionStockLog.customer_name = previousCustomerName;
        correctionStockLog.date = args.em.getTransactionContext().date;
        correctionStockLog.item = stockLine.item;
        correctionStockLog.store = await args.em.findOne(Store, { id: cs.originalEntity.store as string});
        correctionStockLog.quantity = cs.originalEntity.quantity;
        correctionStockLog.description = `Correction of stock line (#${stockLine.order}) due to modification`;
        args.uow.computeChangeSet(correctionStockLog);
        const newDocumentName = await this.getDocumentName(document, args);
        const newCustomerName = await this.getCustomerName(document, args);
        const newStockLog = new StockLog();
        newStockLog.stockLine = stockLine as StockLine;
        newStockLog.type = type;
        newStockLog.document_operation = documentOperation;
        newStockLog.document_name = newDocumentName;
        newStockLog.customer_name = newCustomerName;
        newStockLog.date = addMilliseconds(correctionStockLog.date, 1);
        newStockLog.item = stockLine.item;
        newStockLog.store = stockLine.store;
        newStockLog.quantity = Big(stockLine.quantity).neg().toString();
        newStockLog.description = `Update stock line (#${stockLine.order}) due to modification`
        args.uow.computeChangeSet(newStockLog);
      }
    }
  }

  async processDeletionsOnStockLines(args: FlushEventArgs) {
    const changeSets: ChangeSet<Partial<StockLine>>[] =
      args.uow.getChangeSets().filter(cs => cs.entity instanceof StockLine && cs.entity.item && cs.entity.store && [ChangeSetType.DELETE, ChangeSetType.DELETE_EARLY].includes(cs.type));
    for (const cs of changeSets) {
      const stockLine = cs.entity;
      const document = await this.getParentDocumentFromLine(stockLine, args);
      const documentOperation = this.getDocumentOperation(document, args);
      const documentName = await this.getDocumentName(document, args);
      const customerName = await this.getCustomerName(document, args);
      const type: StockTransferType = document instanceof DeliveryNote ? 'Delivery note' : 'Ticket';
      const originalStockLine = await args.em.fork().findOne(StockLine, { id: stockLine.id });
      const stockLogCorrection = new StockLog();
      stockLogCorrection.stockLine = originalStockLine;
      stockLogCorrection.type = type;
      stockLogCorrection.date = args.em.getTransactionContext().date;
      stockLogCorrection.item = originalStockLine.item;
      stockLogCorrection.store = originalStockLine.store;
      stockLogCorrection.quantity = originalStockLine.quantity;
      stockLogCorrection.document_operation = documentOperation;
      stockLogCorrection.document_name = documentName;
      stockLogCorrection.customer_name = customerName;
      stockLogCorrection.description = `Correction of stock line (#${stockLine.order}) due to deletion`;
      args.uow.computeChangeSet(stockLogCorrection);
    }
  }

  private async processStockLogs(args: FlushEventArgs) {
    const changeSets: ChangeSet<Partial<StockLog>>[] = args.uow.getChangeSets().filter(cs => cs.entity instanceof StockLog);
    const changeSetGroup: Map<Store, Map<Item, ChangeSet<Partial<StockLog>>[]>> = this.groupStockLogsByStoreAndItem(changeSets);
    for (const [store, map] of changeSetGroup.entries()) {
      for (const [item, subChangeSets] of map.entries()) {
        await this.processStockLogsByStoreAndItem(store, item, subChangeSets, args);
      }
    }
  }

  /**
   * This method groups stock log changests by store and item
   * @param changeSets
   * @private
   */
  private groupStockLogsByStoreAndItem(changeSets: ChangeSet<Partial<StockLog>>[]): Map<Store, Map<Item, ChangeSet<Partial<StockLog>>[]>> {
    return changeSets.reduce((map, cs) => {
      const store = cs.entity.store;
      const item = cs.entity.item;
      if (!map.has(store)) {
        map.set(store, new Map());
      }
      if (!map.get(store).has(item)) {
        map.get(store).set(item, []);
      }
      map.get(store).get(item).push(cs);
      return map;
    }, new Map<Store, Map<Item, ChangeSet<Partial<StockLog>>[]>>());
  }

  /**
   * Process stock logs for the same store and item
   * @param store
   * @param item
   * @param changeSets
   * @param args
   * @private
   */
  private async processStockLogsByStoreAndItem(store: Store, item: Item, changeSets: ChangeSet<Partial<StockLog>>[], args: FlushEventArgs) {
    try {
      // Map stock logs to change sets or database loading to distinguish their origin.
      const csMap = changeSets.reduce((acc, cs) => {
        acc.set(cs.entity, cs);
        return acc;
      }, new Map<Partial<StockLog>, ChangeSet<Partial<StockLog>>>());
      // To determine the minimum date of stock logs, we need to consider both the change sets and the database. These changes should be triggered from the previous stock log date up to the minimum date found.
      let minDate: Date = changeSets.reduce((min: Date, cs) => {
        if (!min || isAfter(min, cs.entity.date)) {
          min = cs.entity.date;
        }
        return min;
      }, undefined);

      const updateIds = changeSets.filter(cs => [ChangeSetType.UPDATE, ChangeSetType.UPDATE_EARLY].includes(cs.type)).map(cs => cs.entity.id);
      const deleteIds = changeSets.filter(cs => [ChangeSetType.DELETE, ChangeSetType.DELETE_EARLY].includes(cs.type)).map(cs => cs.entity.id);
      const emForked = args.em.fork();
      const stockLogFromDatabaseWithMinDate = await emForked.findOne(StockLog, { id: {$in: updateIds.concat(deleteIds) }, store, item}, {orderBy: { date: 'asc' }});
      if (stockLogFromDatabaseWithMinDate && isAfter(minDate, stockLogFromDatabaseWithMinDate.date)) {
        minDate = stockLogFromDatabaseWithMinDate.date;
      }
      // With the minimum date determined, we can now find the previous stock log, which marks the starting point for stock propagation.
      const previousStockLog = await emForked.findOne(StockLog, {date: {$lt: minDate}, store, item}, {orderBy: { date: 'desc' }});
      let nextStockFromPreviusStockLog = Big('0');
      if (previousStockLog) {
        nextStockFromPreviusStockLog = Big(previousStockLog.quantity);
        if (previousStockLog.type !== 'Count') {
          nextStockFromPreviusStockLog = nextStockFromPreviusStockLog.plus(previousStockLog.previous_stock ?? '0');
        }
      }
      // Select stock logs from the database that are not in the change set, as they will be impacted by stock propagation.
      const databaseStockLogs = await args.em.find(StockLog, { store, item, date: {$gte: minDate}, id: {$nin: updateIds.concat(deleteIds) }});
      // Combine the database stock logs with the change set stock logs, sort them by date, and exclude the stock logs marked for deletion during processing.
      const stockLogsToBeProcessed = Array.from(csMap.keys()).filter(me => ![ChangeSetType.DELETE, ChangeSetType.DELETE_EARLY].includes(csMap.get(me).type)).concat(databaseStockLogs as any); // 'as any' => Problemas con el Partial
      stockLogsToBeProcessed.sort((sl1, sl2) => {
        if (isEqual(sl1.date, sl2.date)) {
          const id1 = sl1.id ?? Number.MAX_SAFE_INTEGER;
          const id2 = sl2.id ?? Number.MAX_SAFE_INTEGER;
          return Big(id1).cmp(id2);
        }
        return compareAsc(sl1.date, sl2.date)
      });
      // Perform stock logs processing
      for (const stockLog of stockLogsToBeProcessed) {
        stockLog.previous_stock = nextStockFromPreviusStockLog.toString();
        if (stockLog.type === 'Count') {
          nextStockFromPreviusStockLog = Big(stockLog.quantity);
        } else {
          nextStockFromPreviusStockLog = nextStockFromPreviusStockLog.plus(stockLog.quantity);
        }
        if (csMap.has(stockLog)) {
          args.uow.recomputeSingleChangeSet(stockLog);
        } else {
          args.uow.computeChangeSet(stockLog);
        }
      }
      // Update the stock using the latest stock log
      const stock = await args.em.findOne(Stock, { store, item });
      stock.quantity = nextStockFromPreviusStockLog.toString();
      args.uow.computeChangeSet(stock);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  /**
   * Copied from the client-side DocumentPipe. Returns "$$PENDING_PROCESS$$" if we don't yet have an assigned
   * invoice number (flush occurs earlier). Therefore, we should assign it "after create" for the stock movement.
   * @param document
   * @param args
   * @private
   */
  async getDocumentName(document: DeliveryNote | Ticket | StoreTransfer | StockCount, args: FlushEventArgs) {
    if (document instanceof StoreTransfer || document instanceof StockCount) {
      return format(document.date, 'yyyy/dd/MM HH:mm:ss');
    } else {
      if (!document?.number) {
        return undefined;
      }
      await args.em.populate(document, ['fiscalYear']);
      return `${document.fiscalYear? document.fiscalYear?.year + '/' : '' }${document.series?.name ?? ''}${document.number?.toString().padStart(5, '0') ?? '#####'}`;
    }
  }

  private getDocumentOperation(entity: DeliveryNote | Ticket | StoreTransfer, args: FlushEventArgs): string {
    const cs = args.uow.getChangeSets().find(cs => cs.entity === entity);
    if (cs) {
      if (cs.type === ChangeSetType.CREATE) {
        return 'New';
      }
      if ([ChangeSetType.UPDATE, ChangeSetType.UPDATE_EARLY].includes(cs.type)) {
        return 'Update';
      }
      return 'Deletion'
    }
    return 'No changes';
  }

  /**
   * Find the parent document for a given line.
   * @param line
   * @param args
   * @private
   */
  private getParentDocumentFromLine(line: Partial<StockLine | StoreTransferLine>, args: FlushEventArgs): DeliveryNote | Ticket | StoreTransfer {
    let deliveryNoteList: DeliveryNote[] = Array.from(args.uow.getIdentityMap().getStore(args.em.getMetadata().get(DeliveryNote.name)).values());
    deliveryNoteList = deliveryNoteList.concat(args.uow.getChangeSets().filter(cs => cs.entity instanceof DeliveryNote).map(cs => cs.entity) as DeliveryNote[]);
    for (const deliveryNote of deliveryNoteList) {
      for (const stockLine of deliveryNote.stockLineLineCollection) {
        if (stockLine === line) {
          return deliveryNote;
        }
      }
    }
    let ticketList: Ticket[] = Array.from(args.uow.getIdentityMap().getStore(args.em.getMetadata().get(Ticket.name)).values());
    ticketList = ticketList.concat(args.uow.getChangeSets().filter(cs => cs.entity instanceof Ticket).map(cs => cs.entity) as Ticket[]);
    for (const ticket of ticketList) {
      for (const stockLine of ticket.stockLineLineCollection) {
        if (stockLine === line) {
          return ticket;
        }
      }
    }
    let storeTransferList: StoreTransfer[] = Array.from(args.uow.getIdentityMap().getStore(args.em.getMetadata().get(StoreTransfer.name)).values());
    storeTransferList = storeTransferList.concat(args.uow.getChangeSets().filter(cs => cs.entity instanceof StoreTransfer).map(cs => cs.entity) as StoreTransfer[]);
    for (const storeTransfer of storeTransferList) {
      for (const storeTransferLine of storeTransfer.storeTransferLineCollection) {
        if (storeTransferLine === line) {
          return storeTransfer;
        }
      }
    }
    return undefined;
  }

  async getCustomerName(document: Partial<DeliveryNote | Ticket>, args: FlushEventArgs) {
    if (!document) {
      return undefined;
    }
    await args.em.populate(document, ['customer']);
    const customer = document.customer;
    if (!customer) {
      return undefined;
    }
    return customer.legalDataTemplate.legal_name;
  }
}

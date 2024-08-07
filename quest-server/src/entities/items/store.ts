// Mikro-ORM imports
import {
  Collection,
  Entity,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { BudgetLine } from '../invoicing/budget-line';
import { Stock } from './stock';
import { StockLine } from '../invoicing/stock-line';
import { StockLog } from './stock-log';
import { StoreTransfer } from './store-transfer';

@Entity({ tableName: 'items.store' })
export class Store extends QuestEntity {
  //region Field names
  static readonly field = {
    IS_DEFAULT: 'is_default',
    NAME: 'name',
  };
  //endregion

  //region Collection names
  static collection = {
    BUDGET_LINE: 'budgetLineCollection',
    STOCK: 'stockCollection',
    STOCK_LINE: 'stockLineCollection',
    STOCK_LOG: 'stockLogCollection',
    STOCK_LOG_STORE_AUX: 'stockLogStoreAuxCollection',
    STORE_TRANSFER_STORE_SOURCE: 'storeTransferStoreSourceCollection',
    STORE_TRANSFER_STORE_TARGET: 'storeTransferStoreTargetCollection',
  };
  //endregion

  //region Fields
  @Property({ defaultRaw: 'default' })
  is_default!: boolean;
  @Property()
  name!: string;
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'BudgetLine', mappedBy: (e: BudgetLine) => e.store, orphanRemoval: false })
  budgetLineCollection: Collection<BudgetLine> = new Collection<BudgetLine>(this);
  @OneToMany({ entity: () => 'Stock', mappedBy: (e: Stock) => e.store, orphanRemoval: true })
  stockCollection: Collection<Stock> = new Collection<Stock>(this);
  @OneToMany({ entity: () => 'StockLine', mappedBy: (e: StockLine) => e.store, orphanRemoval: false })
  stockLineCollection: Collection<StockLine> = new Collection<StockLine>(this);
  @OneToMany({ entity: () => 'StockLog', mappedBy: (e: StockLog) => e.store, orphanRemoval: true })
  stockLogCollection: Collection<StockLog> = new Collection<StockLog>(this);
  @OneToMany({ entity: () => 'StockLog', mappedBy: (e: StockLog) => e.auxStore, orphanRemoval: false })
  stockLogStoreAuxCollection: Collection<StockLog> = new Collection<StockLog>(this);
  @OneToMany({ entity: () => 'StoreTransfer', mappedBy: (e: StoreTransfer) => e.sourceStore, orphanRemoval: false })
  storeTransferStoreSourceCollection: Collection<StoreTransfer> = new Collection<StoreTransfer>(this);
  @OneToMany({ entity: () => 'StoreTransfer', mappedBy: (e: StoreTransfer) => e.targetStore, orphanRemoval: false })
  storeTransferStoreTargetCollection: Collection<StoreTransfer> = new Collection<StoreTransfer>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Store_${this.id}`;
  }
  //endregion
}

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
import { ManualStockTransfer } from './manual-stock-transfer';
import { Stock } from './stock';
import { StockLine } from '../invoicing/stock-line';
import { StockTransfer } from './stock-transfer';

@Entity({ tableName: 'items.store' })
export class Store extends QuestEntity {
  //region Field names
  static readonly field = {
    NAME: 'name',
  };
  //endregion

  //region Collection names
  static collection = {
    BUDGET_LINE: 'budgetLineCollection',
    MANUAL_STOCK_TRANSFER_STORE_ORIGIN: 'manualStockTransferStoreOriginCollection',
    MANUAL_STOCK_TRANSFER_STORE_TARGET: 'manualStockTransferStoreTargetCollection',
    STOCK: 'stockCollection',
    STOCK_LINE: 'stockLineCollection',
    STOCK_TRANSFER: 'stockTransferCollection',
    STOCK_TRANSFER_STORE_AUX: 'stockTransferStoreAuxCollection',
  };
  //endregion

  //region Fields
  @Property()
  name!: string;
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'BudgetLine', mappedBy: (e: BudgetLine) => e.store, orphanRemoval: false })
  budgetLineCollection: Collection<BudgetLine> = new Collection<BudgetLine>(this);
  @OneToMany({ entity: () => 'ManualStockTransfer', mappedBy: (e: ManualStockTransfer) => e.originStore, orphanRemoval: false })
  manualStockTransferStoreOriginCollection: Collection<ManualStockTransfer> = new Collection<ManualStockTransfer>(this);
  @OneToMany({ entity: () => 'ManualStockTransfer', mappedBy: (e: ManualStockTransfer) => e.targetStore, orphanRemoval: false })
  manualStockTransferStoreTargetCollection: Collection<ManualStockTransfer> = new Collection<ManualStockTransfer>(this);
  @OneToMany({ entity: () => 'Stock', mappedBy: (e: Stock) => e.store, orphanRemoval: true })
  stockCollection: Collection<Stock> = new Collection<Stock>(this);
  @OneToMany({ entity: () => 'StockLine', mappedBy: (e: StockLine) => e.store, orphanRemoval: false })
  stockLineCollection: Collection<StockLine> = new Collection<StockLine>(this);
  @OneToMany({ entity: () => 'StockTransfer', mappedBy: (e: StockTransfer) => e.store, orphanRemoval: true })
  stockTransferCollection: Collection<StockTransfer> = new Collection<StockTransfer>(this);
  @OneToMany({ entity: () => 'StockTransfer', mappedBy: (e: StockTransfer) => e.auxStore, orphanRemoval: false })
  stockTransferStoreAuxCollection: Collection<StockTransfer> = new Collection<StockTransfer>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Store_${this.id}`;
  }
  //endregion
}

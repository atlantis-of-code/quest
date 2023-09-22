// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { BudgetLine } from '../invoicing/budget-line';
import { ManualStockTransfer } from './manual-stock-transfer';
import { Stock } from './stock';
import { StockLine } from '../invoicing/stock-line';
import { StockTransfer } from './stock-transfer';

export class Store extends QuestModel {
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
  name!: string;
  //endregion

  //region Mapped collections and inversed models
  budgetLineCollection: BudgetLine[];
  manualStockTransferStoreOriginCollection: ManualStockTransfer[];
  manualStockTransferStoreTargetCollection: ManualStockTransfer[];
  stockCollection: Stock[];
  stockLineCollection: StockLine[];
  stockTransferCollection: StockTransfer[];
  stockTransferStoreAuxCollection: StockTransfer[];
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Store_${this.id}`;
  }
  //endregion
}

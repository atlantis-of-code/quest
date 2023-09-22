// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Item } from './item';
import { ManualStockTransfer } from './manual-stock-transfer';
import { StockTransfer } from './stock-transfer';

export class ManualStockTransferLine extends QuestModel {
  //region Field names
  static readonly field = {
    QUANTITY: 'quantity',
  };
  //endregion

  //region Entity names
  static entity = {
    ITEM: 'item',
    MANUAL_STOCK_TRANSFER: 'manualStockTransfer',
  };
  //endregion

  //region Collection names
  static collection = {
    STOCK_TRANSFER: 'stockTransferCollection',
  };
  //endregion

  //region Fields
  quantity!: string;
  //endregion

  //region Models
  item?: Item;
  manualStockTransfer?: ManualStockTransfer;
  //endregion

  //region Mapped collections and inversed models
  stockTransferCollection: StockTransfer[];
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `ManualStockTransferLine_${this.id}`;
  }
  //endregion
}

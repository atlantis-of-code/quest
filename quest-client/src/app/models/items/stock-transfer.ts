// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Item } from './item';
import { ManualStockTransferLine } from './manual-stock-transfer-line';
import { StockLine } from '../invoicing/stock-line';
import { Store } from './store';

// Enums as constant objects

export const StockTransferType = {
  DELIVERY_NOTE: 'Delivery note',
  TICKET: 'Ticket',
  TRANSFER: 'Transfer',
  RECOUNT: 'Re-count',
} as const;
export type StockTransferTypeType = typeof StockTransferType[keyof typeof StockTransferType];

export class StockTransfer extends QuestModel {
  //region Field names
  static readonly field = {
    CUSTOMER_NAME: 'customer_name',
    DATE: 'date',
    DESCRIPTION: 'description',
    DOCUMENT_NAME: 'document_name',
    DOCUMENT_OPERATION: 'document_operation',
    PREVIOUS_STOCK: 'previous_stock',
    QUANTITY: 'quantity',
    TYPE: 'type',
  };
  //endregion

  //region Entity names
  static entity = {
    AUX_STORE: 'auxStore',
    ITEM: 'item',
    MANUAL_STOCK_TRANSFER_LINE: 'manualStockTransferLine',
    STOCK_LINE: 'stockLine',
    STORE: 'store',
  };
  //endregion

  //region Fields
  customer_name?: string;
  date?: Date;
  description?: string;
  document_name?: string;
  document_operation?: string;
  previous_stock?: string;
  quantity?: string;
  type!: StockTransferTypeType;
  //endregion

  //region Models
  auxStore?: Store;
  item!: Item;
  manualStockTransferLine?: ManualStockTransferLine;
  stockLine?: StockLine;
  store!: Store;
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `StockTransfer_${this.id}`;
  }
  //endregion
}

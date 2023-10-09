import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
import { AocUiDataDropdown } from '@atlantis-of-code/aoc-client/ui/common/types';
// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Item } from './item';
import { ManualStockTransferLine } from './manual-stock-transfer-line';
import { StockLine } from '../invoicing/stock-line';
import { Store } from './store';

// Enums as constant objects

export const StockTransferTypeConst = {
  DELIVERY_NOTE: { label: 'Delivery note', value: 'Delivery note' },
  TICKET: { label: 'Ticket', value: 'Ticket' },
  TRANSFER: { label: 'Transfer', value: 'Transfer' },
  RE-COUNT: { label: 'Re-count', value: 'Re-count' },
} as const;
export type StockTransferType = typeof StockTransferTypeConst[keyof typeof StockTransferTypeConst]['value'];
export const StockTransferTypeAocUiDataDropdown: AocUiDataDropdown = Object.values(StockTransferTypeConst);

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
  type!: StockTransferType;
  //endregion

  //region Models
  auxStore?: Store;
  item!: Item;
  manualStockTransferLine?: ManualStockTransferLine;
  stockLine?: StockLine;
  store!: Store;
  //endregion

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'stock transfer',
    p: 'stock transfers',
    g: 'm',
    //region Fields for i18n (1 field per line)
    CUSTOMER_NAME: 'Customer name',
    DATE: 'Date',
    DESCRIPTION: 'Description',
    DOCUMENT_NAME: 'Document name',
    DOCUMENT_OPERATION: 'Document operation',
    PREVIOUS_STOCK: 'Previous stock',
    QUANTITY: 'Quantity',
    TYPE: 'Type',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `StockTransfer_${this.id}`;
  }
  //endregion
}

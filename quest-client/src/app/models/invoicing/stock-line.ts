// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { DeliveryNote } from './delivery-note';
import { Item } from '../items/item';
import { StockTransfer } from '../items/stock-transfer';
import { Store } from '../items/store';
import { Ticket } from './ticket';

export class StockLine extends QuestModel {
  //region Field names
  static readonly field = {
    BASE_PRICE: 'base_price',
    DISCOUNT: 'discount',
    ITEM_CODE: 'item_code',
    ITEM_NAME: 'item_name',
    ORDER: 'order',
    QUANTITY: 'quantity',
    TOTAL_BASE: 'total_base',
  };
  //endregion

  //region Entity names
  static entity = {
    ITEM: 'item',
    STORE: 'store',
  };
  //endregion

  //region Collection names
  static collection = {
    DELIVERY_NOTE_LINE: 'deliveryNoteLineCollection',
    STOCK_TRANSFER: 'stockTransferCollection',
    TICKET_LINE: 'ticketLineCollection',
  };
  //endregion

  //region Fields
  base_price!: string;
  discount?: string;
  item_code?: string;
  item_name?: string;
  order?: number;
  quantity!: string;
  total_base!: string;
  //endregion

  //region Models
  item?: Item;
  store?: Store;
  //endregion

  //region Mapped collections and inversed models
  deliveryNoteLineCollection: DeliveryNote[];
  stockTransferCollection: StockTransfer[];
  ticketLineCollection: Ticket[];
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `StockLine_${this.id}`;
  }
  //endregion
}

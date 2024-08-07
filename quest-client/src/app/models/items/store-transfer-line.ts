import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Item } from './item';
import { StockLog } from './stock-log';
import { StoreTransfer } from './store-transfer';

export class StoreTransferLine extends QuestModel {
  //region Field names
  static readonly field = {
    QUANTITY: 'quantity',
  };
  //endregion

  //region Entity names
  static entity = {
    ITEM: 'item',
    STORE_TRANSFER: 'storeTransfer',
  };
  //endregion

  //region Collection names
  static collection = {
    STOCK_LOG: 'stockLogCollection',
  };
  //endregion

  //region Fields
  quantity!: string;
  //endregion

  //region Models
  item?: Item;
  storeTransfer?: StoreTransfer;
  //endregion

  //region Mapped collections and inversed models
  stockLogCollection: StockLog[];
  //endregion

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'store transfer line',
    p: 'store transfer lines',
    g: 'm',
    //region Fields for i18n (1 field per line)
    QUANTITY: 'Quantity',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `StoreTransferLine_${this.id}`;
  }
  //endregion
}

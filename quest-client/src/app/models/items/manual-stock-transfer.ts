// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { ManualStockTransferLine } from './manual-stock-transfer-line';
import { Store } from './store';

export class ManualStockTransfer extends QuestModel {
  //region Field names
  static readonly field = {
    DATE: 'date',
  };
  //endregion

  //region Entity names
  static entity = {
    ORIGIN_STORE: 'originStore',
    TARGET_STORE: 'targetStore',
  };
  //endregion

  //region Collection names
  static collection = {
    MANUAL_STOCK_TRANSFER_LINE: 'manualStockTransferLineCollection',
  };
  //endregion

  //region Fields
  date?: Date;
  //endregion

  //region Models
  originStore!: Store;
  targetStore!: Store;
  //endregion

  //region Mapped collections and inversed models
  manualStockTransferLineCollection: ManualStockTransferLine[];
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `ManualStockTransfer_${this.id}`;
  }
  //endregion
}

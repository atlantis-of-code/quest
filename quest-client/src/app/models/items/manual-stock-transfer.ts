import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
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

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'manual stock transfer',
    p: 'manual stock transfers',
    g: 'm',
    //region Fields for i18n (1 field per line)
    DATE: 'Date',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `ManualStockTransfer_${this.id}`;
  }
  //endregion
}

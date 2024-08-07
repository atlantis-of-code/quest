import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Store } from './store';
import { StoreTransferLine } from './store-transfer-line';

export class StoreTransfer extends QuestModel {
  //region Field names
  static readonly field = {
    DATE: 'date',
  };
  //endregion

  //region Entity names
  static entity = {
    SOURCE_STORE: 'sourceStore',
    TARGET_STORE: 'targetStore',
  };
  //endregion

  //region Collection names
  static collection = {
    STORE_TRANSFER_LINE: 'storeTransferLineCollection',
  };
  //endregion

  //region Fields
  date!: Date;
  //endregion

  //region Models
  sourceStore!: Store;
  targetStore!: Store;
  //endregion

  //region Mapped collections and inversed models
  storeTransferLineCollection: StoreTransferLine[];
  //endregion

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'store transfer',
    p: 'store transfers',
    g: 'm',
    //region Fields for i18n (1 field per line)
    DATE: 'Date',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `StoreTransfer_${this.id}`;
  }
  //endregion
}

import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { File } from '../files/file';
import { StockLog } from './stock-log';

export class StockCount extends QuestModel {
  //region Field names
  static readonly field = {
    DATE: 'date',
  };
  //endregion

  //region Entity names
  static entity = {
    FILE: 'file',
  };
  //endregion

  //region Collection names
  static collection = {
    STOCK_LOG: 'stockLogCollection',
  };
  //endregion

  //region Fields
  date!: Date;
  //endregion

  //region Models
  file?: File;
  //endregion

  //region Mapped collections and inversed models
  stockLogCollection: StockLog[];
  //endregion

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'stock count',
    p: 'stock counts',
    g: 'm',
    //region Fields for i18n (1 field per line)
    DATE: 'Date',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `StockCount_${this.id}`;
  }
  //endregion
}

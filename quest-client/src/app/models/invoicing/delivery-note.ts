import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Customer } from '../customers/customer';
import { File } from '../files/file';
import { FiscalYear } from '../common/fiscal-year';
import { Invoice } from './invoice';
import { Series } from '../common/series';
import { StockLine } from './stock-line';

export class DeliveryNote extends QuestModel {
  //region Field names
  static readonly field = {
    DATE: 'date',
    NUMBER: 'number',
    OBSERVATIONS: 'observations',
    TOTAL: 'total',
    TOTAL_BASE: 'total_base',
    TOTAL_TAXES: 'total_taxes',
  };
  //endregion

  //region Entity names
  static entity = {
    CUSTOMER: 'customer',
    FISCAL_YEAR: 'fiscalYear',
    INVOICE: 'invoice',
    SERIES: 'series',
  };
  //endregion

  //region Collection names
  static collection = {
    FILE: 'fileCollection',
    STOCK_LINE_LINE: 'stockLineLineCollection',
  };
  //endregion

  //region Fields
  date?: Date;
  number?: number;
  observations?: string;
  total?: string;
  total_base?: string;
  total_taxes?: string;
  //endregion

  //region Models
  customer!: Customer;
  fiscalYear?: FiscalYear;
  invoice?: Invoice;
  series?: Series;
  //endregion

  //region Mapped collections and inversed models
  fileCollection: File[];
  stockLineLineCollection: StockLine[];
  //endregion

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'delivery note',
    p: 'delivery notes',
    g: 'm',
    //region Fields for i18n (1 field per line)
    DATE: 'Date',
    NUMBER: 'Number',
    OBSERVATIONS: 'Observations',
    TOTAL: 'Total',
    TOTAL_BASE: 'Total base',
    TOTAL_TAXES: 'Total taxes',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `${this.number}`;
  }
  //endregion
}

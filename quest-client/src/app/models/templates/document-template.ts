// AocEmbeddedModel import
import { AocEmbeddedModel } from '@atlantis-of-code/aoc-client/core/models';
// Model imports
import { Customer } from '../customers/customer';
import { FiscalYear } from '../common/fiscal-year';
import { Series } from '../common/series';

export class DocumentTemplate extends AocEmbeddedModel {
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
    SERIES: 'series',
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
  series?: Series;
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return 'DocumentTemplate';
  }
  //endregion
}

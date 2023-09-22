// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Address } from '../common/address';
import { Customer } from '../customers/customer';
import { DeliveryNote } from './delivery-note';
import { File } from '../files/file';
import { FiscalYear } from '../common/fiscal-year';
import { LegalData } from '../common/legal-data';
import { Series } from '../common/series';

export class Invoice extends QuestModel {
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
    COMPANY_ADDRESS: 'companyAddress',
    COMPANY_LEGAL_DATA: 'companyLegalData',
    CUSTOMER: 'customer',
    CUSTOMER_ADDRESS: 'customerAddress',
    CUSTOMER_LEGAL_DATA: 'customerLegalData',
    FISCAL_YEAR: 'fiscalYear',
    SERIES: 'series',
  };
  //endregion

  //region Collection names
  static collection = {
    DELIVERY_NOTE: 'deliveryNoteCollection',
    FILE: 'fileCollection',
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
  companyAddress?: Address;
  companyLegalData?: LegalData;
  customer!: Customer;
  customerAddress?: Address;
  customerLegalData?: LegalData;
  fiscalYear?: FiscalYear;
  series?: Series;
  //endregion

  //region Mapped collections and inversed models
  deliveryNoteCollection: DeliveryNote[];
  fileCollection: File[];
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Invoice_${this.id}`;
  }
  //endregion
}

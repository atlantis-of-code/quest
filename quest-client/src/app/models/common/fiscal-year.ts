import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Budget } from '../invoicing/budget';
import { DeliveryNote } from '../invoicing/delivery-note';
import { Invoice } from '../invoicing/invoice';
import { Ticket } from '../invoicing/ticket';

export class FiscalYear extends QuestModel {
  //region Field names
  static readonly field = {
    IS_CURRENT: 'is_current',
    YEAR: 'year',
  };
  //endregion

  //region Collection names
  static collection = {
    BUDGET: 'budgetCollection',
    DELIVERY_NOTE: 'deliveryNoteCollection',
    INVOICE: 'invoiceCollection',
    TICKET: 'ticketCollection',
  };
  //endregion

  //region Fields
  is_current?: boolean;
  year!: number;
  //endregion

  //region Mapped collections and inversed models
  budgetCollection: Budget[];
  deliveryNoteCollection: DeliveryNote[];
  invoiceCollection: Invoice[];
  ticketCollection: Ticket[];
  //endregion

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'fiscal year',
    p: 'fiscal years',
    g: 'm',
    //region Fields for i18n (1 field per line)
    IS_CURRENT: 'Current',
    YEAR: 'Year',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `${this.year}${this.is_current ? ' (curr)' : ''}`;
  }
  //endregion
}

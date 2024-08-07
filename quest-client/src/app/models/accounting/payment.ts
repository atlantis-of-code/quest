import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Invoice } from '../invoicing/invoice';
import { PaymentSystem } from '../common/payment-system';
import { Ticket } from '../invoicing/ticket';

export class Payment extends QuestModel {
  //region Field names
  static readonly field = {
    DATE: 'date',
    QUANTITY: 'quantity',
  };
  //endregion

  //region Entity names
  static entity = {
    PAYMENT_SYSTEM: 'paymentSystem',
  };
  //endregion

  //region Collection names
  static collection = {
    INVOICE: 'invoiceCollection',
    TICKET: 'ticketCollection',
  };
  //endregion

  //region Fields
  date!: Date;
  quantity!: string;
  //endregion

  //region Models
  paymentSystem?: PaymentSystem;
  //endregion

  //region Mapped collections and inversed models
  invoiceCollection: Invoice[];
  ticketCollection: Ticket[];
  //endregion

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'payment',
    p: 'payments',
    g: 'm',
    //region Fields for i18n (1 field per line)
    DATE: 'Date',
    QUANTITY: 'Quantity',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Payment_${this.id}`;
  }
  //endregion
}

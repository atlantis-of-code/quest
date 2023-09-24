// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Budget } from '../invoicing/budget';
import { DeliveryNote } from '../invoicing/delivery-note';
import { Invoice } from '../invoicing/invoice';
import { Ticket } from '../invoicing/ticket';

// Enums as constant objects

export const SeriesType = {
  INVOICE: 'Invoice',
  DELIVERY_NOTE: 'Delivery note',
  BUDGET: 'Budget',
  TICKET: 'Ticket',
} as const;
export type SeriesTypeType = typeof SeriesType[keyof typeof SeriesType];

export class Series extends QuestModel {
  //region Field names
  static readonly field = {
    IS_DEFAULT: 'is_default',
    NAME: 'name',
    TYPE: 'type',
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
  is_default?: boolean;
  name!: string;
  type!: SeriesTypeType;
  //endregion

  //region Mapped collections and inversed models
  budgetCollection: Budget[];
  deliveryNoteCollection: DeliveryNote[];
  invoiceCollection: Invoice[];
  ticketCollection: Ticket[];
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Series_${this.id}`;
  }
  //endregion
}

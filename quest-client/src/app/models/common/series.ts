import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
import { AocUiDataDropdown } from '@atlantis-of-code/aoc-client/ui/common/types';
// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Budget } from '../invoicing/budget';
import { DeliveryNote } from '../invoicing/delivery-note';
import { Invoice } from '../invoicing/invoice';
import { Ticket } from '../invoicing/ticket';

// Enums as constant objects

export const SeriesTypeConst = {
  INVOICE: { label: 'Invoice', value: 'Invoice' },
  DELIVERY_NOTE: { label: 'Delivery note', value: 'Delivery note' },
  BUDGET: { label: 'Budget', value: 'Budget' },
  TICKET: { label: 'Ticket', value: 'Ticket' },
} as const;
export type SeriesType = typeof SeriesTypeConst[keyof typeof SeriesTypeConst]['value'];
export const SeriesTypeAocUiDataDropdown: AocUiDataDropdown = Object.values(SeriesTypeConst);

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
  type!: SeriesType;
  //endregion

  //region Mapped collections and inversed models
  budgetCollection: Budget[];
  deliveryNoteCollection: DeliveryNote[];
  invoiceCollection: Invoice[];
  ticketCollection: Ticket[];
  //endregion

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'series',
    p: 'series',
    g: 'm',
    //region Fields for i18n (1 field per line)
    IS_DEFAULT: 'Is default',
    NAME: 'Name',
    TYPE: 'Type',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Series_${this.id}`;
  }
  //endregion
}

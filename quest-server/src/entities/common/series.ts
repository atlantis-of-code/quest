// Mikro-ORM imports
import {
  Collection,
  Entity,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
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

@Entity({ tableName: 'common.series' })
export class Series extends QuestEntity {
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
  @Property()
  is_default?: boolean;
  @Property()
  name!: string;
  @Property()
  type!: SeriesTypeType;
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'Budget', mappedBy: (e: Budget) => e.series, orphanRemoval: false })
  budgetCollection: Collection<Budget> = new Collection<Budget>(this);
  @OneToMany({ entity: () => 'DeliveryNote', mappedBy: (e: DeliveryNote) => e.series, orphanRemoval: false })
  deliveryNoteCollection: Collection<DeliveryNote> = new Collection<DeliveryNote>(this);
  @OneToMany({ entity: () => 'Invoice', mappedBy: (e: Invoice) => e.series, orphanRemoval: false })
  invoiceCollection: Collection<Invoice> = new Collection<Invoice>(this);
  @OneToMany({ entity: () => 'Ticket', mappedBy: (e: Ticket) => e.series, orphanRemoval: false })
  ticketCollection: Collection<Ticket> = new Collection<Ticket>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Series_${this.id}`;
  }
  //endregion
}

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

@Entity({ tableName: 'common.fiscal_year' })
export class FiscalYear extends QuestEntity {
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
  @Property({ nullable: true })
  is_current?: boolean;
  @Property()
  year!: number;
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'Budget', mappedBy: (e: Budget) => e.fiscalYear, orphanRemoval: false })
  budgetCollection: Collection<Budget> = new Collection<Budget>(this);
  @OneToMany({ entity: () => 'DeliveryNote', mappedBy: (e: DeliveryNote) => e.fiscalYear, orphanRemoval: false })
  deliveryNoteCollection: Collection<DeliveryNote> = new Collection<DeliveryNote>(this);
  @OneToMany({ entity: () => 'Invoice', mappedBy: (e: Invoice) => e.fiscalYear, orphanRemoval: false })
  invoiceCollection: Collection<Invoice> = new Collection<Invoice>(this);
  @OneToMany({ entity: () => 'Ticket', mappedBy: (e: Ticket) => e.fiscalYear, orphanRemoval: false })
  ticketCollection: Collection<Ticket> = new Collection<Ticket>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `FiscalYear_${this.id}`;
  }
  //endregion
}

// Mikro-ORM imports
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Invoice } from '../invoicing/invoice';
import { PaymentSystem } from '../common/payment-system';
import { Ticket } from '../invoicing/ticket';

@Entity({ tableName: 'accounting.payment' })
export class Payment extends QuestEntity {
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
  @Property({ defaultRaw: 'default' })
  date!: Date;
  @Property()
  quantity!: string;
  //endregion

  //region Entities
  @ManyToOne({ entity: () => 'PaymentSystem', fieldName: 'payment_system_id', nullable: true })
  paymentSystem?: PaymentSystem;
  //endregion

  //region Mapped collections and inversed entities
  @ManyToMany({ entity: () => Invoice, mappedBy: (e: Invoice) => e.paymentCollection })
  invoiceCollection: Collection<Invoice> = new Collection<Invoice>(this);
  @ManyToMany({ entity: () => Ticket, mappedBy: (e: Ticket) => e.paymentCollection })
  ticketCollection: Collection<Ticket> = new Collection<Ticket>(this);
  //endregion

  //region CUSTOM
  //endregion
}

// Mikro-ORM imports
import {
  Cascade,
  Collection,
  Embedded,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { AddressTemplate } from '../templates/address-template';
import { Budget } from '../invoicing/budget';
import { Contact } from '../contacts/contact';
import { DeliveryNote } from '../invoicing/delivery-note';
import { File } from '../files/file';
import { Gender } from '../common/gender';
import { Invoice } from '../invoicing/invoice';
import { Language } from '../common/language';
import { LegalDataTemplate } from '../templates/legal-data-template';
import { Ticket } from '../invoicing/ticket';

@Entity({ tableName: 'customers.customer' })
export class Customer extends QuestEntity {
  //region Field names
  static readonly field = {
    BIRTHDATE: 'birthdate',
    CODE: 'code',
    EMAIL: 'email',
    FAX: 'fax',
    PHONE1: 'phone1',
    PHONE2: 'phone2',
    TRADE_NAME: 'trade_name',
  };
  //endregion

  //region Entity names
  static entity = {
    GENDER: 'gender',
    LANGUAGE: 'language',
  };
  //endregion

  //region Collection names
  static collection = {
    BUDGET: 'budgetCollection',
    CONTACT: 'contactCollection',
    DELIVERY_NOTE: 'deliveryNoteCollection',
    FILE: 'fileCollection',
    INVOICE: 'invoiceCollection',
    TICKET: 'ticketCollection',
  };
  //endregion

  //region Embedded names
  static embedded = {
    ADDRESS_TEMPLATE: 'addressTemplate',
    LEGAL_DATA_TEMPLATE: 'legalDataTemplate',
  };
  //endregion

  //region Fields
  @Property({ nullable: true })
  birthdate?: Date;
  @Property()
  code!: number;
  @Property({ nullable: true })
  email?: string;
  @Property({ nullable: true })
  fax?: string;
  @Property({ nullable: true })
  phone1?: string;
  @Property({ nullable: true })
  phone2?: string;
  @Property({ nullable: true })
  trade_name?: string;
  //endregion

  //region Entities
  @ManyToOne({ entity: () => 'Gender', fieldName: 'gender_id', nullable: true })
  gender?: Gender;
  @ManyToOne({ entity: () => 'Language', fieldName: 'language_id', nullable: true })
  language?: Language;
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'Budget', mappedBy: (e: Budget) => e.customer, orphanRemoval: false })
  budgetCollection: Collection<Budget> = new Collection<Budget>(this);
  @ManyToMany({ entity: () => 'Contact', pivotTable: 'customers.customer_contact', joinColumn: 'customer_id', inverseJoinColumn: 'contact_id', cascade: [Cascade.REMOVE] })
  contactCollection: Collection<Contact> = new Collection<Contact>(this);
  @OneToMany({ entity: () => 'DeliveryNote', mappedBy: (e: DeliveryNote) => e.customer, orphanRemoval: false })
  deliveryNoteCollection: Collection<DeliveryNote> = new Collection<DeliveryNote>(this);
  @ManyToMany({ entity: () => 'File', pivotTable: 'customers.customer_file', joinColumn: 'customer_id', inverseJoinColumn: 'file_id', cascade: [Cascade.REMOVE] })
  fileCollection: Collection<File> = new Collection<File>(this);
  @OneToMany({ entity: () => 'Invoice', mappedBy: (e: Invoice) => e.customer, orphanRemoval: false })
  invoiceCollection: Collection<Invoice> = new Collection<Invoice>(this);
  @OneToMany({ entity: () => 'Ticket', mappedBy: (e: Ticket) => e.customer, orphanRemoval: false })
  ticketCollection: Collection<Ticket> = new Collection<Ticket>(this);
  //endregion

  //region Embedded
  @Embedded({ entity: () => AddressTemplate, prefix: false })
  addressTemplate = new AddressTemplate();
  @Embedded({ entity: () => LegalDataTemplate, prefix: false })
  legalDataTemplate = new LegalDataTemplate();
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Customer_${this.id}`;
  }
  //endregion
}

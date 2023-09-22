// Mikro-ORM imports
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Country } from './country';
import { Invoice } from '../invoicing/invoice';
import { StreetSuffix } from './street-suffix';
import { Ticket } from '../invoicing/ticket';

@Entity({ tableName: 'common.address' })
export class Address extends QuestEntity {
  //region Field names
  static readonly field = {
    ADDITIONAL_DATA: 'additional_data',
    AREA: 'area',
    BLOCK: 'block',
    CITY: 'city',
    COORDINATES: 'coordinates',
    DOOR: 'door',
    FLOOR: 'floor',
    STATE: 'state',
    STREET_NAME: 'street_name',
    STREET_NUMBER: 'street_number',
    ZIP_CODE: 'zip_code',
  };
  //endregion

  //region Entity names
  static entity = {
    COUNTRY: 'country',
    STREET_SUFFIX: 'streetSuffix',
  };
  //endregion

  //region Collection names
  static collection = {
    INVOICE_ADDRESS_COMPANY: 'invoiceAddressCompanyCollection',
    INVOICE_ADDRESS_CUSTOMER: 'invoiceAddressCustomerCollection',
    TICKET_ADDRESS_COMPANY: 'ticketAddressCompanyCollection',
    TICKET_ADDRESS_CUSTOMER: 'ticketAddressCustomerCollection',
  };
  //endregion

  //region Fields
  @Property({ nullable: true })
  additional_data?: string;
  @Property({ nullable: true })
  area?: string;
  @Property({ nullable: true })
  block?: string;
  @Property({ nullable: true })
  city?: string;
  @Property({ nullable: true })
  coordinates?: string;
  @Property({ nullable: true })
  door?: string;
  @Property({ nullable: true })
  floor?: string;
  @Property({ nullable: true })
  state?: string;
  @Property({ nullable: true })
  street_name?: string;
  @Property({ nullable: true })
  street_number?: string;
  @Property({ nullable: true })
  zip_code?: string;
  //endregion

  //region Entities
  @ManyToOne({ entity: () => 'Country', fieldName: 'country_id' })
  country!: Country;
  @ManyToOne({ entity: () => 'StreetSuffix', fieldName: 'street_suffix_id' })
  streetSuffix!: StreetSuffix;
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'Invoice', mappedBy: (e: Invoice) => e.companyAddress, orphanRemoval: false })
  invoiceAddressCompanyCollection: Collection<Invoice> = new Collection<Invoice>(this);
  @OneToMany({ entity: () => 'Invoice', mappedBy: (e: Invoice) => e.customerAddress, orphanRemoval: false })
  invoiceAddressCustomerCollection: Collection<Invoice> = new Collection<Invoice>(this);
  @OneToMany({ entity: () => 'Ticket', mappedBy: (e: Ticket) => e.companyAddress, orphanRemoval: false })
  ticketAddressCompanyCollection: Collection<Ticket> = new Collection<Ticket>(this);
  @OneToMany({ entity: () => 'Ticket', mappedBy: (e: Ticket) => e.customerAddress, orphanRemoval: false })
  ticketAddressCustomerCollection: Collection<Ticket> = new Collection<Ticket>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Address_${this.id}`;
  }
  //endregion
}

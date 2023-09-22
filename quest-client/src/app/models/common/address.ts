// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Country } from './country';
import { Invoice } from '../invoicing/invoice';
import { StreetSuffix } from './street-suffix';
import { Ticket } from '../invoicing/ticket';

export class Address extends QuestModel {
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
  additional_data?: string;
  area?: string;
  block?: string;
  city?: string;
  coordinates?: string;
  door?: string;
  floor?: string;
  state?: string;
  street_name?: string;
  street_number?: string;
  zip_code?: string;
  //endregion

  //region Models
  country!: Country;
  streetSuffix!: StreetSuffix;
  //endregion

  //region Mapped collections and inversed models
  invoiceAddressCompanyCollection: Invoice[];
  invoiceAddressCustomerCollection: Invoice[];
  ticketAddressCompanyCollection: Ticket[];
  ticketAddressCustomerCollection: Ticket[];
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Address_${this.id}`;
  }
  //endregion
}

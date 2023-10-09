import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
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

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'address',
    p: 'addresses',
    g: 'm',
    //region Fields for i18n (1 field per line)
    ADDITIONAL_DATA: 'Additional data',
    AREA: 'Area',
    BLOCK: 'Block',
    CITY: 'City',
    COORDINATES: 'Coordinates',
    DOOR: 'Door',
    FLOOR: 'Floor',
    STATE: 'State',
    STREET_NAME: 'Street name',
    STREET_NUMBER: 'Street number',
    ZIP_CODE: 'Zip code',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Address_${this.id}`;
  }
  //endregion
}

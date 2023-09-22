// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
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

export class Customer extends QuestModel {
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
  birthdate?: Date;
  code!: number;
  email?: string;
  fax?: string;
  phone1?: string;
  phone2?: string;
  trade_name?: string;
  //endregion

  //region Models
  gender?: Gender;
  language?: Language;
  //endregion

  //region Mapped collections and inversed models
  budgetCollection: Budget[];
  contactCollection: Contact[];
  deliveryNoteCollection: DeliveryNote[];
  fileCollection: File[];
  invoiceCollection: Invoice[];
  ticketCollection: Ticket[];
  //endregion

  //region Embedded
  addressTemplate: AddressTemplate = new AddressTemplate();
  legalDataTemplate: LegalDataTemplate = new LegalDataTemplate();
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Customer_${this.id}`;
  }
  //endregion
}

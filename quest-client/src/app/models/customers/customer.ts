import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
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

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'customer',
    p: 'customers',
    g: 'm',
    //region Fields for i18n (1 field per line)
    BIRTHDATE: 'Birthdate',
    CODE: 'Code',
    EMAIL: 'Email',
    FAX: 'Fax',
    PHONE1: 'Phone1',
    PHONE2: 'Phone2',
    TRADE_NAME: 'Trade name',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  toString(): string {
    return this.legalDataTemplate.legal_name;
  }
  //endregion
}

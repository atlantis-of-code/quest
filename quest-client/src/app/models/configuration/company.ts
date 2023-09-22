// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { AddressTemplate } from '../templates/address-template';
import { ContactTemplate } from '../templates/contact-template';
import { LegalDataTemplate } from '../templates/legal-data-template';

export class Company extends QuestModel {
  //region Field names
  static readonly field = {
    TRADE_NAME: 'trade_name',
  };
  //endregion

  //region Embedded names
  static embedded = {
    ADDRESS_TEMPLATE: 'addressTemplate',
    CONTACT_TEMPLATE: 'contactTemplate',
    LEGAL_DATA_TEMPLATE: 'legalDataTemplate',
  };
  //endregion

  //region Fields
  trade_name?: string;
  //endregion

  //region Embedded
  addressTemplate: AddressTemplate = new AddressTemplate();
  contactTemplate: ContactTemplate = new ContactTemplate();
  legalDataTemplate: LegalDataTemplate = new LegalDataTemplate();
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Company_${this.id}`;
  }
  //endregion
}

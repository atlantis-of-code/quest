// Mikro-ORM imports
import {
  Embedded,
  Entity,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { AddressTemplate } from '../templates/address-template';
import { ContactTemplate } from '../templates/contact-template';
import { LegalDataTemplate } from '../templates/legal-data-template';

@Entity({ tableName: 'configuration.company' })
export class Company extends QuestEntity {
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
  @Property({ nullable: true })
  trade_name?: string;
  //endregion

  //region Embedded
  @Embedded({ entity: () => AddressTemplate, prefix: false })
  addressTemplate = new AddressTemplate();
  @Embedded({ entity: () => ContactTemplate, prefix: false })
  contactTemplate = new ContactTemplate();
  @Embedded({ entity: () => LegalDataTemplate, prefix: false })
  legalDataTemplate = new LegalDataTemplate();
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Company_${this.id}`;
  }
  //endregion
}

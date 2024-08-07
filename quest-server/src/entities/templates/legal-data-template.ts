// Mikro-ORM imports
import {
  Embeddable,
  ManyToOne,
  Property } from '@mikro-orm/core';
// Entities imports
import { IdentityDocumentType } from '../common/identity-document-type';

@Embeddable()
export class LegalDataTemplate {
  //region Field names
  static readonly field = {
    DOCUMENT_NUMBER: 'document_number',
    LEGAL_NAME: 'legal_name',
  };
  //endregion

  //region Entity names
  static entity = {
    IDENTITY_DOCUMENT_TYPE: 'identityDocumentType',
  };
  //endregion

  //region Fields
  @Property({ nullable: true })
  document_number?: string;
  @Property({ nullable: true })
  legal_name?: string;
  //endregion

  //region Entities
  @ManyToOne({ entity: () => 'IdentityDocumentType', fieldName: 'identity_document_type_id', eager: true, nullable: true })
  identityDocumentType?: IdentityDocumentType;
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return 'LegalDataTemplate';
  }
  //endregion
}

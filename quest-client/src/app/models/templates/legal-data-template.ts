import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
// AocEmbeddedModel import
import { AocEmbeddedModel } from '@atlantis-of-code/aoc-client/core/models';
// Model imports
import { IdentityDocumentType } from '../common/identity-document-type';

export class LegalDataTemplate extends AocEmbeddedModel {
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
  document_number?: string;
  legal_name?: string;
  //endregion

  //region Models
  identityDocumentType?: IdentityDocumentType;
  //endregion

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'legal data template',
    p: 'legal data templates',
    g: 'm',
    //region Fields for i18n (1 field per line)
    DOCUMENT_NUMBER: 'Document number',
    LEGAL_NAME: 'Legal name',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return 'LegalDataTemplate';
  }
  //endregion
}

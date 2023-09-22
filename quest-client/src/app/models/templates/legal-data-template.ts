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

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return 'LegalDataTemplate';
  }
  //endregion
}

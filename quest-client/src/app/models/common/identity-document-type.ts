import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { LegalData } from './legal-data';

export class IdentityDocumentType extends QuestModel {
  //region Field names
  static readonly field = {
    IS_DEFAULT: 'is_default',
    NAME: 'name',
  };
  //endregion

  //region Collection names
  static collection = {
    LEGAL_DATA: 'legalDataCollection',
  };
  //endregion

  //region Fields
  is_default!: boolean;
  name!: string;
  //endregion

  //region Mapped collections and inversed models
  legalDataCollection: LegalData[];
  //endregion

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'identity document type',
    p: 'identity document types',
    g: 'm',
    //region Fields for i18n (1 field per line)
    IS_DEFAULT: 'Is default',
    NAME: 'Name',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return this.name;
  }
  //endregion
}

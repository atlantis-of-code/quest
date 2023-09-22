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
  is_default?: boolean;
  name!: string;
  //endregion

  //region Mapped collections and inversed models
  legalDataCollection: LegalData[];
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `IdentityDocumentType_${this.id}`;
  }
  //endregion
}

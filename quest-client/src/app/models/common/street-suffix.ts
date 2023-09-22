// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Address } from './address';

export class StreetSuffix extends QuestModel {
  //region Field names
  static readonly field = {
    ABBRV: 'abbrv',
    IS_DEFAULT: 'is_default',
    NAME: 'name',
  };
  //endregion

  //region Collection names
  static collection = {
    ADDRESS: 'addressCollection',
  };
  //endregion

  //region Fields
  abbrv?: string;
  is_default?: boolean;
  name!: string;
  //endregion

  //region Mapped collections and inversed models
  addressCollection: Address[];
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `StreetSuffix_${this.id}`;
  }
  //endregion
}

import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
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
  is_default!: boolean;
  name!: string;
  //endregion

  //region Mapped collections and inversed models
  addressCollection: Address[];
  //endregion

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'street suffix',
    p: 'street suffixes',
    g: 'm',
    //region Fields for i18n (1 field per line)
    ABBRV: 'Abbrv',
    IS_DEFAULT: 'Is default',
    NAME: 'Name',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return this.name ?? '';
  }
  //endregion
}

import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Address } from './address';

export class Country extends QuestModel {
  //region Field names
  static readonly field = {
    ISO_CODE2: 'iso_code2',
    ISO_CODE3: 'iso_code3',
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
  is_default?: boolean;
  iso_code2?: string;
  iso_code3?: string;
  name!: string;
  //endregion

  //region Mapped collections and inversed models
  addressCollection: Address[];
  //endregion

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'country',
    p: 'countries',
    g: 'm',
    //region Fields for i18n (1 field per line)
    ISO_CODE2: 'Iso code2',
    ISO_CODE3: 'Iso code3',
    IS_DEFAULT: 'Is default',
    NAME: 'Name',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Country_${this.id}`;
  }
  //endregion
}

// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Customer } from '../customers/customer';

export class Language extends QuestModel {
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
    CUSTOMER: 'customerCollection',
  };
  //endregion

  //region Fields
  is_default?: boolean;
  iso_code2?: string;
  iso_code3?: string;
  name!: string;
  //endregion

  //region Mapped collections and inversed models
  customerCollection: Customer[];
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Language_${this.id}`;
  }
  //endregion
}
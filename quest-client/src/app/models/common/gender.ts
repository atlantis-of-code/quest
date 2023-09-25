// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Customer } from '../customers/customer';

export class Gender extends QuestModel {
  //region Field names
  static readonly field = {
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
  name!: string;
  //endregion

  //region Mapped collections and inversed models
  customerCollection: Customer[];
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return this.name ?? '';
  }
  //endregion
}

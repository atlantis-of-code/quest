// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Customer } from '../customers/customer';

export class Contact extends QuestModel {
  //region Field names
  static readonly field = {
    EMAIL: 'email',
    FAX: 'fax',
    NAME: 'name',
    PHONE1: 'phone1',
    PHONE2: 'phone2',
  };
  //endregion

  //region Collection names
  static collection = {
    CUSTOMER: 'customerCollection',
  };
  //endregion

  //region Fields
  email?: string;
  fax?: string;
  name?: string;
  phone1?: string;
  phone2?: string;
  //endregion

  //region Mapped collections and inversed models
  customerCollection: Customer[];
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Contact_${this.id}`;
  }
  //endregion
}

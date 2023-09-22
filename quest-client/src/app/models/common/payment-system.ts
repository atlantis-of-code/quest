// QuestModel import
import { QuestModel } from '../quest-model';

export class PaymentSystem extends QuestModel {
  //region Field names
  static readonly field = {
    IS_DEFAULT: 'is_default',
    NAME: 'name',
  };
  //endregion

  //region Fields
  is_default?: boolean;
  name!: string;
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `PaymentSystem_${this.id}`;
  }
  //endregion
}

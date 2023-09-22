// QuestModel import
import { QuestModel } from '../quest-model';

export class AocUser extends QuestModel {
  //region Field names
  static readonly field = {
    EMAIL: 'email',
    FULL_NAME: 'full_name',
    PASS: 'pass',
    USERNAME: 'username',
  };
  //endregion

  //region Fields
  email!: string;
  full_name?: string;
  pass!: string;
  username!: string;
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `AocUser_${this.id}`;
  }
  //endregion
}

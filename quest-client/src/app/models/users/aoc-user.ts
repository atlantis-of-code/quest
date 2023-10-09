import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
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

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'aoc user',
    p: 'aoc users',
    g: 'm',
    //region Fields for i18n (1 field per line)
    EMAIL: 'Email',
    FULL_NAME: 'Full name',
    PASS: 'Pass',
    USERNAME: 'Username',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `AocUser_${this.id}`;
  }
  //endregion
}

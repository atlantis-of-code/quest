import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
// QuestModel import
import { QuestModel } from '../quest-model';

export class Meta extends QuestModel {
  //endregion

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'meta',
    p: 'metas',
    g: 'm',
    //region Fields for i18n (1 field per line)
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Meta_${this.id}`;
  }
  //endregion
}

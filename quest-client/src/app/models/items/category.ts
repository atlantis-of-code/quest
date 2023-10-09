import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Item } from './item';

export class Category extends QuestModel {
  //region Field names
  static readonly field = {
    NAME: 'name',
  };
  //endregion

  //region Collection names
  static collection = {
    ITEM: 'itemCollection',
  };
  //endregion

  //region Fields
  name!: string;
  //endregion

  //region Mapped collections and inversed models
  itemCollection: Item[];
  //endregion

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'category',
    p: 'categories',
    g: 'm',
    //region Fields for i18n (1 field per line)
    NAME: 'Name',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Category_${this.id}`;
  }
  //endregion
}

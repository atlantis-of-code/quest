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

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Category_${this.id}`;
  }
  //endregion
}

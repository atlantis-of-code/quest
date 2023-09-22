// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Item } from '../items/item';

export class Tax extends QuestModel {
  //region Field names
  static readonly field = {
    NAME: 'name',
    PERCENT: 'percent',
  };
  //endregion

  //region Collection names
  static collection = {
    ITEM: 'itemCollection',
  };
  //endregion

  //region Fields
  name!: string;
  percent!: string;
  //endregion

  //region Mapped collections and inversed models
  itemCollection: Item[];
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Tax_${this.id}`;
  }
  //endregion
}

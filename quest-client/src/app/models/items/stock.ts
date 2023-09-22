// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Item } from './item';
import { Store } from './store';

export class Stock extends QuestModel {
  //region Field names
  static readonly field = {
    QUANTITY: 'quantity',
  };
  //endregion

  //region Entity names
  static entity = {
    ITEM: 'item',
    STORE: 'store',
  };
  //endregion

  //region Fields
  quantity?: string;
  //endregion

  //region Models
  item?: Item;
  store?: Store;
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Stock_${this.id}`;
  }
  //endregion
}

import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
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

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'stock',
    p: 'stocks',
    g: 'm',
    //region Fields for i18n (1 field per line)
    QUANTITY: 'Quantity',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Stock_${this.id}`;
  }
  //endregion
}

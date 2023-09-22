// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Budget } from './budget';
import { Item } from '../items/item';
import { Store } from '../items/store';

export class BudgetLine extends QuestModel {
  //region Field names
  static readonly field = {
    BASE_PRICE: 'base_price',
    DISCOUNT: 'discount',
    ITEM_CODE: 'item_code',
    ITEM_NAME: 'item_name',
    ORDER: 'order',
    QUANTITY: 'quantity',
    TOTAL_BASE: 'total_base',
  };
  //endregion

  //region Entity names
  static entity = {
    BUDGET: 'budget',
    ITEM: 'item',
    STORE: 'store',
  };
  //endregion

  //region Fields
  base_price!: string;
  discount?: string;
  item_code?: string;
  item_name?: string;
  order?: number;
  quantity!: string;
  total_base!: string;
  //endregion

  //region Models
  budget!: Budget;
  item?: Item;
  store?: Store;
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `BudgetLine_${this.id}`;
  }
  //endregion
}

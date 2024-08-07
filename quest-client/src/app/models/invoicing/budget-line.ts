import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Budget } from './budget';
import { Item } from '../items/item';
import { Store } from '../items/store';
import { Tax } from '../common/tax';

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
    TAX: 'tax',
  };
  //endregion

  //region Fields
  base_price!: string;
  discount!: string;
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
  tax!: Tax;
  //endregion

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'budget line',
    p: 'budget lines',
    g: 'm',
    //region Fields for i18n (1 field per line)
    BASE_PRICE: 'Base price',
    DISCOUNT: 'Discount',
    ITEM_CODE: 'Item code',
    ITEM_NAME: 'Item name',
    ORDER: 'Order',
    QUANTITY: 'Quantity',
    TOTAL_BASE: 'Total base',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `BudgetLine_${this.id}`;
  }
  //endregion
}

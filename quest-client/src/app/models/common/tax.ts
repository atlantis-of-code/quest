import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { BudgetLine } from '../invoicing/budget-line';
import { Item } from '../items/item';
import { StockLine } from '../invoicing/stock-line';

export class Tax extends QuestModel {
  //region Field names
  static readonly field = {
    IS_DEFAULT: 'is_default',
    NAME: 'name',
    PERCENT: 'percent',
  };
  //endregion

  //region Collection names
  static collection = {
    BUDGET_LINE: 'budgetLineCollection',
    ITEM: 'itemCollection',
    STOCK_LINE: 'stockLineCollection',
  };
  //endregion

  //region Fields
  is_default!: boolean;
  name!: string;
  percent!: string;
  //endregion

  //region Mapped collections and inversed models
  budgetLineCollection: BudgetLine[];
  itemCollection: Item[];
  stockLineCollection: StockLine[];
  //endregion

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'tax',
    p: 'taxes',
    g: 'm',
    //region Fields for i18n (1 field per line)
    IS_DEFAULT: 'Is default',
    NAME: 'Name',
    PERCENT: 'Percent',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `${this.name} (${this.percent} %)`;
  }
  //endregion
}

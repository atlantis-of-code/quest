import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { BudgetLine } from '../invoicing/budget-line';
import { Category } from './category';
import { File } from '../files/file';
import { Stock } from './stock';
import { StockLine } from '../invoicing/stock-line';
import { StockLog } from './stock-log';
import { StoreTransferLine } from './store-transfer-line';
import { Tax } from '../common/tax';

export class Item extends QuestModel {
  //region Field names
  static readonly field = {
    BASE_PRICE: 'base_price',
    CODE: 'code',
    DESCRIPTION: 'description',
    IS_ENABLED: 'is_enabled',
    NAME: 'name',
  };
  //endregion

  //region Entity names
  static entity = {
    CATEGORY: 'category',
    PHOTO: 'photo',
    TAX: 'tax',
  };
  //endregion

  //region Collection names
  static collection = {
    BUDGET_LINE: 'budgetLineCollection',
    FILE: 'fileCollection',
    STOCK: 'stockCollection',
    STOCK_LINE: 'stockLineCollection',
    STOCK_LOG: 'stockLogCollection',
    STORE_TRANSFER_LINE: 'storeTransferLineCollection',
  };
  //endregion

  //region Fields
  base_price!: string;
  code!: number;
  description?: string;
  is_enabled!: boolean;
  name!: string;
  //endregion

  //region Models
  category?: Category;
  photo?: File;
  tax?: Tax;
  //endregion

  //region Mapped collections and inversed models
  budgetLineCollection: BudgetLine[];
  fileCollection: File[];
  stockCollection: Stock[];
  stockLineCollection: StockLine[];
  stockLogCollection: StockLog[];
  storeTransferLineCollection: StoreTransferLine[];
  //endregion

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'item',
    p: 'items',
    g: 'm',
    //region Fields for i18n (1 field per line)
    BASE_PRICE: 'Base price',
    CODE: 'Code',
    DESCRIPTION: 'Description',
    IS_ENABLED: 'Is enabled',
    NAME: 'Name',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `${this.code} - ${this.name}`;
  }
  //endregion
}

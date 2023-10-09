import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { BudgetLine } from '../invoicing/budget-line';
import { Category } from './category';
import { File } from '../files/file';
import { ManualStockTransferLine } from './manual-stock-transfer-line';
import { Stock } from './stock';
import { StockLine } from '../invoicing/stock-line';
import { StockTransfer } from './stock-transfer';
import { Tax } from '../common/tax';

export class Item extends QuestModel {
  //region Field names
  static readonly field = {
    BASE_PRICE: 'base_price',
    CODE: 'code',
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
    MANUAL_STOCK_TRANSFER_LINE: 'manualStockTransferLineCollection',
    STOCK: 'stockCollection',
    STOCK_LINE: 'stockLineCollection',
    STOCK_TRANSFER: 'stockTransferCollection',
  };
  //endregion

  //region Fields
  base_price?: string;
  code!: number;
  is_enabled?: boolean;
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
  manualStockTransferLineCollection: ManualStockTransferLine[];
  stockCollection: Stock[];
  stockLineCollection: StockLine[];
  stockTransferCollection: StockTransfer[];
  //endregion

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'item',
    p: 'items',
    g: 'm',
    //region Fields for i18n (1 field per line)
    BASE_PRICE: 'Base price',
    CODE: 'Code',
    IS_ENABLED: 'Is enabled',
    NAME: 'Name',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Item_${this.id}`;
  }
  //endregion
}

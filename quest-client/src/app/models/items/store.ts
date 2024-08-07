import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { BudgetLine } from '../invoicing/budget-line';
import { Stock } from './stock';
import { StockLine } from '../invoicing/stock-line';
import { StockLog } from './stock-log';
import { StoreTransfer } from './store-transfer';

export class Store extends QuestModel {
  //region Field names
  static readonly field = {
    IS_DEFAULT: 'is_default',
    NAME: 'name',
  };
  //endregion

  //region Collection names
  static collection = {
    BUDGET_LINE: 'budgetLineCollection',
    STOCK: 'stockCollection',
    STOCK_LINE: 'stockLineCollection',
    STOCK_LOG: 'stockLogCollection',
    STOCK_LOG_STORE_AUX: 'stockLogStoreAuxCollection',
    STORE_TRANSFER_STORE_SOURCE: 'storeTransferStoreSourceCollection',
    STORE_TRANSFER_STORE_TARGET: 'storeTransferStoreTargetCollection',
  };
  //endregion

  //region Fields
  is_default!: boolean;
  name!: string;
  //endregion

  //region Mapped collections and inversed models
  budgetLineCollection: BudgetLine[];
  stockCollection: Stock[];
  stockLineCollection: StockLine[];
  stockLogCollection: StockLog[];
  stockLogStoreAuxCollection: StockLog[];
  storeTransferStoreSourceCollection: StoreTransfer[];
  storeTransferStoreTargetCollection: StoreTransfer[];
  //endregion

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'store',
    p: 'stores',
    g: 'm',
    //region Fields for i18n (1 field per line)
    IS_DEFAULT: 'Is default',
    NAME: 'Name',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return this.name;
  }
  //endregion
}

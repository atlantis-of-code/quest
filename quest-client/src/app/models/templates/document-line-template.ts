// AocEmbeddedModel import
import { AocEmbeddedModel } from '@atlantis-of-code/aoc-client/core/models';
// Model imports
import { Item } from '../items/item';
import { Store } from '../items/store';

export class DocumentLineTemplate extends AocEmbeddedModel {
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
  item?: Item;
  store?: Store;
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return 'DocumentLineTemplate';
  }
  //endregion
}

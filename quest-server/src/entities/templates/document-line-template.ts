// Mikro-ORM imports
import {
  Embeddable,
  ManyToOne,
  Property } from '@mikro-orm/core';
// Entities imports
import { Item } from '../items/item';
import { Store } from '../items/store';

@Embeddable()
export class DocumentLineTemplate {
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
  @Property()
  base_price!: string;
  @Property()
  discount?: string;
  @Property({ nullable: true })
  item_code?: string;
  @Property({ nullable: true })
  item_name?: string;
  @Property({ nullable: true })
  order?: number;
  @Property()
  quantity!: string;
  @Property()
  total_base!: string;
  //endregion

  //region Entities
  @ManyToOne({ entity: () => 'Item', fieldName: 'item_id', nullable: true })
  item?: Item;
  @ManyToOne({ entity: () => 'Store', fieldName: 'store_id', nullable: true })
  store?: Store;
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return 'DocumentLineTemplate';
  }
  //endregion
}

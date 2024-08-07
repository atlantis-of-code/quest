// Mikro-ORM imports
import {
  Entity,
  ManyToOne,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Budget } from './budget';
import { Item } from '../items/item';
import { Store } from '../items/store';
import { Tax } from '../common/tax';

@Entity({ tableName: 'invoicing.budget_line' })
export class BudgetLine extends QuestEntity {
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
  @Property()
  base_price!: string;
  @Property({ defaultRaw: 'default' })
  discount!: string;
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
  @ManyToOne({ entity: () => 'Budget', fieldName: 'budget_id' })
  budget!: Budget;
  @ManyToOne({ entity: () => 'Item', fieldName: 'item_id', nullable: true })
  item?: Item;
  @ManyToOne({ entity: () => 'Store', fieldName: 'store_id', nullable: true })
  store?: Store;
  @ManyToOne({ entity: () => 'Tax', fieldName: 'tax_id' })
  tax!: Tax;
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `BudgetLine_${this.id}`;
  }
  //endregion
}

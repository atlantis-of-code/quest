// Mikro-ORM imports
import {
  Collection,
  Entity,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { BudgetLine } from '../invoicing/budget-line';
import { Item } from '../items/item';
import { StockLine } from '../invoicing/stock-line';

@Entity({ tableName: 'common.tax' })
export class Tax extends QuestEntity {
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
  @Property({ defaultRaw: 'default' })
  is_default!: boolean;
  @Property()
  name!: string;
  @Property()
  percent!: string;
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'BudgetLine', mappedBy: (e: BudgetLine) => e.tax, orphanRemoval: false })
  budgetLineCollection: Collection<BudgetLine> = new Collection<BudgetLine>(this);
  @OneToMany({ entity: () => 'Item', mappedBy: (e: Item) => e.tax, orphanRemoval: false })
  itemCollection: Collection<Item> = new Collection<Item>(this);
  @OneToMany({ entity: () => 'StockLine', mappedBy: (e: StockLine) => e.tax, orphanRemoval: false })
  stockLineCollection: Collection<StockLine> = new Collection<StockLine>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Tax_${this.id}`;
  }
  //endregion
}

// Mikro-ORM imports
import {
  Collection,
  Entity,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Item } from '../items/item';

@Entity({ tableName: 'common.tax' })
export class Tax extends QuestEntity {
  //region Field names
  static readonly field = {
    NAME: 'name',
    PERCENT: 'percent',
  };
  //endregion

  //region Collection names
  static collection = {
    ITEM: 'itemCollection',
  };
  //endregion

  //region Fields
  @Property()
  name!: string;
  @Property()
  percent!: string;
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'Item', mappedBy: (e: Item) => e.tax, orphanRemoval: false })
  itemCollection: Collection<Item> = new Collection<Item>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Tax_${this.id}`;
  }
  //endregion
}

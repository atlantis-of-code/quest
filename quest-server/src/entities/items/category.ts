// Mikro-ORM imports
import {
  Collection,
  Entity,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Item } from './item';

@Entity({ tableName: 'items.category' })
export class Category extends QuestEntity {
  //region Field names
  static readonly field = {
    NAME: 'name',
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
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'Item', mappedBy: (e: Item) => e.category, orphanRemoval: false })
  itemCollection: Collection<Item> = new Collection<Item>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Category_${this.id}`;
  }
  //endregion
}

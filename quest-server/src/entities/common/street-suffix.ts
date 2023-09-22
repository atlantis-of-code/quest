// Mikro-ORM imports
import {
  Collection,
  Entity,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Address } from './address';

@Entity({ tableName: 'common.street_suffix' })
export class StreetSuffix extends QuestEntity {
  //region Field names
  static readonly field = {
    ABBRV: 'abbrv',
    IS_DEFAULT: 'is_default',
    NAME: 'name',
  };
  //endregion

  //region Collection names
  static collection = {
    ADDRESS: 'addressCollection',
  };
  //endregion

  //region Fields
  @Property({ nullable: true })
  abbrv?: string;
  @Property()
  is_default?: boolean;
  @Property()
  name!: string;
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'Address', mappedBy: (e: Address) => e.streetSuffix, orphanRemoval: false })
  addressCollection: Collection<Address> = new Collection<Address>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `StreetSuffix_${this.id}`;
  }
  //endregion
}

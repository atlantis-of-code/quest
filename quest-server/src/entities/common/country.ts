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

@Entity({ tableName: 'common.country' })
export class Country extends QuestEntity {
  //region Field names
  static readonly field = {
    ISO_CODE2: 'iso_code2',
    ISO_CODE3: 'iso_code3',
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
  @Property({ defaultRaw: 'default' })
  is_default!: boolean;
  @Property({ nullable: true })
  iso_code2?: string;
  @Property({ nullable: true })
  iso_code3?: string;
  @Property()
  name!: string;
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'Address', mappedBy: (e: Address) => e.country, orphanRemoval: false })
  addressCollection: Collection<Address> = new Collection<Address>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Country_${this.id}`;
  }
  //endregion
}

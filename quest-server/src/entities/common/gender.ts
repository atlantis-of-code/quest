// Mikro-ORM imports
import {
  Collection,
  Entity,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Customer } from '../customers/customer';

@Entity({ tableName: 'common.gender' })
export class Gender extends QuestEntity {
  //region Field names
  static readonly field = {
    IS_DEFAULT: 'is_default',
    NAME: 'name',
  };
  //endregion

  //region Collection names
  static collection = {
    CUSTOMER: 'customerCollection',
  };
  //endregion

  //region Fields
  @Property({ defaultRaw: 'default' })
  is_default!: boolean;
  @Property()
  name!: string;
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'Customer', mappedBy: (e: Customer) => e.gender, orphanRemoval: false })
  customerCollection: Collection<Customer> = new Collection<Customer>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Gender_${this.id}`;
  }
  //endregion
}

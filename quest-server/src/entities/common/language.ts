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

@Entity({ tableName: 'common.language' })
export class Language extends QuestEntity {
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
    CUSTOMER: 'customerCollection',
  };
  //endregion

  //region Fields
  @Property()
  is_default?: boolean;
  @Property({ nullable: true })
  iso_code2?: string;
  @Property({ nullable: true })
  iso_code3?: string;
  @Property()
  name!: string;
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'Customer', mappedBy: (e: Customer) => e.language, orphanRemoval: false })
  customerCollection: Collection<Customer> = new Collection<Customer>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Language_${this.id}`;
  }
  //endregion
}

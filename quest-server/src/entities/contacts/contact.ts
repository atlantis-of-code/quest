// Mikro-ORM imports
import {
  Collection,
  Entity,
  ManyToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Customer } from '../customers/customer';

@Entity({ tableName: 'contacts.contact' })
export class Contact extends QuestEntity {
  //region Field names
  static readonly field = {
    EMAIL: 'email',
    FAX: 'fax',
    NAME: 'name',
    PHONE1: 'phone1',
    PHONE2: 'phone2',
  };
  //endregion

  //region Collection names
  static collection = {
    CUSTOMER: 'customerCollection',
  };
  //endregion

  //region Fields
  @Property({ nullable: true })
  email?: string;
  @Property({ nullable: true })
  fax?: string;
  @Property({ nullable: true })
  name?: string;
  @Property({ nullable: true })
  phone1?: string;
  @Property({ nullable: true })
  phone2?: string;
  //endregion

  //region Mapped collections and inversed entities
  @ManyToMany({ entity: () => Customer, mappedBy: (e: Customer) => e.contactCollection })
  customerCollection: Collection<Customer> = new Collection<Customer>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Contact_${this.id}`;
  }
  //endregion
}

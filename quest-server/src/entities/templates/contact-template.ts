// Mikro-ORM imports
import {
  Embeddable,
  Property } from '@mikro-orm/core';

@Embeddable()
export class ContactTemplate {
  //region Field names
  static readonly field = {
    EMAIL: 'email',
    FAX: 'fax',
    PHONE1: 'phone1',
    PHONE2: 'phone2',
  };
  //endregion

  //region Fields
  @Property({ nullable: true })
  email?: string;
  @Property({ nullable: true })
  fax?: string;
  @Property({ nullable: true })
  phone1?: string;
  @Property({ nullable: true })
  phone2?: string;
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return 'ContactTemplate';
  }
  //endregion
}

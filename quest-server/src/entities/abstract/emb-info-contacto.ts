// Mikro-ORM imports
import {
  Embeddable,
  Property } from '@mikro-orm/core';

@Embeddable()
export class EmbInfoContacto {

  static field = {
    EMAIL: 'email',
    TELEFONO1: 'telefono1',
    TELEFONO2: 'telefono2',
    TELEFONO3: 'telefono3',
  };


  // Fields

  @Property({ nullable: true })
  email?: string;

  @Property({ nullable: true })
  telefono1?: string;

  @Property({ nullable: true })
  telefono2?: string;

  @Property({ nullable: true })
  telefono3?: string;

}

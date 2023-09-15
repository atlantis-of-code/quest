// Mikro-ORM imports
import {
  Collection,
  Entity,
  ManyToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Cliente } from '../clientes/cliente';

@Entity({ tableName: 'contactos.contacto' })
export class Contacto extends QuestEntity {

  static field = {
    EMAIL: 'email',
    NOMBRE: 'nombre',
    TELEFONO1: 'telefono1',
    TELEFONO2: 'telefono2',
    TELEFONO3: 'telefono3',
  };


  static collection = {
    CLIENTE: 'clienteCollection',
  };

  // Fields

  @Property({ nullable: true })
  email?: string;

  @Property({ nullable: true })
  nombre?: string;

  @Property({ nullable: true })
  telefono1?: string;

  @Property({ nullable: true })
  telefono2?: string;

  @Property({ nullable: true })
  telefono3?: string;

  // Mapped collections and inversed entities

  @ManyToMany({ entity: () => Cliente, mappedBy: (e: Cliente) => e.contactoCollection })
  clienteCollection: Collection<Cliente> = new Collection<Cliente>(this);

}

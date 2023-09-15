// Mikro-ORM imports
import {
  Collection,
  Entity,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Direccion } from './direccion';

@Entity({ tableName: 'common.denominacion_via' })
export class DenominacionVia extends QuestEntity {

  static field = {
    NOMBRE: 'nombre',
  };


  static collection = {
    DIRECCION: 'direccionCollection',
  };

  // Fields

  @Property()
  nombre!: string;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'Direccion', mappedBy: (e: Direccion) => e.denominacionVia, orphanRemoval: false })
  direccionCollection: Collection<Direccion> = new Collection<Direccion>(this);

}

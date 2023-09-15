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

@Entity({ tableName: 'common.pais' })
export class Pais extends QuestEntity {

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

  @OneToMany({ entity: () => 'Direccion', mappedBy: (e: Direccion) => e.pais, orphanRemoval: false })
  direccionCollection: Collection<Direccion> = new Collection<Direccion>(this);

}

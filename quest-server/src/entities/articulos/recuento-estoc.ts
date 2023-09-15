// Mikro-ORM imports
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Fichero } from '../ficheros/fichero';
import { MovimientoEstoc } from './movimiento-estoc';

@Entity({ tableName: 'articulos.recuento_estoc' })
export class RecuentoEstoc extends QuestEntity {

  static field = {
    FECHA: 'fecha',
  };

  static entity = {
    FICHERO: 'fichero',
  };

  static collection = {
    MOVIMIENTO_ESTOC: 'movimientoEstocCollection',
  };

  // Fields

  @Property()
  fecha?: Date;

  // Entities

  @ManyToOne({ entity: () => 'Fichero', fieldName: 'fichero_id', nullable: true })
  fichero?: Fichero;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'MovimientoEstoc', mappedBy: (e: MovimientoEstoc) => e.recuentoEstoc, orphanRemoval: true })
  movimientoEstocCollection: Collection<MovimientoEstoc> = new Collection<MovimientoEstoc>(this);

}

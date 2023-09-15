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
import { Articulo } from './articulo';
import { MovimientoEstoc } from './movimiento-estoc';
import { TraspasoEstoc } from './traspaso-estoc';

@Entity({ tableName: 'articulos.linea_traspaso_estoc' })
export class LineaTraspasoEstoc extends QuestEntity {

  static field = {
    CANTIDAD: 'cantidad',
  };

  static entity = {
    ARTICULO: 'articulo',
    TRASPASO_ESTOC: 'traspasoEstoc',
  };

  static collection = {
    MOVIMIENTO_ESTOC: 'movimientoEstocCollection',
  };

  // Fields

  @Property()
  cantidad!: string;

  // Entities

  @ManyToOne({ entity: () => 'Articulo', fieldName: 'articulo_id', nullable: true })
  articulo?: Articulo;

  @ManyToOne({ entity: () => 'TraspasoEstoc', fieldName: 'traspaso_estoc_id', nullable: true })
  traspasoEstoc?: TraspasoEstoc;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'MovimientoEstoc', mappedBy: (e: MovimientoEstoc) => e.lineaTraspasoEstoc, orphanRemoval: false })
  movimientoEstocCollection: Collection<MovimientoEstoc> = new Collection<MovimientoEstoc>(this);

}

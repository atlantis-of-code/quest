// Mikro-ORM imports
import {
  Entity,
  ManyToOne,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Almacen } from './almacen';
import { Articulo } from './articulo';

@Entity({ tableName: 'articulos.estoc' })
export class Estoc extends QuestEntity {

  static field = {
    CANTIDAD: 'cantidad',
  };

  static entity = {
    ALMACEN: 'almacen',
    ARTICULO: 'articulo',
  };

  // Fields

  @Property()
  cantidad?: string;

  // Entities

  @ManyToOne({ entity: () => 'Almacen', fieldName: 'almacen_id', nullable: true })
  almacen?: Almacen;

  @ManyToOne({ entity: () => 'Articulo', fieldName: 'articulo_id', nullable: true })
  articulo?: Articulo;

}

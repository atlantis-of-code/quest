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
import { Almacen } from './almacen';
import { LineaTraspasoEstoc } from './linea-traspaso-estoc';

@Entity({ tableName: 'articulos.traspaso_estoc' })
export class TraspasoEstoc extends QuestEntity {

  static field = {
    FECHA: 'fecha',
  };

  static entity = {
    ALMACEN_DESTINO: 'almacenDestino',
    ALMACEN_ORIGEN: 'almacenOrigen',
  };

  static collection = {
    LINEA_TRASPASO_ESTOC: 'lineaTraspasoEstocCollection',
  };

  // Fields

  @Property()
  fecha?: Date;

  // Entities

  @ManyToOne({ entity: () => 'Almacen', fieldName: 'almacen_destino_id' })
  almacenDestino!: Almacen;

  @ManyToOne({ entity: () => 'Almacen', fieldName: 'almacen_origen_id' })
  almacenOrigen!: Almacen;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'LineaTraspasoEstoc', mappedBy: (e: LineaTraspasoEstoc) => e.traspasoEstoc, orphanRemoval: true })
  lineaTraspasoEstocCollection: Collection<LineaTraspasoEstoc> = new Collection<LineaTraspasoEstoc>(this);

}

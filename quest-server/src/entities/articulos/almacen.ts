// Mikro-ORM imports
import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Estoc } from './estoc';
import { LineaAlbaran } from '../facturacion/linea-albaran';
import { LineaPresupuesto } from '../facturacion/linea-presupuesto';
import { MovimientoEstoc } from './movimiento-estoc';
import { TraspasoEstoc } from './traspaso-estoc';
import { Vehiculo } from '../tecnicos/vehiculo';

@Entity({ tableName: 'articulos.almacen' })
export class Almacen extends QuestEntity {

  static field = {
    NOMBRE: 'nombre',
  };

  static entity = {
    VEHICULO: 'vehiculo',
  };

  static collection = {
    ESTOC: 'estocCollection',
    LINEA_ALBARAN: 'lineaAlbaranCollection',
    LINEA_PRESUPUESTO: 'lineaPresupuestoCollection',
    MOVIMIENTO_ESTOC: 'movimientoEstocCollection',
    TRASPASO_ESTOC_ALMACEN_DESTINO: 'traspasoEstocAlmacenDestinoCollection',
    TRASPASO_ESTOC_ALMACEN_ORIGEN: 'traspasoEstocAlmacenOrigenCollection',
  };

  // Fields

  @Property()
  nombre!: string;

  // Entities

  @OneToOne({ entity: () => 'Vehiculo', inversedBy: (e: Vehiculo) => e.almacen, nullable: true, orphanRemoval: false })
  vehiculo?: Vehiculo;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'Estoc', mappedBy: (e: Estoc) => e.almacen, orphanRemoval: true })
  estocCollection: Collection<Estoc> = new Collection<Estoc>(this);

  @OneToMany({ entity: () => 'LineaAlbaran', mappedBy: (e: LineaAlbaran) => e.almacen, orphanRemoval: false })
  lineaAlbaranCollection: Collection<LineaAlbaran> = new Collection<LineaAlbaran>(this);

  @OneToMany({ entity: () => 'LineaPresupuesto', mappedBy: (e: LineaPresupuesto) => e.almacen, orphanRemoval: false })
  lineaPresupuestoCollection: Collection<LineaPresupuesto> = new Collection<LineaPresupuesto>(this);

  @OneToMany({ entity: () => 'MovimientoEstoc', mappedBy: (e: MovimientoEstoc) => e.almacen, orphanRemoval: true })
  movimientoEstocCollection: Collection<MovimientoEstoc> = new Collection<MovimientoEstoc>(this);

  @OneToMany({ entity: () => 'TraspasoEstoc', mappedBy: (e: TraspasoEstoc) => e.almacenDestino, orphanRemoval: false })
  traspasoEstocAlmacenDestinoCollection: Collection<TraspasoEstoc> = new Collection<TraspasoEstoc>(this);

  @OneToMany({ entity: () => 'TraspasoEstoc', mappedBy: (e: TraspasoEstoc) => e.almacenOrigen, orphanRemoval: false })
  traspasoEstocAlmacenOrigenCollection: Collection<TraspasoEstoc> = new Collection<TraspasoEstoc>(this);

}

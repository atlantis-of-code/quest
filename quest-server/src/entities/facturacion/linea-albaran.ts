// Mikro-ORM imports
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Albaran } from './albaran';
import { Almacen } from '../articulos/almacen';
import { Articulo } from '../articulos/articulo';
import { MovimientoEstoc } from '../articulos/movimiento-estoc';
import { Ticket } from './ticket';

@Entity({ tableName: 'facturacion.linea_albaran' })
export class LineaAlbaran extends QuestEntity {

  static field = {
    CANTIDAD: 'cantidad',
    CODIGO_ARTICULO: 'codigo_articulo',
    DESCUENTO: 'descuento',
    NOMBRE_ARTICULO: 'nombre_articulo',
    ORDEN: 'orden',
    PRECIO_BASE: 'precio_base',
    TOTAL_BASE: 'total_base',
  };

  static entity = {
    ALMACEN: 'almacen',
    ARTICULO: 'articulo',
  };

  static collection = {
    ALBARAN: 'albaranCollection',
    MOVIMIENTO_ESTOC: 'movimientoEstocCollection',
    TICKET: 'ticketCollection',
  };

  // Fields

  @Property({ nullable: true })
  cantidad?: string;

  @Property({ nullable: true })
  codigo_articulo?: string;

  @Property({ nullable: true })
  descuento?: string;

  @Property({ nullable: true })
  nombre_articulo?: string;

  @Property({ nullable: true })
  orden?: number;

  @Property({ nullable: true })
  precio_base?: string;

  @Property({ nullable: true })
  total_base?: string;

  // Entities

  @ManyToOne({ entity: () => 'Almacen', fieldName: 'almacen_id', nullable: true })
  almacen?: Almacen;

  @ManyToOne({ entity: () => 'Articulo', fieldName: 'articulo_id', nullable: true })
  articulo?: Articulo;

  // Mapped collections and inversed entities

  @ManyToMany({ entity: () => Albaran, mappedBy: (e: Albaran) => e.lineaAlbaranCollection })
  albaranCollection: Collection<Albaran> = new Collection<Albaran>(this);

  @OneToMany({ entity: () => 'MovimientoEstoc', mappedBy: (e: MovimientoEstoc) => e.lineaAlbaran, orphanRemoval: false })
  movimientoEstocCollection: Collection<MovimientoEstoc> = new Collection<MovimientoEstoc>(this);

  @ManyToMany({ entity: () => Ticket, mappedBy: (e: Ticket) => e.lineaAlbaranCollection })
  ticketCollection: Collection<Ticket> = new Collection<Ticket>(this);

}

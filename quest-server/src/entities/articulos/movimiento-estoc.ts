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
import { LineaAlbaran } from '../facturacion/linea-albaran';
import { LineaTraspasoEstoc } from './linea-traspaso-estoc';
import { RecuentoEstoc } from './recuento-estoc';

// Enums as constant objects

export const Tipo = {
  ALBARAN: 'Albarán',
  TICKET: 'Ticket',
  TRASPASO: 'Traspaso',
  RECUENTO: 'Recuento',
} as const;
export type TipoType = typeof Tipo[keyof typeof Tipo];

@Entity({ tableName: 'articulos.movimiento_estoc' })
export class MovimientoEstoc extends QuestEntity {

  static field = {
    CANTIDAD: 'cantidad',
    DESCRIPCION: 'descripcion',
    ESTOC_ANTERIOR: 'estoc_anterior',
    FECHA: 'fecha',
    NOMBRE_CLIENTE: 'nombre_cliente',
    NOMBRE_DOCUMENTO: 'nombre_documento',
    OPERACION_DOCUMENTO: 'operacion_documento',
    TIPO: 'tipo',
  };

  static entity = {
    ALMACEN: 'almacen',
    ARTICULO: 'articulo',
    LINEA_ALBARAN: 'lineaAlbaran',
    LINEA_TRASPASO_ESTOC: 'lineaTraspasoEstoc',
    RECUENTO_ESTOC: 'recuentoEstoc',
  };

  // Fields

  @Property()
  cantidad?: string;

  @Property({ nullable: true })
  descripcion?: string;

  @Property()
  estoc_anterior?: string;

  @Property()
  fecha?: Date;

  @Property({ nullable: true })
  nombre_cliente?: string;

  @Property({ nullable: true })
  nombre_documento?: string;

  @Property({ nullable: true })
  operacion_documento?: string;

  @Property()
  tipo!: TipoType;

  // Entities

  @ManyToOne({ entity: () => 'Almacen', fieldName: 'almacen_id' })
  almacen!: Almacen;

  @ManyToOne({ entity: () => 'Articulo', fieldName: 'articulo_id' })
  articulo!: Articulo;

  @ManyToOne({ entity: () => 'LineaAlbaran', fieldName: 'linea_albaran_id', nullable: true })
  lineaAlbaran?: LineaAlbaran;

  @ManyToOne({ entity: () => 'LineaTraspasoEstoc', fieldName: 'linea_traspaso_estoc_id', nullable: true })
  lineaTraspasoEstoc?: LineaTraspasoEstoc;

  @ManyToOne({ entity: () => 'RecuentoEstoc', fieldName: 'recuento_estoc_id', nullable: true })
  recuentoEstoc?: RecuentoEstoc;

}

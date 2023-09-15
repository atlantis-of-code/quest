// Mikro-ORM imports
import {
  Entity,
  ManyToOne,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Almacen } from '../articulos/almacen';
import { Articulo } from '../articulos/articulo';
import { Presupuesto } from './presupuesto';

@Entity({ tableName: 'facturacion.linea_presupuesto' })
export class LineaPresupuesto extends QuestEntity {

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
    PRESUPUESTO: 'presupuesto',
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

  @ManyToOne({ entity: () => 'Presupuesto', fieldName: 'presupuesto_id', nullable: true })
  presupuesto?: Presupuesto;

}

// Mikro-ORM imports
import {
  Embeddable,
  ManyToOne,
  Property } from '@mikro-orm/core';
// Entities imports
import { Almacen } from '../articulos/almacen';
import { Articulo } from '../articulos/articulo';

@Embeddable()
export class EmbLineaDocumento {

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

  @ManyToOne({ entity: () => 'Articulo', fieldName: 'articulo_id', eager: true, nullable: true })
  articulo?: Articulo;

}

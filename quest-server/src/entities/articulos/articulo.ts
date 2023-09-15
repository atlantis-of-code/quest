// Mikro-ORM imports
import {
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Categoria } from './categoria';
import { Estoc } from './estoc';
import { Fichero } from '../ficheros/fichero';
import { LineaAlbaran } from '../facturacion/linea-albaran';
import { LineaPresupuesto } from '../facturacion/linea-presupuesto';
import { LineaTraspasoEstoc } from './linea-traspaso-estoc';
import { MovimientoEstoc } from './movimiento-estoc';

@Entity({ tableName: 'articulos.articulo' })
export class Articulo extends QuestEntity {

  static field = {
    CODIGO: 'codigo',
    DE_ALTA: 'de_alta',
    NOMBRE: 'nombre',
    PRECIO_BASE: 'precio_base',
  };

  static entity = {
    CATEGORIA: 'categoria',
    FOTO: 'foto',
  };

  static collection = {
    ESTOC: 'estocCollection',
    FICHERO: 'ficheroCollection',
    LINEA_ALBARAN: 'lineaAlbaranCollection',
    LINEA_PRESUPUESTO: 'lineaPresupuestoCollection',
    LINEA_TRASPASO_ESTOC: 'lineaTraspasoEstocCollection',
    MOVIMIENTO_ESTOC: 'movimientoEstocCollection',
  };

  // Fields

  @Property()
  codigo!: number;

  @Property()
  de_alta?: boolean;

  @Property()
  nombre!: string;

  @Property()
  precio_base?: string;

  // Entities

  @ManyToOne({ entity: () => 'Categoria', fieldName: 'categoria_id', nullable: true })
  categoria?: Categoria;

  @ManyToOne({ entity: () => 'Fichero', fieldName: 'foto_id', nullable: true, cascade: [Cascade.REMOVE] })
  foto?: Fichero;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'Estoc', mappedBy: (e: Estoc) => e.articulo, orphanRemoval: true })
  estocCollection: Collection<Estoc> = new Collection<Estoc>(this);

  @ManyToMany({ entity: () => 'Fichero', pivotTable: 'articulos.articulo_fichero', joinColumn: 'articulo_id', inverseJoinColumn: 'fichero_id', cascade: [Cascade.REMOVE] })
  ficheroCollection: Collection<Fichero> = new Collection<Fichero>(this);

  @OneToMany({ entity: () => 'LineaAlbaran', mappedBy: (e: LineaAlbaran) => e.articulo, orphanRemoval: false })
  lineaAlbaranCollection: Collection<LineaAlbaran> = new Collection<LineaAlbaran>(this);

  @OneToMany({ entity: () => 'LineaPresupuesto', mappedBy: (e: LineaPresupuesto) => e.articulo, orphanRemoval: false })
  lineaPresupuestoCollection: Collection<LineaPresupuesto> = new Collection<LineaPresupuesto>(this);

  @OneToMany({ entity: () => 'LineaTraspasoEstoc', mappedBy: (e: LineaTraspasoEstoc) => e.articulo, orphanRemoval: false })
  lineaTraspasoEstocCollection: Collection<LineaTraspasoEstoc> = new Collection<LineaTraspasoEstoc>(this);

  @OneToMany({ entity: () => 'MovimientoEstoc', mappedBy: (e: MovimientoEstoc) => e.articulo, orphanRemoval: true })
  movimientoEstocCollection: Collection<MovimientoEstoc> = new Collection<MovimientoEstoc>(this);

}

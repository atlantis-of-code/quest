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
import { AnyoFiscal } from '../common/anyo-fiscal';
import { Cliente } from '../clientes/cliente';
import { Direccion } from '../common/direccion';
import { Fichero } from '../ficheros/fichero';
import { LineaPresupuesto } from './linea-presupuesto';

@Entity({ tableName: 'facturacion.presupuesto' })
export class Presupuesto extends QuestEntity {

  static field = {
    FECHA: 'fecha',
    IVA: 'iva',
    NUMERO: 'numero',
    OBSERVACIONES: 'observaciones',
    SERIE: 'serie',
    TOTAL: 'total',
    TOTAL_BASE: 'total_base',
    TOTAL_IMPUESTOS: 'total_impuestos',
  };

  static entity = {
    ANYO_FISCAL: 'anyoFiscal',
    CLIENTE: 'cliente',
    DIRECCION_FISCAL: 'direccionFiscal',
    DIRECCION_OBRA: 'direccionObra',
  };

  static collection = {
    FICHERO: 'ficheroCollection',
    LINEA_PRESUPUESTO: 'lineaPresupuestoCollection',
  };

  // Fields

  @Property({ nullable: true })
  fecha?: Date;

  @Property({ nullable: true })
  iva?: string;

  @Property({ nullable: true })
  numero?: number;

  @Property({ nullable: true })
  observaciones?: string;

  @Property({ nullable: true })
  serie?: string;

  @Property({ nullable: true })
  total?: string;

  @Property({ nullable: true })
  total_base?: string;

  @Property({ nullable: true })
  total_impuestos?: string;

  // Entities

  @ManyToOne({ entity: () => 'AnyoFiscal', fieldName: 'anyo_fiscal_id', nullable: true })
  anyoFiscal?: AnyoFiscal;

  @ManyToOne({ entity: () => 'Cliente', fieldName: 'cliente_id' })
  cliente!: Cliente;

  @ManyToOne({ entity: () => 'Direccion', fieldName: 'direccion_fiscal_id', nullable: true, cascade: [Cascade.REMOVE] })
  direccionFiscal?: Direccion;

  @ManyToOne({ entity: () => 'Direccion', fieldName: 'direccion_obra_id', nullable: true, cascade: [Cascade.REMOVE] })
  direccionObra?: Direccion;

  // Mapped collections and inversed entities

  @ManyToMany({ entity: () => 'Fichero', pivotTable: 'facturacion.presupuesto_fichero', joinColumn: 'presupuesto_id', inverseJoinColumn: 'fichero_id', cascade: [Cascade.REMOVE] })
  ficheroCollection: Collection<Fichero> = new Collection<Fichero>(this);

  @OneToMany({ entity: () => 'LineaPresupuesto', mappedBy: (e: LineaPresupuesto) => e.presupuesto, orphanRemoval: true })
  lineaPresupuestoCollection: Collection<LineaPresupuesto> = new Collection<LineaPresupuesto>(this);

}

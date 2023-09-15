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
import { Albaran } from './albaran';
import { AnyoFiscal } from '../common/anyo-fiscal';
import { Cliente } from '../clientes/cliente';
import { DatosFiscales } from '../common/datos-fiscales';
import { Direccion } from '../common/direccion';
import { Fichero } from '../ficheros/fichero';
import { Tecnico } from '../tecnicos/tecnico';

@Entity({ tableName: 'facturacion.factura' })
export class Factura extends QuestEntity {

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
    COPIA_DATOS_CLIENTE: 'copiaDatosCliente',
    COPIA_DATOS_EMPRESA: 'copiaDatosEmpresa',
    DIRECCION_FISCAL: 'direccionFiscal',
    DIRECCION_OBRA: 'direccionObra',
    TECNICO: 'tecnico',
  };

  static collection = {
    ALBARAN: 'albaranCollection',
    FICHERO: 'ficheroCollection',
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

  @ManyToOne({ entity: () => 'DatosFiscales', fieldName: 'copia_datos_cliente_id', nullable: true })
  copiaDatosCliente?: DatosFiscales;

  @ManyToOne({ entity: () => 'DatosFiscales', fieldName: 'copia_datos_empresa_id', nullable: true })
  copiaDatosEmpresa?: DatosFiscales;

  @ManyToOne({ entity: () => 'Direccion', fieldName: 'direccion_fiscal_id', nullable: true, cascade: [Cascade.REMOVE] })
  direccionFiscal?: Direccion;

  @ManyToOne({ entity: () => 'Direccion', fieldName: 'direccion_obra_id', nullable: true, cascade: [Cascade.REMOVE] })
  direccionObra?: Direccion;

  @ManyToOne({ entity: () => 'Tecnico', fieldName: 'tecnico_id', nullable: true })
  tecnico?: Tecnico;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'Albaran', mappedBy: (e: Albaran) => e.factura, orphanRemoval: false })
  albaranCollection: Collection<Albaran> = new Collection<Albaran>(this);

  @ManyToMany({ entity: () => 'Fichero', pivotTable: 'facturacion.factura_fichero', joinColumn: 'factura_id', inverseJoinColumn: 'fichero_id', cascade: [Cascade.REMOVE] })
  ficheroCollection: Collection<Fichero> = new Collection<Fichero>(this);

}

// Mikro-ORM imports
import {
  Embeddable,
  ManyToOne,
  Property } from '@mikro-orm/core';
// Entities imports
import { AnyoFiscal } from '../common/anyo-fiscal';
import { Cliente } from '../clientes/cliente';
import { Direccion } from '../common/direccion';

@Embeddable()
export class EmbDocumento {

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

  @ManyToOne({ entity: () => 'AnyoFiscal', fieldName: 'anyo_fiscal_id', eager: true, nullable: true })
  anyoFiscal?: AnyoFiscal;

  @ManyToOne({ entity: () => 'Cliente', fieldName: 'cliente_id', eager: true })
  cliente!: Cliente;

  @ManyToOne({ entity: () => 'Direccion', fieldName: 'direccion_fiscal_id', eager: true, nullable: true })
  direccionFiscal?: Direccion;

  @ManyToOne({ entity: () => 'Direccion', fieldName: 'direccion_obra_id', eager: true, nullable: true })
  direccionObra?: Direccion;

}

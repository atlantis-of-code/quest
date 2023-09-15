// AocEmbeddedModel import
import { AocEmbeddedModel } from '@atlantis-of-code/aoc-client/core/models';
// Model imports
import { AnyoFiscal } from '../common/anyo-fiscal';
import { Cliente } from '../clientes/cliente';
import { Direccion } from '../common/direccion';

export class EmbDocumento extends AocEmbeddedModel {

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

  fecha?: Date;
  iva?: string;
  numero?: number;
  observaciones?: string;
  serie?: string;
  total?: string;
  total_base?: string;
  total_impuestos?: string;

  // Models

  anyoFiscal?: AnyoFiscal;
  cliente!: Cliente;
  direccionFiscal?: Direccion;
  direccionObra?: Direccion;

}

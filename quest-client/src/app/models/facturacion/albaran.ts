// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { AnyoFiscal } from '../common/anyo-fiscal';
import { Cliente } from '../clientes/cliente';
import { Direccion } from '../common/direccion';
import { Factura } from './factura';
import { Fichero } from '../ficheros/fichero';
import { LineaAlbaran } from './linea-albaran';
import { Tecnico } from '../tecnicos/tecnico';

export class Albaran extends MavermaModel {

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
    FACTURA: 'factura',
    TECNICO: 'tecnico',
  };

  static collection = {
    FICHERO: 'ficheroCollection',
    LINEA_ALBARAN: 'lineaAlbaranCollection',
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
  factura?: Factura;
  tecnico?: Tecnico;

  // Mapped collections and inversed models

  ficheroCollection: Fichero[];
  lineaAlbaranCollection: LineaAlbaran[];

}

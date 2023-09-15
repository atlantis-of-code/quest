// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { AnyoFiscal } from '../common/anyo-fiscal';
import { Cliente } from '../clientes/cliente';
import { DatosFiscales } from '../common/datos-fiscales';
import { Direccion } from '../common/direccion';
import { Fichero } from '../ficheros/fichero';
import { LineaAlbaran } from './linea-albaran';

export class Ticket extends MavermaModel {

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
  copiaDatosCliente?: DatosFiscales;
  copiaDatosEmpresa?: DatosFiscales;
  direccionFiscal?: Direccion;
  direccionObra?: Direccion;

  // Mapped collections and inversed models

  ficheroCollection: Fichero[];
  lineaAlbaranCollection: LineaAlbaran[];

}

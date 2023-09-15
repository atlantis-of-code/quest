// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Bombona } from '../articulos/bombona';
import { Contrato } from './contrato';

export class Descuento extends MavermaModel {

  static field = {
    DESCUENTO_EUROS: 'descuento_euros',
    DESCUENTO_MAXIMO: 'descuento_maximo',
    DESCUENTO_PORCENTAJE: 'descuento_porcentaje',
    FECHA_FIN: 'fecha_fin',
    FECHA_INICIO: 'fecha_inicio',
    PORCENTAJE_AGENCIA: 'porcentaje_agencia',
    PORCENTAJE_REPSOL: 'porcentaje_repsol',
  };

  static entity = {
    BOMBONA: 'bombona',
    CONTRATO: 'contrato',
  };


  // Fields

  descuento_euros?: string;
  descuento_maximo?: boolean;
  descuento_porcentaje?: string;
  fecha_fin?: Date;
  fecha_inicio?: Date;
  porcentaje_agencia?: string;
  porcentaje_repsol?: string;

  // Models

  bombona?: Bombona;
  contrato?: Contrato;

}

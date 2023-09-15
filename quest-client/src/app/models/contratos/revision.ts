// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Contrato } from './contrato';

export class Revision extends MavermaModel {

  static field = {
    FECHA: 'fecha',
    NUMERO: 'numero',
    RESULTADO: 'resultado',
    TIPO: 'tipo',
  };

  static entity = {
    CONTRATO: 'contrato',
  };


  // Fields

  fecha?: Date;
  numero?: number;
  resultado?: string;
  tipo?: string;

  // Models

  contrato?: Contrato;

}

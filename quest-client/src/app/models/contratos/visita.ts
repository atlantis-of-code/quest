// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Contrato } from './contrato';

export class Visita extends MavermaModel {

  static field = {
    DESCRIPCION: 'descripcion',
    FECHA: 'fecha',
  };

  static entity = {
    CONTRATO: 'contrato',
  };


  // Fields

  descripcion!: string;
  fecha?: Date;

  // Models

  contrato?: Contrato;

}

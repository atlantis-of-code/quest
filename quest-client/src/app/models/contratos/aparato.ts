// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Contrato } from './contrato';

export class Aparato extends MavermaModel {

  static field = {
    ANYO: 'anyo',
    MARCA: 'marca',
    MODELO: 'modelo',
    POTENCIA: 'potencia',
    TIPO: 'tipo',
  };

  static entity = {
    CONTRATO: 'contrato',
  };


  // Fields

  anyo?: number;
  marca?: string;
  modelo?: string;
  potencia?: string;
  tipo?: string;

  // Models

  contrato?: Contrato;

}

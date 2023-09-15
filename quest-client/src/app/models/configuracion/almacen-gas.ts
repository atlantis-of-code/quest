// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Contrato } from '../contratos/contrato';

export class AlmacenGas extends MavermaModel {

  static field = {
    CODIGO: 'codigo',
    NOMBRE: 'nombre',
  };


  static collection = {
    CONTRATO: 'contratoCollection',
  };


  // Fields

  codigo!: string;
  nombre!: string;

  // Mapped collections and inversed models

  contratoCollection: Contrato[];

}

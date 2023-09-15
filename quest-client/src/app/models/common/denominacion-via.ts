// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Direccion } from './direccion';

export class DenominacionVia extends MavermaModel {

  static field = {
    NOMBRE: 'nombre',
  };


  static collection = {
    DIRECCION: 'direccionCollection',
  };


  // Fields

  nombre!: string;

  // Mapped collections and inversed models

  direccionCollection: Direccion[];

}

// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Usuario } from './usuario';

export class Grupo extends MavermaModel {

  static field = {
    NOMBRE: 'nombre',
  };


  static collection = {
    USUARIO: 'usuarioCollection',
  };


  // Fields

  nombre!: string;

  // Mapped collections and inversed models

  usuarioCollection: Usuario[];

}

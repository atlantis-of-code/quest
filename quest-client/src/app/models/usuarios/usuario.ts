// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Grupo } from './grupo';
import { Repartidor } from '../pedidos/repartidor';
import { Tecnico } from '../tecnicos/tecnico';

export class Usuario extends MavermaModel {

  static field = {
    CONTRASENYA: 'contrasenya',
    MAIL: 'mail',
    NOMBRE: 'nombre',
    NOMBRE_COMPLETO: 'nombre_completo',
  };

  static entity = {
    REPARTIDOR: 'repartidor',
    TECNICO: 'tecnico',
  };

  static collection = {
    GRUPO: 'grupoCollection',
  };


  // Fields

  contrasenya!: string;
  mail!: string;
  nombre!: string;
  nombre_completo?: string;

  // Models

  repartidor?: Repartidor;
  tecnico?: Tecnico;

  // Mapped collections and inversed models

  grupoCollection: Grupo[];

}

// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Cliente } from '../clientes/cliente';

export class Contacto extends MavermaModel {

  static field = {
    EMAIL: 'email',
    NOMBRE: 'nombre',
    TELEFONO1: 'telefono1',
    TELEFONO2: 'telefono2',
    TELEFONO3: 'telefono3',
  };


  static collection = {
    CLIENTE: 'clienteCollection',
  };


  // Fields

  email?: string;
  nombre?: string;
  telefono1?: string;
  telefono2?: string;
  telefono3?: string;

  // Mapped collections and inversed models

  clienteCollection: Cliente[];

}

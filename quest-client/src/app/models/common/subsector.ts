// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Cliente } from '../clientes/cliente';
import { Contrato } from '../contratos/contrato';
import { Sector } from './sector';

export class Subsector extends MavermaModel {

  static field = {
    NOMBRE: 'nombre',
  };

  static entity = {
    SECTOR: 'sector',
  };

  static collection = {
    CLIENTE: 'clienteCollection',
    CONTRATO: 'contratoCollection',
  };


  // Fields

  nombre!: string;

  // Models

  sector?: Sector;

  // Mapped collections and inversed models

  clienteCollection: Cliente[];
  contratoCollection: Contrato[];

}

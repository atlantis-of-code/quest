// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Cliente } from '../clientes/cliente';
import { Contrato } from '../contratos/contrato';
import { Subsector } from './subsector';

export class Sector extends MavermaModel {

  static field = {
    NOMBRE: 'nombre',
  };


  static collection = {
    CLIENTE: 'clienteCollection',
    CONTRATO: 'contratoCollection',
    SUBSECTOR: 'subsectorCollection',
  };


  // Fields

  nombre!: string;

  // Mapped collections and inversed models

  clienteCollection: Cliente[];
  contratoCollection: Contrato[];
  subsectorCollection: Subsector[];

}

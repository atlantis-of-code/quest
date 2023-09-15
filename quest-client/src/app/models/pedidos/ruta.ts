// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Pedido } from './pedido';

export class Ruta extends MavermaModel {

  static field = {
    NOMBRE: 'nombre',
  };


  static collection = {
    PEDIDO: 'pedidoCollection',
  };


  // Fields

  nombre!: string;

  // Mapped collections and inversed models

  pedidoCollection: Pedido[];

}

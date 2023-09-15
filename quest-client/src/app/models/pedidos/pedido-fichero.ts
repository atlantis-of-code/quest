// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Fichero } from '../ficheros/fichero';
import { Pedido } from './pedido';

export class PedidoFichero extends MavermaModel {


  static entity = {
    FICHERO: 'fichero',
    PEDIDO: 'pedido',
  };


  // Models

  fichero?: Fichero;
  pedido?: Pedido;

}

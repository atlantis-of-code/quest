// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Pedido } from '../pedidos/pedido';

export class ModoDePago extends MavermaModel {

  static field = {
    CODIGO_NACE: 'codigo_nace',
    NOMBRE: 'nombre',
  };


  static collection = {
    PEDIDO: 'pedidoCollection',
  };


  // Fields

  codigo_nace?: number;
  nombre!: string;

  // Mapped collections and inversed models

  pedidoCollection: Pedido[];

}

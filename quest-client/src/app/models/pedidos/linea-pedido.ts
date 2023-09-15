// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Bombona } from '../articulos/bombona';
import { Pedido } from './pedido';

export class LineaPedido extends MavermaModel {

  static field = {
    CANTIDAD: 'cantidad',
    DESCUENTO: 'descuento',
    IVA: 'iva',
    ORDEN: 'orden',
    PRECIO_UNITARIO: 'precio_unitario',
    PVP: 'pvp',
    SUPLEMENTO: 'suplemento',
    TOTAL_LINEA: 'total_linea',
  };

  static entity = {
    BOMBONA: 'bombona',
    PEDIDO: 'pedido',
  };


  // Fields

  cantidad!: number;
  descuento!: string;
  iva!: string;
  orden!: number;
  precio_unitario!: string;
  pvp!: string;
  suplemento!: string;
  total_linea!: string;

  // Models

  bombona?: Bombona;
  pedido?: Pedido;

}

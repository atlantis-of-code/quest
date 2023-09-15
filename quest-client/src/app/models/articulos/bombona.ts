// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { ContratoBombona } from '../contratos/contrato-bombona';
import { Descuento } from '../contratos/descuento';
import { LineaPedido } from '../pedidos/linea-pedido';

export class Bombona extends MavermaModel {

  static field = {
    CODIGO_MAVERMA: 'codigo_maverma',
    CODIGO_NACE: 'codigo_nace',
    FIANZA: 'fianza',
    PESO: 'peso',
  };


  static collection = {
    CONTRATO_BOMBONA: 'contratoBombonaCollection',
    DESCUENTO: 'descuentoCollection',
    LINEA_PEDIDO: 'lineaPedidoCollection',
  };


  // Fields

  codigo_maverma!: string;
  codigo_nace?: string;
  fianza?: string;
  peso!: string;

  // Mapped collections and inversed models

  contratoBombonaCollection: ContratoBombona[];
  descuentoCollection: Descuento[];
  lineaPedidoCollection: LineaPedido[];

}

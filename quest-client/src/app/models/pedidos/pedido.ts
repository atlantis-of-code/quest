// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Contrato } from '../contratos/contrato';
import { LineaPedido } from './linea-pedido';
import { ModoDePago } from '../common/modo-de-pago';
import { PedidoFichero } from './pedido-fichero';
import { Repartidor } from './repartidor';
import { Ruta } from './ruta';

export class Pedido extends MavermaModel {

  static field = {
    ALTA_EN_NACE: 'alta_en_nace',
    ENTREGADO: 'entregado',
    ENVIO_INMEDIATO_MOVILIDAD: 'envio_inmediato_movilidad',
    FECHA_CREACION: 'fecha_creacion',
    FECHA_ENTREGA: 'fecha_entrega',
    OBSERVACIONES_CLIENTE: 'observaciones_cliente',
    OBSERVACIONES_PEDIDO: 'observaciones_pedido',
    PETICION_FACTURA: 'peticion_factura',
    RUTA_DE_GUARDIA: 'ruta_de_guardia',
    SUMINISTRO_EXPRESS: 'suministro_express',
    TOTAL: 'total',
    TOTAL_IVA: 'total_iva',
    URGENTE: 'urgente',
  };

  static entity = {
    CONTRATO: 'contrato',
    MODO_DE_PAGO: 'modoDePago',
    REPARTIDOR: 'repartidor',
    RUTA: 'ruta',
  };

  static collection = {
    LINEA_PEDIDO: 'lineaPedidoCollection',
    PEDIDO_FICHERO: 'pedidoFicheroCollection',
  };


  // Fields

  alta_en_nace?: boolean;
  entregado?: boolean;
  envio_inmediato_movilidad?: boolean;
  fecha_creacion!: Date;
  fecha_entrega?: Date;
  observaciones_cliente?: string;
  observaciones_pedido?: string;
  peticion_factura?: boolean;
  ruta_de_guardia?: boolean;
  suministro_express?: boolean;
  total!: string;
  total_iva!: string;
  urgente?: boolean;

  // Models

  contrato?: Contrato;
  modoDePago?: ModoDePago;
  repartidor?: Repartidor;
  ruta?: Ruta;

  // Mapped collections and inversed models

  lineaPedidoCollection: LineaPedido[];
  pedidoFicheroCollection: PedidoFichero[];

}

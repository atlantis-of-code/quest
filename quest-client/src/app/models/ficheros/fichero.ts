// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Albaran } from '../facturacion/albaran';
import { Articulo } from '../articulos/articulo';
import { Cliente } from '../clientes/cliente';
import { Contrato } from '../contratos/contrato';
import { Factura } from '../facturacion/factura';
import { PedidoFichero } from '../pedidos/pedido-fichero';
import { Presupuesto } from '../facturacion/presupuesto';
import { RecuentoEstoc } from '../articulos/recuento-estoc';
import { Repartidor } from '../pedidos/repartidor';
import { Tecnico } from '../tecnicos/tecnico';
import { Ticket } from '../facturacion/ticket';
import { Vehiculo } from '../tecnicos/vehiculo';

export class Fichero extends MavermaModel {

  static field = {
    DIRECTORIO: 'directorio',
    MIME: 'mime',
    NOMBRE: 'nombre',
    REFERENCIA_CLASSE: 'referencia_classe',
    REFERENCIA_ID: 'referencia_id',
    SUBDIRECTORIO: 'subdirectorio',
  };


  static collection = {
    ALBARAN: 'albaranCollection',
    ARTICULO: 'articuloCollection',
    ARTICULO_FICHERO_FOTO: 'articuloFicheroFotoCollection',
    CLIENTE: 'clienteCollection',
    CONTRATO: 'contratoCollection',
    FACTURA: 'facturaCollection',
    PEDIDO_FICHERO: 'pedidoFicheroCollection',
    PRESUPUESTO: 'presupuestoCollection',
    RECUENTO_ESTOC: 'recuentoEstocCollection',
    REPARTIDOR: 'repartidorCollection',
    TECNICO: 'tecnicoCollection',
    TICKET: 'ticketCollection',
    VEHICULO_FACTURAS: 'vehiculoFacturasCollection',
    VEHICULO_INSPECCION_TECNICA: 'vehiculoInspeccionTecnicaCollection',
    VEHICULO_OTROS: 'vehiculoOtrosCollection',
  };

  static virtual = {
    RAW: 'raw',
  };


  // Fields

  directorio!: string;
  mime!: string;
  nombre!: string;
  referencia_classe!: string;
  referencia_id?: string;
  subdirectorio?: string;

  // Mapped collections and inversed models

  albaranCollection: Albaran[];
  articuloCollection: Articulo[];
  articuloFicheroFotoCollection: Articulo[];
  clienteCollection: Cliente[];
  contratoCollection: Contrato[];
  facturaCollection: Factura[];
  pedidoFicheroCollection: PedidoFichero[];
  presupuestoCollection: Presupuesto[];
  recuentoEstocCollection: RecuentoEstoc[];
  repartidorCollection: Repartidor[];
  tecnicoCollection: Tecnico[];
  ticketCollection: Ticket[];
  vehiculoFacturasCollection: Vehiculo[];
  vehiculoInspeccionTecnicaCollection: Vehiculo[];
  vehiculoOtrosCollection: Vehiculo[];

  // Virtual

  raw?: string;

}

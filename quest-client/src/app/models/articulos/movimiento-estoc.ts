// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Almacen } from './almacen';
import { Articulo } from './articulo';
import { LineaAlbaran } from '../facturacion/linea-albaran';
import { LineaTraspasoEstoc } from './linea-traspaso-estoc';
import { RecuentoEstoc } from './recuento-estoc';

// Enums as constant objects

export const Tipo = {
  ALBARAN: 'Albarán',
  TICKET: 'Ticket',
  TRASPASO: 'Traspaso',
  RECUENTO: 'Recuento',
} as const;
export type TipoType = typeof Tipo[keyof typeof Tipo];

export class MovimientoEstoc extends MavermaModel {

  static field = {
    CANTIDAD: 'cantidad',
    DESCRIPCION: 'descripcion',
    ESTOC_ANTERIOR: 'estoc_anterior',
    FECHA: 'fecha',
    NOMBRE_CLIENTE: 'nombre_cliente',
    NOMBRE_DOCUMENTO: 'nombre_documento',
    OPERACION_DOCUMENTO: 'operacion_documento',
    TIPO: 'tipo',
  };

  static entity = {
    ALMACEN: 'almacen',
    ARTICULO: 'articulo',
    LINEA_ALBARAN: 'lineaAlbaran',
    LINEA_TRASPASO_ESTOC: 'lineaTraspasoEstoc',
    RECUENTO_ESTOC: 'recuentoEstoc',
  };


  // Fields

  cantidad?: string;
  descripcion?: string;
  estoc_anterior?: string;
  fecha?: Date;
  nombre_cliente?: string;
  nombre_documento?: string;
  operacion_documento?: string;
  tipo!: TipoType;

  // Models

  almacen!: Almacen;
  articulo!: Articulo;
  lineaAlbaran?: LineaAlbaran;
  lineaTraspasoEstoc?: LineaTraspasoEstoc;
  recuentoEstoc?: RecuentoEstoc;

}

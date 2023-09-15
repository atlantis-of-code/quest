// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Albaran } from './albaran';
import { Almacen } from '../articulos/almacen';
import { Articulo } from '../articulos/articulo';
import { MovimientoEstoc } from '../articulos/movimiento-estoc';
import { Ticket } from './ticket';

export class LineaAlbaran extends MavermaModel {

  static field = {
    CANTIDAD: 'cantidad',
    CODIGO_ARTICULO: 'codigo_articulo',
    DESCUENTO: 'descuento',
    NOMBRE_ARTICULO: 'nombre_articulo',
    ORDEN: 'orden',
    PRECIO_BASE: 'precio_base',
    TOTAL_BASE: 'total_base',
  };

  static entity = {
    ALMACEN: 'almacen',
    ARTICULO: 'articulo',
  };

  static collection = {
    ALBARAN: 'albaranCollection',
    MOVIMIENTO_ESTOC: 'movimientoEstocCollection',
    TICKET: 'ticketCollection',
  };


  // Fields

  cantidad?: string;
  codigo_articulo?: string;
  descuento?: string;
  nombre_articulo?: string;
  orden?: number;
  precio_base?: string;
  total_base?: string;

  // Models

  almacen?: Almacen;
  articulo?: Articulo;

  // Mapped collections and inversed models

  albaranCollection: Albaran[];
  movimientoEstocCollection: MovimientoEstoc[];
  ticketCollection: Ticket[];

}

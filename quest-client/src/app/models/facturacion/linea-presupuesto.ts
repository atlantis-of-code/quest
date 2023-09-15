// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Almacen } from '../articulos/almacen';
import { Articulo } from '../articulos/articulo';
import { Presupuesto } from './presupuesto';

export class LineaPresupuesto extends MavermaModel {

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
    PRESUPUESTO: 'presupuesto',
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
  presupuesto?: Presupuesto;

}

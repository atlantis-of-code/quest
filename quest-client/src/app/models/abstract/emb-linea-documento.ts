// AocEmbeddedModel import
import { AocEmbeddedModel } from '@atlantis-of-code/aoc-client/core/models';
// Model imports
import { Almacen } from '../articulos/almacen';
import { Articulo } from '../articulos/articulo';

export class EmbLineaDocumento extends AocEmbeddedModel {

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

}

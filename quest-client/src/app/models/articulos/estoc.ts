// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Almacen } from './almacen';
import { Articulo } from './articulo';

export class Estoc extends MavermaModel {

  static field = {
    CANTIDAD: 'cantidad',
  };

  static entity = {
    ALMACEN: 'almacen',
    ARTICULO: 'articulo',
  };


  // Fields

  cantidad?: string;

  // Models

  almacen?: Almacen;
  articulo?: Articulo;

}

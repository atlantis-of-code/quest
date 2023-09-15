// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Articulo } from './articulo';
import { MovimientoEstoc } from './movimiento-estoc';
import { TraspasoEstoc } from './traspaso-estoc';

export class LineaTraspasoEstoc extends MavermaModel {

  static field = {
    CANTIDAD: 'cantidad',
  };

  static entity = {
    ARTICULO: 'articulo',
    TRASPASO_ESTOC: 'traspasoEstoc',
  };

  static collection = {
    MOVIMIENTO_ESTOC: 'movimientoEstocCollection',
  };


  // Fields

  cantidad!: string;

  // Models

  articulo?: Articulo;
  traspasoEstoc?: TraspasoEstoc;

  // Mapped collections and inversed models

  movimientoEstocCollection: MovimientoEstoc[];

}

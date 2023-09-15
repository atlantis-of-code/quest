// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Fichero } from '../ficheros/fichero';
import { MovimientoEstoc } from './movimiento-estoc';

export class RecuentoEstoc extends MavermaModel {

  static field = {
    FECHA: 'fecha',
  };

  static entity = {
    FICHERO: 'fichero',
  };

  static collection = {
    MOVIMIENTO_ESTOC: 'movimientoEstocCollection',
  };


  // Fields

  fecha?: Date;

  // Models

  fichero?: Fichero;

  // Mapped collections and inversed models

  movimientoEstocCollection: MovimientoEstoc[];

}

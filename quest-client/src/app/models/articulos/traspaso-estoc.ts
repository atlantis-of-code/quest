// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Almacen } from './almacen';
import { LineaTraspasoEstoc } from './linea-traspaso-estoc';

export class TraspasoEstoc extends MavermaModel {

  static field = {
    FECHA: 'fecha',
  };

  static entity = {
    ALMACEN_DESTINO: 'almacenDestino',
    ALMACEN_ORIGEN: 'almacenOrigen',
  };

  static collection = {
    LINEA_TRASPASO_ESTOC: 'lineaTraspasoEstocCollection',
  };


  // Fields

  fecha?: Date;

  // Models

  almacenDestino!: Almacen;
  almacenOrigen!: Almacen;

  // Mapped collections and inversed models

  lineaTraspasoEstocCollection: LineaTraspasoEstoc[];

}

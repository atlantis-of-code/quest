// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Estoc } from './estoc';
import { LineaAlbaran } from '../facturacion/linea-albaran';
import { LineaPresupuesto } from '../facturacion/linea-presupuesto';
import { MovimientoEstoc } from './movimiento-estoc';
import { TraspasoEstoc } from './traspaso-estoc';
import { Vehiculo } from '../tecnicos/vehiculo';

export class Almacen extends MavermaModel {

  static field = {
    NOMBRE: 'nombre',
  };

  static entity = {
    VEHICULO: 'vehiculo',
  };

  static collection = {
    ESTOC: 'estocCollection',
    LINEA_ALBARAN: 'lineaAlbaranCollection',
    LINEA_PRESUPUESTO: 'lineaPresupuestoCollection',
    MOVIMIENTO_ESTOC: 'movimientoEstocCollection',
    TRASPASO_ESTOC_ALMACEN_DESTINO: 'traspasoEstocAlmacenDestinoCollection',
    TRASPASO_ESTOC_ALMACEN_ORIGEN: 'traspasoEstocAlmacenOrigenCollection',
  };


  // Fields

  nombre!: string;

  // Models

  vehiculo?: Vehiculo;

  // Mapped collections and inversed models

  estocCollection: Estoc[];
  lineaAlbaranCollection: LineaAlbaran[];
  lineaPresupuestoCollection: LineaPresupuesto[];
  movimientoEstocCollection: MovimientoEstoc[];
  traspasoEstocAlmacenDestinoCollection: TraspasoEstoc[];
  traspasoEstocAlmacenOrigenCollection: TraspasoEstoc[];

}

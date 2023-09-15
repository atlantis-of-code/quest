// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Categoria } from './categoria';
import { Estoc } from './estoc';
import { Fichero } from '../ficheros/fichero';
import { LineaAlbaran } from '../facturacion/linea-albaran';
import { LineaPresupuesto } from '../facturacion/linea-presupuesto';
import { LineaTraspasoEstoc } from './linea-traspaso-estoc';
import { MovimientoEstoc } from './movimiento-estoc';

export class Articulo extends MavermaModel {

  static field = {
    CODIGO: 'codigo',
    DE_ALTA: 'de_alta',
    NOMBRE: 'nombre',
    PRECIO_BASE: 'precio_base',
  };

  static entity = {
    CATEGORIA: 'categoria',
    FOTO: 'foto',
  };

  static collection = {
    ESTOC: 'estocCollection',
    FICHERO: 'ficheroCollection',
    LINEA_ALBARAN: 'lineaAlbaranCollection',
    LINEA_PRESUPUESTO: 'lineaPresupuestoCollection',
    LINEA_TRASPASO_ESTOC: 'lineaTraspasoEstocCollection',
    MOVIMIENTO_ESTOC: 'movimientoEstocCollection',
  };


  // Fields

  codigo!: number;
  de_alta?: boolean;
  nombre!: string;
  precio_base?: string;

  // Models

  categoria?: Categoria;
  foto?: Fichero;

  // Mapped collections and inversed models

  estocCollection: Estoc[];
  ficheroCollection: Fichero[];
  lineaAlbaranCollection: LineaAlbaran[];
  lineaPresupuestoCollection: LineaPresupuesto[];
  lineaTraspasoEstocCollection: LineaTraspasoEstoc[];
  movimientoEstocCollection: MovimientoEstoc[];

}

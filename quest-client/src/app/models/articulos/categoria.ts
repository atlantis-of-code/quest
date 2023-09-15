// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Articulo } from './articulo';

export class Categoria extends MavermaModel {

  static field = {
    NOMBRE: 'nombre',
  };


  static collection = {
    ARTICULO: 'articuloCollection',
  };


  // Fields

  nombre!: string;

  // Mapped collections and inversed models

  articuloCollection: Articulo[];

}

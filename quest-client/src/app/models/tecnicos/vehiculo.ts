// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Almacen } from '../articulos/almacen';
import { Fichero } from '../ficheros/fichero';
import { Tecnico } from './tecnico';

export class Vehiculo extends MavermaModel {

  static field = {
    HABILITADO: 'habilitado',
    MATRICULA: 'matricula',
    NOMBRE: 'nombre',
  };

  static entity = {
    ALMACEN: 'almacen',
    TECNICO: 'tecnico',
  };

  static collection = {
    FICHERO_FACTURAS: 'ficheroFacturasCollection',
    FICHERO_INSPECCION_TECNICA: 'ficheroInspeccionTecnicaCollection',
    FICHERO_OTROS: 'ficheroOtrosCollection',
  };


  // Fields

  habilitado?: boolean;
  matricula?: string;
  nombre!: string;

  // Models

  almacen?: Almacen;
  tecnico?: Tecnico;

  // Mapped collections and inversed models

  ficheroFacturasCollection: Fichero[];
  ficheroInspeccionTecnicaCollection: Fichero[];
  ficheroOtrosCollection: Fichero[];

}

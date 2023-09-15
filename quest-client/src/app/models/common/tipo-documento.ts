// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { DatosFiscales } from './datos-fiscales';
import { Repartidor } from '../pedidos/repartidor';
import { Tecnico } from '../tecnicos/tecnico';

export class TipoDocumento extends MavermaModel {

  static field = {
    NOMBRE: 'nombre',
  };


  static collection = {
    DATOS_FISCALES: 'datosFiscalesCollection',
    REPARTIDOR: 'repartidorCollection',
    TECNICO: 'tecnicoCollection',
  };


  // Fields

  nombre!: string;

  // Mapped collections and inversed models

  datosFiscalesCollection: DatosFiscales[];
  repartidorCollection: Repartidor[];
  tecnicoCollection: Tecnico[];

}

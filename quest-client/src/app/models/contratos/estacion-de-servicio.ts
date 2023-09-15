// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Contrato } from './contrato';

export class EstacionDeServicio extends MavermaModel {

  static field = {
    CODIGO: 'codigo',
    DIRECCION: 'direccion',
    LOCALIDAD: 'localidad',
    NOMBRE: 'nombre',
    TELEFONO: 'telefono',
  };


  static collection = {
    CONTRATO: 'contratoCollection',
  };


  // Fields

  codigo?: string;
  direccion?: string;
  localidad?: string;
  nombre!: string;
  telefono?: string;

  // Mapped collections and inversed models

  contratoCollection: Contrato[];

}

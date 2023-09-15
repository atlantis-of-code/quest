// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Bombona } from '../articulos/bombona';
import { Contrato } from './contrato';

export class ContratoBombona extends MavermaModel {

  static field = {
    CANTIDAD_CONTRATADA: 'cantidad_contratada',
    CANTIDAD_ENTREGADA: 'cantidad_entregada',
    FIANZA: 'fianza',
  };

  static entity = {
    BOMBONA: 'bombona',
    CONTRATO: 'contrato',
  };


  // Fields

  cantidad_contratada?: number;
  cantidad_entregada?: number;
  fianza?: string;

  // Models

  bombona!: Bombona;
  contrato!: Contrato;

}

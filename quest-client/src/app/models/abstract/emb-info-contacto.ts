// AocEmbeddedModel import
import { AocEmbeddedModel } from '@atlantis-of-code/aoc-client/core/models';

export class EmbInfoContacto extends AocEmbeddedModel {

  static field = {
    EMAIL: 'email',
    TELEFONO1: 'telefono1',
    TELEFONO2: 'telefono2',
    TELEFONO3: 'telefono3',
  };



  // Fields

  email?: string;
  telefono1?: string;
  telefono2?: string;
  telefono3?: string;

}

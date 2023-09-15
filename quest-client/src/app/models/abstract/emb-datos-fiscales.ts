// AocEmbeddedModel import
import { AocEmbeddedModel } from '@atlantis-of-code/aoc-client/core/models';
// Model imports
import { TipoDocumento } from '../common/tipo-documento';

export class EmbDatosFiscales extends AocEmbeddedModel {

  static field = {
    APELLIDO_1: 'apellido_1',
    APELLIDO_2: 'apellido_2',
    NOMBRE_FISCAL: 'nombre_fiscal',
    NUMERO_DOCUMENTO: 'numero_documento',
  };

  static entity = {
    TIPO_DOCUMENTO: 'tipoDocumento',
  };


  // Fields

  apellido_1?: string;
  apellido_2?: string;
  nombre_fiscal?: string;
  numero_documento?: string;

  // Models

  tipoDocumento?: TipoDocumento;

}

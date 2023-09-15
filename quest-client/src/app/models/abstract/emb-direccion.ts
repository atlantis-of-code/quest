// AocEmbeddedModel import
import { AocEmbeddedModel } from '@atlantis-of-code/aoc-client/core/models';
// Model imports
import { DenominacionVia } from '../common/denominacion-via';
import { Pais } from '../common/pais';

export class EmbDireccion extends AocEmbeddedModel {

  static field = {
    BLOQUE: 'bloque',
    CODIGO_POSTAL: 'codigo_postal',
    DATOS_ADICIONALES: 'datos_adicionales',
    EDIFICIO_O_URBANIZACION: 'edificio_o_urbanizacion',
    ESCALERA: 'escalera',
    GEOPOSICION: 'geoposicion',
    LOCALIDAD: 'localidad',
    MUNICIPIO: 'municipio',
    NOMBRE_VIA: 'nombre_via',
    NUMERO: 'numero',
    PISO: 'piso',
    PORTAL: 'portal',
    PROVINCIA: 'provincia',
    PUERTA: 'puerta',
  };

  static entity = {
    DENOMINACION_VIA: 'denominacionVia',
    PAIS: 'pais',
  };


  // Fields

  bloque?: string;
  codigo_postal?: string;
  datos_adicionales?: string;
  edificio_o_urbanizacion?: string;
  escalera?: string;
  geoposicion?: string;
  localidad?: string;
  municipio?: string;
  nombre_via?: string;
  numero?: string;
  piso?: string;
  portal?: string;
  provincia?: string;
  puerta?: string;

  // Models

  denominacionVia!: DenominacionVia;
  pais!: Pais;

}

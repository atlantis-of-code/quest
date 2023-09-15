// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Albaran } from '../facturacion/albaran';
import { Factura } from '../facturacion/factura';
import { Fichero } from '../ficheros/fichero';
import { TipoDocumento } from '../common/tipo-documento';
import { Usuario } from '../usuarios/usuario';
import { Vehiculo } from './vehiculo';

export class Tecnico extends MavermaModel {

  static field = {
    APELLIDO_1: 'apellido_1',
    APELLIDO_2: 'apellido_2',
    EMAIL: 'email',
    NOMBRE_FISCAL: 'nombre_fiscal',
    NUMERO_DOCUMENTO: 'numero_documento',
    SERIE_EN_FACTURAS: 'serie_en_facturas',
    TELEFONO1: 'telefono1',
    TELEFONO2: 'telefono2',
    TELEFONO3: 'telefono3',
  };

  static entity = {
    TIPO_DOCUMENTO: 'tipoDocumento',
    USUARIO: 'usuario',
  };

  static collection = {
    ALBARAN: 'albaranCollection',
    FACTURA: 'facturaCollection',
    FICHERO: 'ficheroCollection',
    VEHICULO: 'vehiculoCollection',
  };


  // Fields

  apellido_1?: string;
  apellido_2?: string;
  email?: string;
  nombre_fiscal?: string;
  numero_documento?: string;
  serie_en_facturas?: string;
  telefono1?: string;
  telefono2?: string;
  telefono3?: string;

  // Models

  tipoDocumento?: TipoDocumento;
  usuario?: Usuario;

  // Mapped collections and inversed models

  albaranCollection: Albaran[];
  facturaCollection: Factura[];
  ficheroCollection: Fichero[];
  vehiculoCollection: Vehiculo[];

}

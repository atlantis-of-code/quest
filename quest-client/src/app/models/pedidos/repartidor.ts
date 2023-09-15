// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Fichero } from '../ficheros/fichero';
import { Pedido } from './pedido';
import { TipoDocumento } from '../common/tipo-documento';
import { Usuario } from '../usuarios/usuario';

export class Repartidor extends MavermaModel {

  static field = {
    APELLIDO_1: 'apellido_1',
    APELLIDO_2: 'apellido_2',
    EMAIL: 'email',
    NOMBRE_FISCAL: 'nombre_fiscal',
    NUMERO_DOCUMENTO: 'numero_documento',
    TELEFONO1: 'telefono1',
    TELEFONO2: 'telefono2',
    TELEFONO3: 'telefono3',
  };

  static entity = {
    TIPO_DOCUMENTO: 'tipoDocumento',
    USUARIO: 'usuario',
  };

  static collection = {
    FICHERO: 'ficheroCollection',
    PEDIDO: 'pedidoCollection',
  };


  // Fields

  apellido_1?: string;
  apellido_2?: string;
  email?: string;
  nombre_fiscal?: string;
  numero_documento?: string;
  telefono1?: string;
  telefono2?: string;
  telefono3?: string;

  // Models

  tipoDocumento?: TipoDocumento;
  usuario?: Usuario;

  // Mapped collections and inversed models

  ficheroCollection: Fichero[];
  pedidoCollection: Pedido[];

}

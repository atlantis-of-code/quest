// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { AlmacenGas } from '../configuracion/almacen-gas';
import { Aparato } from './aparato';
import { Cliente } from '../clientes/cliente';
import { ContratoBombona } from './contrato-bombona';
import { DatosFiscales } from '../common/datos-fiscales';
import { Descuento } from './descuento';
import { Direccion } from '../common/direccion';
import { EmbInfoContacto } from '../abstract/emb-info-contacto';
import { EstacionDeServicio } from './estacion-de-servicio';
import { Fichero } from '../ficheros/fichero';
import { Pedido } from '../pedidos/pedido';
import { Revision } from './revision';
import { Sector } from '../common/sector';
import { Subsector } from '../common/subsector';
import { Visita } from './visita';

// Enums as constant objects

export const TipoSuministroEnum = {
  DOMICILIARIO: 'Domiciliario',
  NO_DOMICILIARIO: 'No domiciliario',
} as const;
export type TipoSuministroEnumType = typeof TipoSuministroEnum[keyof typeof TipoSuministroEnum];

export const VehiculoEnum = {
  AUTOCARAVANA: 'Autocaravana',
  ITINERANTE: 'Itinerante',
} as const;
export type VehiculoEnumType = typeof VehiculoEnum[keyof typeof VehiculoEnum];

export class Contrato extends MavermaModel {

  static field = {
    FECHA_ALTA: 'fecha_alta',
    FECHA_BAJA: 'fecha_baja',
    FECHA_PROXIMA_REVISION: 'fecha_proxima_revision',
    FECHA_VENCIMIENTO_REVISION: 'fecha_vencimiento_revision',
    FIRMADO: 'firmado',
    MATRICULA: 'matricula',
    NUMERO_POLIZA: 'numero_poliza',
    PERSONA_CONTACTO: 'persona_contacto',
    TIPO_SUMINISTRO: 'tipo_suministro',
    VEHICULO: 'vehiculo',
  };

  static entity = {
    ALMACEN_GAS: 'almacenGas',
    CLIENTE: 'cliente',
    DATOS_FISCALES: 'datosFiscales',
    DIRECCION_CORRESPONDENCIA: 'direccionCorrespondencia',
    DIRECCION_FISCAL: 'direccionFiscal',
    DIRECCION_SUMINISTRO: 'direccionSuministro',
    ESTACION_DE_SERVICIO: 'estacionDeServicio',
    PAGADOR_ALTERNATIVO_DATOS_FISCALES: 'pagadorAlternativoDatosFiscales',
    PAGADOR_ALTERNATIVO_DIRECCION: 'pagadorAlternativoDireccion',
    SECTOR: 'sector',
    SUBSECTOR: 'subsector',
  };

  static collection = {
    APARATO: 'aparatoCollection',
    CONTRATO_BOMBONA: 'contratoBombonaCollection',
    DESCUENTO: 'descuentoCollection',
    FICHERO: 'ficheroCollection',
    PEDIDO: 'pedidoCollection',
    REVISION: 'revisionCollection',
    VISITA: 'visitaCollection',
  };

  static embedded = {
    EMB_INFO_CONTACTO: 'embInfoContacto',
  };


  // Fields

  fecha_alta?: Date;
  fecha_baja?: Date;
  fecha_proxima_revision?: Date;
  fecha_vencimiento_revision?: Date;
  firmado?: boolean;
  matricula?: string;
  numero_poliza?: number;
  persona_contacto?: string;
  tipo_suministro?: TipoSuministroEnumType;
  vehiculo?: VehiculoEnumType;

  // Models

  almacenGas!: AlmacenGas;
  cliente?: Cliente;
  datosFiscales?: DatosFiscales;
  direccionCorrespondencia?: Direccion;
  direccionFiscal?: Direccion;
  direccionSuministro?: Direccion;
  estacionDeServicio?: EstacionDeServicio;
  pagadorAlternativoDatosFiscales?: DatosFiscales;
  pagadorAlternativoDireccion?: Direccion;
  sector?: Sector;
  subsector?: Subsector;

  // Mapped collections and inversed models

  aparatoCollection: Aparato[];
  contratoBombonaCollection: ContratoBombona[];
  descuentoCollection: Descuento[];
  ficheroCollection: Fichero[];
  pedidoCollection: Pedido[];
  revisionCollection: Revision[];
  visitaCollection: Visita[];

  // Embedded

  embInfoContacto: EmbInfoContacto = new EmbInfoContacto();

}

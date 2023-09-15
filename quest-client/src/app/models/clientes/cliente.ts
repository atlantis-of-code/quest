// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Albaran } from '../facturacion/albaran';
import { Contacto } from '../contactos/contacto';
import { Contrato } from '../contratos/contrato';
import { EmbDatosFiscales } from '../abstract/emb-datos-fiscales';
import { EmbDireccion } from '../abstract/emb-direccion';
import { EmbInfoContacto } from '../abstract/emb-info-contacto';
import { Factura } from '../facturacion/factura';
import { Fichero } from '../ficheros/fichero';
import { Presupuesto } from '../facturacion/presupuesto';
import { Sector } from '../common/sector';
import { Subsector } from '../common/subsector';
import { Ticket } from '../facturacion/ticket';

// Enums as constant objects

export const IdiomaEnum = {
  ESPAÑOL: 'Español',
  INGLES: 'Inglés',
} as const;
export type IdiomaEnumType = typeof IdiomaEnum[keyof typeof IdiomaEnum];

export const SexoEnum = {
  HOMBRE: 'Hombre',
  MUJER: 'Mujer',
} as const;
export type SexoEnumType = typeof SexoEnum[keyof typeof SexoEnum];

export class Cliente extends MavermaModel {

  static field = {
    CODIGO: 'codigo',
    FECHA_NACIMIENTO: 'fecha_nacimiento',
    IDIOMA: 'idioma',
    NOMBRE_COMERCIAL: 'nombre_comercial',
    SEXO: 'sexo',
  };

  static entity = {
    SECTOR: 'sector',
    SUBSECTOR: 'subsector',
  };

  static collection = {
    ALBARAN: 'albaranCollection',
    CONTACTO: 'contactoCollection',
    CONTRATO: 'contratoCollection',
    FACTURA: 'facturaCollection',
    FICHERO: 'ficheroCollection',
    PRESUPUESTO: 'presupuestoCollection',
    TICKET: 'ticketCollection',
  };

  static embedded = {
    EMB_DATOS_FISCALES: 'embDatosFiscales',
    EMB_DIRECCION: 'embDireccion',
    EMB_INFO_CONTACTO: 'embInfoContacto',
  };


  // Fields

  codigo!: number;
  fecha_nacimiento?: Date;
  idioma?: IdiomaEnumType;
  nombre_comercial?: string;
  sexo?: SexoEnumType;

  // Models

  sector?: Sector;
  subsector?: Subsector;

  // Mapped collections and inversed models

  albaranCollection: Albaran[];
  contactoCollection: Contacto[];
  contratoCollection: Contrato[];
  facturaCollection: Factura[];
  ficheroCollection: Fichero[];
  presupuestoCollection: Presupuesto[];
  ticketCollection: Ticket[];

  // Embedded

  embDatosFiscales: EmbDatosFiscales = new EmbDatosFiscales();
  embDireccion: EmbDireccion = new EmbDireccion();
  embInfoContacto: EmbInfoContacto = new EmbInfoContacto();

}

// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Albaran } from '../facturacion/albaran';
import { Contrato } from '../contratos/contrato';
import { DenominacionVia } from './denominacion-via';
import { Factura } from '../facturacion/factura';
import { Pais } from './pais';
import { Presupuesto } from '../facturacion/presupuesto';
import { Ticket } from '../facturacion/ticket';

export class Direccion extends MavermaModel {

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

  static collection = {
    ALBARAN_DIRECCION_FISCAL: 'albaranDireccionFiscalCollection',
    ALBARAN_DIRECCION_OBRA: 'albaranDireccionObraCollection',
    CONTRATO_DIRECCION_CORRESPONDENCIA: 'contratoDireccionCorrespondenciaCollection',
    CONTRATO_DIRECCION_FISCAL: 'contratoDireccionFiscalCollection',
    CONTRATO_DIRECCION_PAGADOR_ALTERNATIVO: 'contratoDireccionPagadorAlternativoCollection',
    CONTRATO_DIRECCION_SUMINISTRO: 'contratoDireccionSuministroCollection',
    FACTURA_DIRECCION_FISCAL: 'facturaDireccionFiscalCollection',
    FACTURA_DIRECCION_OBRA: 'facturaDireccionObraCollection',
    PRESUPUESTO_DIRECCION_FISCAL: 'presupuestoDireccionFiscalCollection',
    PRESUPUESTO_DIRECCION_OBRA: 'presupuestoDireccionObraCollection',
    TICKET_DIRECCION_FISCAL: 'ticketDireccionFiscalCollection',
    TICKET_DIRECCION_OBRA: 'ticketDireccionObraCollection',
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

  // Mapped collections and inversed models

  albaranDireccionFiscalCollection: Albaran[];
  albaranDireccionObraCollection: Albaran[];
  contratoDireccionCorrespondenciaCollection: Contrato[];
  contratoDireccionFiscalCollection: Contrato[];
  contratoDireccionPagadorAlternativoCollection: Contrato[];
  contratoDireccionSuministroCollection: Contrato[];
  facturaDireccionFiscalCollection: Factura[];
  facturaDireccionObraCollection: Factura[];
  presupuestoDireccionFiscalCollection: Presupuesto[];
  presupuestoDireccionObraCollection: Presupuesto[];
  ticketDireccionFiscalCollection: Ticket[];
  ticketDireccionObraCollection: Ticket[];

}

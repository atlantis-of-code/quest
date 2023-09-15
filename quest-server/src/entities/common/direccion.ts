// Mikro-ORM imports
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Albaran } from '../facturacion/albaran';
import { Contrato } from '../contratos/contrato';
import { DenominacionVia } from './denominacion-via';
import { Factura } from '../facturacion/factura';
import { Pais } from './pais';
import { Presupuesto } from '../facturacion/presupuesto';
import { Ticket } from '../facturacion/ticket';

@Entity({ tableName: 'common.direccion' })
export class Direccion extends QuestEntity {

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

  @Property({ nullable: true })
  bloque?: string;

  @Property({ nullable: true })
  codigo_postal?: string;

  @Property({ nullable: true })
  datos_adicionales?: string;

  @Property({ nullable: true })
  edificio_o_urbanizacion?: string;

  @Property({ nullable: true })
  escalera?: string;

  @Property({ nullable: true })
  geoposicion?: string;

  @Property({ nullable: true })
  localidad?: string;

  @Property({ nullable: true })
  municipio?: string;

  @Property({ nullable: true })
  nombre_via?: string;

  @Property({ nullable: true })
  numero?: string;

  @Property({ nullable: true })
  piso?: string;

  @Property({ nullable: true })
  portal?: string;

  @Property({ nullable: true })
  provincia?: string;

  @Property({ nullable: true })
  puerta?: string;

  // Entities

  @ManyToOne({ entity: () => 'DenominacionVia', fieldName: 'denominacion_via_id', eager: true })
  denominacionVia!: DenominacionVia;

  @ManyToOne({ entity: () => 'Pais', fieldName: 'pais_id', eager: true })
  pais!: Pais;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'Albaran', mappedBy: (e: Albaran) => e.direccionFiscal, orphanRemoval: false })
  albaranDireccionFiscalCollection: Collection<Albaran> = new Collection<Albaran>(this);

  @OneToMany({ entity: () => 'Albaran', mappedBy: (e: Albaran) => e.direccionObra, orphanRemoval: false })
  albaranDireccionObraCollection: Collection<Albaran> = new Collection<Albaran>(this);

  @OneToMany({ entity: () => 'Contrato', mappedBy: (e: Contrato) => e.direccionCorrespondencia, orphanRemoval: false })
  contratoDireccionCorrespondenciaCollection: Collection<Contrato> = new Collection<Contrato>(this);

  @OneToMany({ entity: () => 'Contrato', mappedBy: (e: Contrato) => e.direccionFiscal, orphanRemoval: false })
  contratoDireccionFiscalCollection: Collection<Contrato> = new Collection<Contrato>(this);

  @OneToMany({ entity: () => 'Contrato', mappedBy: (e: Contrato) => e.pagadorAlternativoDireccion, orphanRemoval: false })
  contratoDireccionPagadorAlternativoCollection: Collection<Contrato> = new Collection<Contrato>(this);

  @OneToMany({ entity: () => 'Contrato', mappedBy: (e: Contrato) => e.direccionSuministro, orphanRemoval: false })
  contratoDireccionSuministroCollection: Collection<Contrato> = new Collection<Contrato>(this);

  @OneToMany({ entity: () => 'Factura', mappedBy: (e: Factura) => e.direccionFiscal, orphanRemoval: false })
  facturaDireccionFiscalCollection: Collection<Factura> = new Collection<Factura>(this);

  @OneToMany({ entity: () => 'Factura', mappedBy: (e: Factura) => e.direccionObra, orphanRemoval: false })
  facturaDireccionObraCollection: Collection<Factura> = new Collection<Factura>(this);

  @OneToMany({ entity: () => 'Presupuesto', mappedBy: (e: Presupuesto) => e.direccionFiscal, orphanRemoval: false })
  presupuestoDireccionFiscalCollection: Collection<Presupuesto> = new Collection<Presupuesto>(this);

  @OneToMany({ entity: () => 'Presupuesto', mappedBy: (e: Presupuesto) => e.direccionObra, orphanRemoval: false })
  presupuestoDireccionObraCollection: Collection<Presupuesto> = new Collection<Presupuesto>(this);

  @OneToMany({ entity: () => 'Ticket', mappedBy: (e: Ticket) => e.direccionFiscal, orphanRemoval: false })
  ticketDireccionFiscalCollection: Collection<Ticket> = new Collection<Ticket>(this);

  @OneToMany({ entity: () => 'Ticket', mappedBy: (e: Ticket) => e.direccionObra, orphanRemoval: false })
  ticketDireccionObraCollection: Collection<Ticket> = new Collection<Ticket>(this);

}

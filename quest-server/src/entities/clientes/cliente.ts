// Mikro-ORM imports
import {
  Cascade,
  Collection,
  Embedded,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
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

@Entity({ tableName: 'clientes.cliente' })
export class Cliente extends QuestEntity {

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

  @Property()
  codigo!: number;

  @Property({ nullable: true })
  fecha_nacimiento?: Date;

  @Property({ default: IdiomaEnum.ESPAÑOL, nullable: true })
  idioma?: IdiomaEnumType;

  @Property({ nullable: true })
  nombre_comercial?: string;

  @Property({ default: SexoEnum.HOMBRE, nullable: true })
  sexo?: SexoEnumType;

  // Entities

  @ManyToOne({ entity: () => 'Sector', fieldName: 'sector_id', nullable: true })
  sector?: Sector;

  @ManyToOne({ entity: () => 'Subsector', fieldName: 'subsector_id', nullable: true })
  subsector?: Subsector;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'Albaran', mappedBy: (e: Albaran) => e.cliente, orphanRemoval: false })
  albaranCollection: Collection<Albaran> = new Collection<Albaran>(this);

  @ManyToMany({ entity: () => 'Contacto', pivotTable: 'contactos.contacto_cliente', joinColumn: 'cliente_id', inverseJoinColumn: 'contacto_id', cascade: [Cascade.REMOVE] })
  contactoCollection: Collection<Contacto> = new Collection<Contacto>(this);

  @OneToMany({ entity: () => 'Contrato', mappedBy: (e: Contrato) => e.cliente, orphanRemoval: false })
  contratoCollection: Collection<Contrato> = new Collection<Contrato>(this);

  @OneToMany({ entity: () => 'Factura', mappedBy: (e: Factura) => e.cliente, orphanRemoval: false })
  facturaCollection: Collection<Factura> = new Collection<Factura>(this);

  @ManyToMany({ entity: () => 'Fichero', pivotTable: 'clientes.cliente_fichero', joinColumn: 'cliente_id', inverseJoinColumn: 'fichero_id', cascade: [Cascade.REMOVE] })
  ficheroCollection: Collection<Fichero> = new Collection<Fichero>(this);

  @OneToMany({ entity: () => 'Presupuesto', mappedBy: (e: Presupuesto) => e.cliente, orphanRemoval: false })
  presupuestoCollection: Collection<Presupuesto> = new Collection<Presupuesto>(this);

  @OneToMany({ entity: () => 'Ticket', mappedBy: (e: Ticket) => e.cliente, orphanRemoval: false })
  ticketCollection: Collection<Ticket> = new Collection<Ticket>(this);

  // Embedded

  @Embedded({ entity: () => EmbDatosFiscales, prefix: false })
  embDatosFiscales = new EmbDatosFiscales();

  @Embedded({ entity: () => EmbDireccion, prefix: false })
  embDireccion = new EmbDireccion();

  @Embedded({ entity: () => EmbInfoContacto, prefix: false })
  embInfoContacto = new EmbInfoContacto();

}

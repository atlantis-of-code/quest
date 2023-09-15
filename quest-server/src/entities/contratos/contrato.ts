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

@Entity({ tableName: 'contratos.contrato' })
export class Contrato extends QuestEntity {

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

  @Property({ nullable: true })
  fecha_alta?: Date;

  @Property({ nullable: true })
  fecha_baja?: Date;

  @Property({ nullable: true })
  fecha_proxima_revision?: Date;

  @Property({ nullable: true })
  fecha_vencimiento_revision?: Date;

  @Property({ nullable: true })
  firmado?: boolean;

  @Property({ nullable: true })
  matricula?: string;

  @Property({ nullable: true })
  numero_poliza?: number;

  @Property({ nullable: true })
  persona_contacto?: string;

  @Property({ default: TipoSuministroEnum.DOMICILIARIO, nullable: true })
  tipo_suministro?: TipoSuministroEnumType;

  @Property({ nullable: true })
  vehiculo?: VehiculoEnumType;

  // Entities

  @ManyToOne({ entity: () => 'AlmacenGas', fieldName: 'almacen_gas_id' })
  almacenGas!: AlmacenGas;

  @ManyToOne({ entity: () => 'Cliente', fieldName: 'cliente_id', nullable: true })
  cliente?: Cliente;

  @ManyToOne({ entity: () => 'DatosFiscales', fieldName: 'datos_fiscales_id', nullable: true, cascade: [Cascade.REMOVE] })
  datosFiscales?: DatosFiscales;

  @ManyToOne({ entity: () => 'Direccion', fieldName: 'direccion_correspondencia_id', nullable: true, cascade: [Cascade.REMOVE] })
  direccionCorrespondencia?: Direccion;

  @ManyToOne({ entity: () => 'Direccion', fieldName: 'direccion_fiscal_id', nullable: true, cascade: [Cascade.REMOVE] })
  direccionFiscal?: Direccion;

  @ManyToOne({ entity: () => 'Direccion', fieldName: 'direccion_suministro_id', nullable: true, cascade: [Cascade.REMOVE] })
  direccionSuministro?: Direccion;

  @ManyToOne({ entity: () => 'EstacionDeServicio', fieldName: 'estacion_de_servicio_id', nullable: true })
  estacionDeServicio?: EstacionDeServicio;

  @ManyToOne({ entity: () => 'DatosFiscales', fieldName: 'pagador_alternativo_datos_fiscales_id', nullable: true, cascade: [Cascade.REMOVE] })
  pagadorAlternativoDatosFiscales?: DatosFiscales;

  @ManyToOne({ entity: () => 'Direccion', fieldName: 'pagador_alternativo_direccion_id', nullable: true, cascade: [Cascade.REMOVE] })
  pagadorAlternativoDireccion?: Direccion;

  @ManyToOne({ entity: () => 'Sector', fieldName: 'sector_id', nullable: true })
  sector?: Sector;

  @ManyToOne({ entity: () => 'Subsector', fieldName: 'subsector_id', nullable: true })
  subsector?: Subsector;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'Aparato', mappedBy: (e: Aparato) => e.contrato, orphanRemoval: true })
  aparatoCollection: Collection<Aparato> = new Collection<Aparato>(this);

  @OneToMany({ entity: () => 'ContratoBombona', mappedBy: (e: ContratoBombona) => e.contrato, orphanRemoval: true })
  contratoBombonaCollection: Collection<ContratoBombona> = new Collection<ContratoBombona>(this);

  @OneToMany({ entity: () => 'Descuento', mappedBy: (e: Descuento) => e.contrato, orphanRemoval: true })
  descuentoCollection: Collection<Descuento> = new Collection<Descuento>(this);

  @ManyToMany({ entity: () => 'Fichero', pivotTable: 'contratos.contrato_fichero', joinColumn: 'contrato_id', inverseJoinColumn: 'fichero_id', cascade: [Cascade.REMOVE] })
  ficheroCollection: Collection<Fichero> = new Collection<Fichero>(this);

  @OneToMany({ entity: () => 'Pedido', mappedBy: (e: Pedido) => e.contrato, orphanRemoval: true })
  pedidoCollection: Collection<Pedido> = new Collection<Pedido>(this);

  @OneToMany({ entity: () => 'Revision', mappedBy: (e: Revision) => e.contrato, orphanRemoval: true })
  revisionCollection: Collection<Revision> = new Collection<Revision>(this);

  @OneToMany({ entity: () => 'Visita', mappedBy: (e: Visita) => e.contrato, orphanRemoval: true })
  visitaCollection: Collection<Visita> = new Collection<Visita>(this);

  // Embedded

  @Embedded({ entity: () => EmbInfoContacto, prefix: false })
  embInfoContacto = new EmbInfoContacto();

}

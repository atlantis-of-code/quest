// Mikro-ORM imports
import {
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Albaran } from '../facturacion/albaran';
import { Factura } from '../facturacion/factura';
import { Fichero } from '../ficheros/fichero';
import { TipoDocumento } from '../common/tipo-documento';
import { Usuario } from '../usuarios/usuario';
import { Vehiculo } from './vehiculo';

@Entity({ tableName: 'tecnicos.tecnico' })
export class Tecnico extends QuestEntity {

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

  @Property({ nullable: true })
  apellido_1?: string;

  @Property({ nullable: true })
  apellido_2?: string;

  @Property({ nullable: true })
  email?: string;

  @Property({ nullable: true })
  nombre_fiscal?: string;

  @Property({ nullable: true })
  numero_documento?: string;

  @Property({ nullable: true })
  serie_en_facturas?: string;

  @Property({ nullable: true })
  telefono1?: string;

  @Property({ nullable: true })
  telefono2?: string;

  @Property({ nullable: true })
  telefono3?: string;

  // Entities

  @ManyToOne({ entity: () => 'TipoDocumento', fieldName: 'tipo_documento_id', eager: true, nullable: true })
  tipoDocumento?: TipoDocumento;

  @OneToOne({ entity: () => 'Usuario', inversedBy: (e: Usuario) => e.tecnico, nullable: true, orphanRemoval: false })
  usuario?: Usuario;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'Albaran', mappedBy: (e: Albaran) => e.tecnico, orphanRemoval: false })
  albaranCollection: Collection<Albaran> = new Collection<Albaran>(this);

  @OneToMany({ entity: () => 'Factura', mappedBy: (e: Factura) => e.tecnico, orphanRemoval: false })
  facturaCollection: Collection<Factura> = new Collection<Factura>(this);

  @ManyToMany({ entity: () => 'Fichero', pivotTable: 'tecnicos.tecnico_fichero', joinColumn: 'tecnico_id', inverseJoinColumn: 'fichero_id', cascade: [Cascade.REMOVE] })
  ficheroCollection: Collection<Fichero> = new Collection<Fichero>(this);

  @OneToMany({ entity: () => 'Vehiculo', mappedBy: (e: Vehiculo) => e.tecnico, orphanRemoval: false })
  vehiculoCollection: Collection<Vehiculo> = new Collection<Vehiculo>(this);

}

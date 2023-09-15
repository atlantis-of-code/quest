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
import { Fichero } from '../ficheros/fichero';
import { Pedido } from './pedido';
import { TipoDocumento } from '../common/tipo-documento';
import { Usuario } from '../usuarios/usuario';

@Entity({ tableName: 'pedidos.repartidor' })
export class Repartidor extends QuestEntity {

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
  telefono1?: string;

  @Property({ nullable: true })
  telefono2?: string;

  @Property({ nullable: true })
  telefono3?: string;

  // Entities

  @ManyToOne({ entity: () => 'TipoDocumento', fieldName: 'tipo_documento_id', nullable: true })
  tipoDocumento?: TipoDocumento;

  @OneToOne({ entity: () => 'Usuario', inversedBy: (e: Usuario) => e.repartidor, nullable: true, orphanRemoval: false })
  usuario?: Usuario;

  // Mapped collections and inversed entities

  @ManyToMany({ entity: () => 'Fichero', pivotTable: 'pedidos.repartidor_fichero', joinColumn: 'repartidor_id', inverseJoinColumn: 'fichero_id', cascade: [Cascade.REMOVE] })
  ficheroCollection: Collection<Fichero> = new Collection<Fichero>(this);

  @OneToMany({ entity: () => 'Pedido', mappedBy: (e: Pedido) => e.repartidor, orphanRemoval: false })
  pedidoCollection: Collection<Pedido> = new Collection<Pedido>(this);

}

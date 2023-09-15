// Mikro-ORM imports
import {
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Almacen } from '../articulos/almacen';
import { Fichero } from '../ficheros/fichero';
import { Tecnico } from './tecnico';

@Entity({ tableName: 'tecnicos.vehiculo' })
export class Vehiculo extends QuestEntity {

  static field = {
    HABILITADO: 'habilitado',
    MATRICULA: 'matricula',
    NOMBRE: 'nombre',
  };

  static entity = {
    ALMACEN: 'almacen',
    TECNICO: 'tecnico',
  };

  static collection = {
    FICHERO_FACTURAS: 'ficheroFacturasCollection',
    FICHERO_INSPECCION_TECNICA: 'ficheroInspeccionTecnicaCollection',
    FICHERO_OTROS: 'ficheroOtrosCollection',
  };

  // Fields

  @Property({ nullable: true })
  habilitado?: boolean;

  @Property({ nullable: true })
  matricula?: string;

  @Property()
  nombre!: string;

  // Entities

  @OneToOne({ entity: () => 'Almacen', fieldName: 'almacen_id', nullable: true })
  almacen?: Almacen;

  @ManyToOne({ entity: () => 'Tecnico', fieldName: 'tecnico_id', nullable: true })
  tecnico?: Tecnico;

  // Mapped collections and inversed entities

  @ManyToMany({ entity: () => 'Fichero', pivotTable: 'tecnicos.vehiculo_fichero_facturas', joinColumn: 'vehiculo_id', inverseJoinColumn: 'fichero_id', cascade: [Cascade.REMOVE] })
  ficheroFacturasCollection: Collection<Fichero> = new Collection<Fichero>(this);

  @ManyToMany({ entity: () => 'Fichero', pivotTable: 'tecnicos.vehiculo_fichero_inspeccion_tecnica', joinColumn: 'vehiculo_id', inverseJoinColumn: 'fichero_id', cascade: [Cascade.REMOVE] })
  ficheroInspeccionTecnicaCollection: Collection<Fichero> = new Collection<Fichero>(this);

  @ManyToMany({ entity: () => 'Fichero', pivotTable: 'tecnicos.vehiculo_fichero_otros', joinColumn: 'vehiculo_id', inverseJoinColumn: 'fichero_id', cascade: [Cascade.REMOVE] })
  ficheroOtrosCollection: Collection<Fichero> = new Collection<Fichero>(this);

}

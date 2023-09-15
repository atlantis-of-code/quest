// Mikro-ORM imports
import {
  Collection,
  Entity,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Contrato } from './contrato';

@Entity({ tableName: 'contratos.estacion_de_servicio' })
export class EstacionDeServicio extends QuestEntity {

  static field = {
    CODIGO: 'codigo',
    DIRECCION: 'direccion',
    LOCALIDAD: 'localidad',
    NOMBRE: 'nombre',
    TELEFONO: 'telefono',
  };


  static collection = {
    CONTRATO: 'contratoCollection',
  };

  // Fields

  @Property({ nullable: true })
  codigo?: string;

  @Property({ nullable: true })
  direccion?: string;

  @Property({ nullable: true })
  localidad?: string;

  @Property()
  nombre!: string;

  @Property({ nullable: true })
  telefono?: string;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'Contrato', mappedBy: (e: Contrato) => e.estacionDeServicio, orphanRemoval: false })
  contratoCollection: Collection<Contrato> = new Collection<Contrato>(this);

}

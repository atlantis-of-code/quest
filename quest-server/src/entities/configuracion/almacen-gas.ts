// Mikro-ORM imports
import {
  Collection,
  Entity,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Contrato } from '../contratos/contrato';

@Entity({ tableName: 'configuracion.almacen_gas' })
export class AlmacenGas extends QuestEntity {

  static field = {
    CODIGO: 'codigo',
    NOMBRE: 'nombre',
  };


  static collection = {
    CONTRATO: 'contratoCollection',
  };

  // Fields

  @Property()
  codigo!: string;

  @Property()
  nombre!: string;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'Contrato', mappedBy: (e: Contrato) => e.almacenGas, orphanRemoval: false })
  contratoCollection: Collection<Contrato> = new Collection<Contrato>(this);

}

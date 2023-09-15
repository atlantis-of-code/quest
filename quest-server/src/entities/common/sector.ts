// Mikro-ORM imports
import {
  Collection,
  Entity,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Cliente } from '../clientes/cliente';
import { Contrato } from '../contratos/contrato';
import { Subsector } from './subsector';

@Entity({ tableName: 'common.sector' })
export class Sector extends QuestEntity {

  static field = {
    NOMBRE: 'nombre',
  };


  static collection = {
    CLIENTE: 'clienteCollection',
    CONTRATO: 'contratoCollection',
    SUBSECTOR: 'subsectorCollection',
  };

  // Fields

  @Property()
  nombre!: string;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'Cliente', mappedBy: (e: Cliente) => e.sector, orphanRemoval: false })
  clienteCollection: Collection<Cliente> = new Collection<Cliente>(this);

  @OneToMany({ entity: () => 'Contrato', mappedBy: (e: Contrato) => e.sector, orphanRemoval: false })
  contratoCollection: Collection<Contrato> = new Collection<Contrato>(this);

  @OneToMany({ entity: () => 'Subsector', mappedBy: (e: Subsector) => e.sector, orphanRemoval: true })
  subsectorCollection: Collection<Subsector> = new Collection<Subsector>(this);

}

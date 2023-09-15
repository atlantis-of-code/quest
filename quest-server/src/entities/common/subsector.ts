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
import { Cliente } from '../clientes/cliente';
import { Contrato } from '../contratos/contrato';
import { Sector } from './sector';

@Entity({ tableName: 'common.subsector' })
export class Subsector extends QuestEntity {

  static field = {
    NOMBRE: 'nombre',
  };

  static entity = {
    SECTOR: 'sector',
  };

  static collection = {
    CLIENTE: 'clienteCollection',
    CONTRATO: 'contratoCollection',
  };

  // Fields

  @Property()
  nombre!: string;

  // Entities

  @ManyToOne({ entity: () => 'Sector', fieldName: 'sector_id', nullable: true })
  sector?: Sector;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'Cliente', mappedBy: (e: Cliente) => e.subsector, orphanRemoval: false })
  clienteCollection: Collection<Cliente> = new Collection<Cliente>(this);

  @OneToMany({ entity: () => 'Contrato', mappedBy: (e: Contrato) => e.subsector, orphanRemoval: false })
  contratoCollection: Collection<Contrato> = new Collection<Contrato>(this);

}

// Mikro-ORM imports
import {
  Entity,
  ManyToOne,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Contrato } from './contrato';

@Entity({ tableName: 'contratos.aparato' })
export class Aparato extends QuestEntity {

  static field = {
    ANYO: 'anyo',
    MARCA: 'marca',
    MODELO: 'modelo',
    POTENCIA: 'potencia',
    TIPO: 'tipo',
  };

  static entity = {
    CONTRATO: 'contrato',
  };

  // Fields

  @Property({ nullable: true })
  anyo?: number;

  @Property({ nullable: true })
  marca?: string;

  @Property({ nullable: true })
  modelo?: string;

  @Property({ nullable: true })
  potencia?: string;

  @Property({ nullable: true })
  tipo?: string;

  // Entities

  @ManyToOne({ entity: () => 'Contrato', fieldName: 'contrato_id', nullable: true })
  contrato?: Contrato;

}

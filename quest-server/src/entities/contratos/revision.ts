// Mikro-ORM imports
import {
  Entity,
  ManyToOne,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Contrato } from './contrato';

@Entity({ tableName: 'contratos.revision' })
export class Revision extends QuestEntity {

  static field = {
    FECHA: 'fecha',
    NUMERO: 'numero',
    RESULTADO: 'resultado',
    TIPO: 'tipo',
  };

  static entity = {
    CONTRATO: 'contrato',
  };

  // Fields

  @Property({ nullable: true })
  fecha?: Date;

  @Property({ nullable: true })
  numero?: number;

  @Property({ nullable: true })
  resultado?: string;

  @Property({ nullable: true })
  tipo?: string;

  // Entities

  @ManyToOne({ entity: () => 'Contrato', fieldName: 'contrato_id', nullable: true })
  contrato?: Contrato;

}

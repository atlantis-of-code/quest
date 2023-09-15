// Mikro-ORM imports
import {
  Entity,
  ManyToOne,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Contrato } from './contrato';

@Entity({ tableName: 'contratos.visita' })
export class Visita extends QuestEntity {

  static field = {
    DESCRIPCION: 'descripcion',
    FECHA: 'fecha',
  };

  static entity = {
    CONTRATO: 'contrato',
  };

  // Fields

  @Property()
  descripcion!: string;

  @Property({ nullable: true })
  fecha?: Date;

  // Entities

  @ManyToOne({ entity: () => 'Contrato', fieldName: 'contrato_id', nullable: true })
  contrato?: Contrato;

}

// Mikro-ORM imports
import {
  Entity,
  ManyToOne,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Bombona } from '../articulos/bombona';
import { Contrato } from './contrato';

@Entity({ tableName: 'contratos.contrato_bombona' })
export class ContratoBombona extends QuestEntity {

  static field = {
    CANTIDAD_CONTRATADA: 'cantidad_contratada',
    CANTIDAD_ENTREGADA: 'cantidad_entregada',
    FIANZA: 'fianza',
  };

  static entity = {
    BOMBONA: 'bombona',
    CONTRATO: 'contrato',
  };

  // Fields

  @Property()
  cantidad_contratada?: number;

  @Property()
  cantidad_entregada?: number;

  @Property()
  fianza?: string;

  // Entities

  @ManyToOne({ entity: () => 'Bombona', fieldName: 'bombona_id' })
  bombona!: Bombona;

  @ManyToOne({ entity: () => 'Contrato', fieldName: 'contrato_id' })
  contrato!: Contrato;

}

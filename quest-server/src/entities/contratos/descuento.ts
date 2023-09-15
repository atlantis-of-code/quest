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

@Entity({ tableName: 'contratos.descuento' })
export class Descuento extends QuestEntity {

  static field = {
    DESCUENTO_EUROS: 'descuento_euros',
    DESCUENTO_MAXIMO: 'descuento_maximo',
    DESCUENTO_PORCENTAJE: 'descuento_porcentaje',
    FECHA_FIN: 'fecha_fin',
    FECHA_INICIO: 'fecha_inicio',
    PORCENTAJE_AGENCIA: 'porcentaje_agencia',
    PORCENTAJE_REPSOL: 'porcentaje_repsol',
  };

  static entity = {
    BOMBONA: 'bombona',
    CONTRATO: 'contrato',
  };

  // Fields

  @Property({ nullable: true })
  descuento_euros?: string;

  @Property({ nullable: true })
  descuento_maximo?: boolean;

  @Property({ nullable: true })
  descuento_porcentaje?: string;

  @Property({ nullable: true })
  fecha_fin?: Date;

  @Property({ nullable: true })
  fecha_inicio?: Date;

  @Property({ nullable: true })
  porcentaje_agencia?: string;

  @Property({ nullable: true })
  porcentaje_repsol?: string;

  // Entities

  @ManyToOne({ entity: () => 'Bombona', fieldName: 'bombona_id', nullable: true })
  bombona?: Bombona;

  @ManyToOne({ entity: () => 'Contrato', fieldName: 'contrato_id', nullable: true })
  contrato?: Contrato;

}

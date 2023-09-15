// Mikro-ORM imports
import {
  Entity,
  ManyToOne,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Bombona } from '../articulos/bombona';
import { Pedido } from './pedido';

@Entity({ tableName: 'pedidos.linea_pedido' })
export class LineaPedido extends QuestEntity {

  static field = {
    CANTIDAD: 'cantidad',
    DESCUENTO: 'descuento',
    IVA: 'iva',
    ORDEN: 'orden',
    PRECIO_UNITARIO: 'precio_unitario',
    PVP: 'pvp',
    SUPLEMENTO: 'suplemento',
    TOTAL_LINEA: 'total_linea',
  };

  static entity = {
    BOMBONA: 'bombona',
    PEDIDO: 'pedido',
  };

  // Fields

  @Property()
  cantidad!: number;

  @Property()
  descuento!: string;

  @Property()
  iva!: string;

  @Property()
  orden!: number;

  @Property()
  precio_unitario!: string;

  @Property()
  pvp!: string;

  @Property()
  suplemento!: string;

  @Property()
  total_linea!: string;

  // Entities

  @ManyToOne({ entity: () => 'Bombona', fieldName: 'bombona_id', nullable: true })
  bombona?: Bombona;

  @ManyToOne({ entity: () => 'Pedido', fieldName: 'pedido_id', nullable: true })
  pedido?: Pedido;

}

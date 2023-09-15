// Mikro-ORM imports
import {
  Entity,
  ManyToOne } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Fichero } from '../ficheros/fichero';
import { Pedido } from './pedido';

@Entity({ tableName: 'pedidos.pedido_fichero' })
export class PedidoFichero extends QuestEntity {


  static entity = {
    FICHERO: 'fichero',
    PEDIDO: 'pedido',
  };

  // Entities

  @ManyToOne({ entity: () => 'Fichero', fieldName: 'fichero_id', nullable: true })
  fichero?: Fichero;

  @ManyToOne({ entity: () => 'Pedido', fieldName: 'pedido_id', nullable: true })
  pedido?: Pedido;

}

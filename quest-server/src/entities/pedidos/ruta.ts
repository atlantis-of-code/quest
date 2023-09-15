// Mikro-ORM imports
import {
  Collection,
  Entity,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Pedido } from './pedido';

@Entity({ tableName: 'pedidos.ruta' })
export class Ruta extends QuestEntity {

  static field = {
    NOMBRE: 'nombre',
  };


  static collection = {
    PEDIDO: 'pedidoCollection',
  };

  // Fields

  @Property()
  nombre!: string;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'Pedido', mappedBy: (e: Pedido) => e.ruta, orphanRemoval: false })
  pedidoCollection: Collection<Pedido> = new Collection<Pedido>(this);

}

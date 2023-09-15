// Mikro-ORM imports
import {
  Collection,
  Entity,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Pedido } from '../pedidos/pedido';

@Entity({ tableName: 'common.modo_de_pago' })
export class ModoDePago extends QuestEntity {

  static field = {
    CODIGO_NACE: 'codigo_nace',
    NOMBRE: 'nombre',
  };


  static collection = {
    PEDIDO: 'pedidoCollection',
  };

  // Fields

  @Property({ nullable: true })
  codigo_nace?: number;

  @Property()
  nombre!: string;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'Pedido', mappedBy: (e: Pedido) => e.modoDePago, orphanRemoval: false })
  pedidoCollection: Collection<Pedido> = new Collection<Pedido>(this);

}

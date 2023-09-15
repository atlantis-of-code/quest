// Mikro-ORM imports
import {
  Collection,
  Entity,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { ContratoBombona } from '../contratos/contrato-bombona';
import { Descuento } from '../contratos/descuento';
import { LineaPedido } from '../pedidos/linea-pedido';

@Entity({ tableName: 'articulos.bombona' })
export class Bombona extends QuestEntity {

  static field = {
    CODIGO_MAVERMA: 'codigo_quest',
    CODIGO_NACE: 'codigo_nace',
    FIANZA: 'fianza',
    PESO: 'peso',
  };


  static collection = {
    CONTRATO_BOMBONA: 'contratoBombonaCollection',
    DESCUENTO: 'descuentoCollection',
    LINEA_PEDIDO: 'lineaPedidoCollection',
  };

  // Fields

  @Property()
  codigo_quest!: string;

  @Property({ nullable: true })
  codigo_nace?: string;

  @Property()
  fianza?: string;

  @Property()
  peso!: string;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'ContratoBombona', mappedBy: (e: ContratoBombona) => e.bombona, orphanRemoval: false })
  contratoBombonaCollection: Collection<ContratoBombona> = new Collection<ContratoBombona>(this);

  @OneToMany({ entity: () => 'Descuento', mappedBy: (e: Descuento) => e.bombona, orphanRemoval: false })
  descuentoCollection: Collection<Descuento> = new Collection<Descuento>(this);

  @OneToMany({ entity: () => 'LineaPedido', mappedBy: (e: LineaPedido) => e.bombona, orphanRemoval: false })
  lineaPedidoCollection: Collection<LineaPedido> = new Collection<LineaPedido>(this);

}

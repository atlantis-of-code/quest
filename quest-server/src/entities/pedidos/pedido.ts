// Mikro-ORM imports
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Contrato } from '../contratos/contrato';
import { LineaPedido } from './linea-pedido';
import { ModoDePago } from '../common/modo-de-pago';
import { PedidoFichero } from './pedido-fichero';
import { Repartidor } from './repartidor';
import { Ruta } from './ruta';

@Entity({ tableName: 'pedidos.pedido' })
export class Pedido extends QuestEntity {

  static field = {
    ALTA_EN_NACE: 'alta_en_nace',
    ENTREGADO: 'entregado',
    ENVIO_INMEDIATO_MOVILIDAD: 'envio_inmediato_movilidad',
    FECHA_CREACION: 'fecha_creacion',
    FECHA_ENTREGA: 'fecha_entrega',
    OBSERVACIONES_CLIENTE: 'observaciones_cliente',
    OBSERVACIONES_PEDIDO: 'observaciones_pedido',
    PETICION_FACTURA: 'peticion_factura',
    RUTA_DE_GUARDIA: 'ruta_de_guardia',
    SUMINISTRO_EXPRESS: 'suministro_express',
    TOTAL: 'total',
    TOTAL_IVA: 'total_iva',
    URGENTE: 'urgente',
  };

  static entity = {
    CONTRATO: 'contrato',
    MODO_DE_PAGO: 'modoDePago',
    REPARTIDOR: 'repartidor',
    RUTA: 'ruta',
  };

  static collection = {
    LINEA_PEDIDO: 'lineaPedidoCollection',
    PEDIDO_FICHERO: 'pedidoFicheroCollection',
  };

  // Fields

  @Property()
  alta_en_nace?: boolean;

  @Property()
  entregado?: boolean;

  @Property()
  envio_inmediato_movilidad?: boolean;

  @Property()
  fecha_creacion!: Date;

  @Property({ nullable: true })
  fecha_entrega?: Date;

  @Property({ nullable: true })
  observaciones_cliente?: string;

  @Property({ nullable: true })
  observaciones_pedido?: string;

  @Property()
  peticion_factura?: boolean;

  @Property()
  ruta_de_guardia?: boolean;

  @Property()
  suministro_express?: boolean;

  @Property()
  total!: string;

  @Property()
  total_iva!: string;

  @Property()
  urgente?: boolean;

  // Entities

  @ManyToOne({ entity: () => 'Contrato', fieldName: 'contrato_id', nullable: true })
  contrato?: Contrato;

  @ManyToOne({ entity: () => 'ModoDePago', fieldName: 'modo_de_pago_id', nullable: true })
  modoDePago?: ModoDePago;

  @ManyToOne({ entity: () => 'Repartidor', fieldName: 'repartidor_id', nullable: true })
  repartidor?: Repartidor;

  @ManyToOne({ entity: () => 'Ruta', fieldName: 'ruta_id', nullable: true })
  ruta?: Ruta;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'LineaPedido', mappedBy: (e: LineaPedido) => e.pedido, orphanRemoval: true })
  lineaPedidoCollection: Collection<LineaPedido> = new Collection<LineaPedido>(this);

  @OneToMany({ entity: () => 'PedidoFichero', mappedBy: (e: PedidoFichero) => e.pedido, orphanRemoval: true })
  pedidoFicheroCollection: Collection<PedidoFichero> = new Collection<PedidoFichero>(this);

}

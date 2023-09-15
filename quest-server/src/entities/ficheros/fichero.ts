// Mikro-ORM imports
import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Albaran } from '../facturacion/albaran';
import { Articulo } from '../articulos/articulo';
import { Cliente } from '../clientes/cliente';
import { Contrato } from '../contratos/contrato';
import { Factura } from '../facturacion/factura';
import { PedidoFichero } from '../pedidos/pedido-fichero';
import { Presupuesto } from '../facturacion/presupuesto';
import { RecuentoEstoc } from '../articulos/recuento-estoc';
import { Repartidor } from '../pedidos/repartidor';
import { Tecnico } from '../tecnicos/tecnico';
import { Ticket } from '../facturacion/ticket';
import { Vehiculo } from '../tecnicos/vehiculo';

@Entity({ tableName: 'ficheros.fichero' })
export class Fichero extends QuestEntity {

  static field = {
    DIRECTORIO: 'directorio',
    MIME: 'mime',
    NOMBRE: 'nombre',
    REFERENCIA_CLASSE: 'referencia_classe',
    REFERENCIA_ID: 'referencia_id',
    SUBDIRECTORIO: 'subdirectorio',
  };


  static collection = {
    ALBARAN: 'albaranCollection',
    ARTICULO: 'articuloCollection',
    ARTICULO_FICHERO_FOTO: 'articuloFicheroFotoCollection',
    CLIENTE: 'clienteCollection',
    CONTRATO: 'contratoCollection',
    FACTURA: 'facturaCollection',
    PEDIDO_FICHERO: 'pedidoFicheroCollection',
    PRESUPUESTO: 'presupuestoCollection',
    RECUENTO_ESTOC: 'recuentoEstocCollection',
    REPARTIDOR: 'repartidorCollection',
    TECNICO: 'tecnicoCollection',
    TICKET: 'ticketCollection',
    VEHICULO_FACTURAS: 'vehiculoFacturasCollection',
    VEHICULO_INSPECCION_TECNICA: 'vehiculoInspeccionTecnicaCollection',
    VEHICULO_OTROS: 'vehiculoOtrosCollection',
  };

  static virtual = {
    RAW: 'raw',
  };

  // Fields

  @Property()
  directorio!: string;

  @Property()
  mime!: string;

  @Property()
  nombre!: string;

  @Property()
  referencia_classe!: string;

  @Property({ nullable: true })
  referencia_id?: string;

  @Property({ nullable: true })
  subdirectorio?: string;

  // Mapped collections and inversed entities

  @ManyToMany({ entity: () => Albaran, mappedBy: (e: Albaran) => e.ficheroCollection })
  albaranCollection: Collection<Albaran> = new Collection<Albaran>(this);

  @ManyToMany({ entity: () => Articulo, mappedBy: (e: Articulo) => e.ficheroCollection })
  articuloCollection: Collection<Articulo> = new Collection<Articulo>(this);

  @OneToMany({ entity: () => 'Articulo', mappedBy: (e: Articulo) => e.foto, orphanRemoval: false })
  articuloFicheroFotoCollection: Collection<Articulo> = new Collection<Articulo>(this);

  @ManyToMany({ entity: () => Cliente, mappedBy: (e: Cliente) => e.ficheroCollection })
  clienteCollection: Collection<Cliente> = new Collection<Cliente>(this);

  @ManyToMany({ entity: () => Contrato, mappedBy: (e: Contrato) => e.ficheroCollection })
  contratoCollection: Collection<Contrato> = new Collection<Contrato>(this);

  @ManyToMany({ entity: () => Factura, mappedBy: (e: Factura) => e.ficheroCollection })
  facturaCollection: Collection<Factura> = new Collection<Factura>(this);

  @OneToMany({ entity: () => 'PedidoFichero', mappedBy: (e: PedidoFichero) => e.fichero, orphanRemoval: true })
  pedidoFicheroCollection: Collection<PedidoFichero> = new Collection<PedidoFichero>(this);

  @ManyToMany({ entity: () => Presupuesto, mappedBy: (e: Presupuesto) => e.ficheroCollection })
  presupuestoCollection: Collection<Presupuesto> = new Collection<Presupuesto>(this);

  @OneToMany({ entity: () => 'RecuentoEstoc', mappedBy: (e: RecuentoEstoc) => e.fichero, orphanRemoval: false })
  recuentoEstocCollection: Collection<RecuentoEstoc> = new Collection<RecuentoEstoc>(this);

  @ManyToMany({ entity: () => Repartidor, mappedBy: (e: Repartidor) => e.ficheroCollection })
  repartidorCollection: Collection<Repartidor> = new Collection<Repartidor>(this);

  @ManyToMany({ entity: () => Tecnico, mappedBy: (e: Tecnico) => e.ficheroCollection })
  tecnicoCollection: Collection<Tecnico> = new Collection<Tecnico>(this);

  @ManyToMany({ entity: () => Ticket, mappedBy: (e: Ticket) => e.ficheroCollection })
  ticketCollection: Collection<Ticket> = new Collection<Ticket>(this);

  @ManyToMany({ entity: () => Vehiculo, mappedBy: (e: Vehiculo) => e.ficheroFacturasCollection })
  vehiculoFacturasCollection: Collection<Vehiculo> = new Collection<Vehiculo>(this);

  @ManyToMany({ entity: () => Vehiculo, mappedBy: (e: Vehiculo) => e.ficheroInspeccionTecnicaCollection })
  vehiculoInspeccionTecnicaCollection: Collection<Vehiculo> = new Collection<Vehiculo>(this);

  @ManyToMany({ entity: () => Vehiculo, mappedBy: (e: Vehiculo) => e.ficheroOtrosCollection })
  vehiculoOtrosCollection: Collection<Vehiculo> = new Collection<Vehiculo>(this);

  // Virtual

  @Property({ persist: false })
  raw?: string;

}

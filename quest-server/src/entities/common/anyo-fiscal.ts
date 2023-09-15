// Mikro-ORM imports
import {
  Collection,
  Entity,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Albaran } from '../facturacion/albaran';
import { Factura } from '../facturacion/factura';
import { Presupuesto } from '../facturacion/presupuesto';
import { Ticket } from '../facturacion/ticket';

@Entity({ tableName: 'common.anyo_fiscal' })
export class AnyoFiscal extends QuestEntity {

  static field = {
    ACTUAL: 'actual',
    ANYO: 'anyo',
  };


  static collection = {
    ALBARAN: 'albaranCollection',
    FACTURA: 'facturaCollection',
    PRESUPUESTO: 'presupuestoCollection',
    TICKET: 'ticketCollection',
  };

  // Fields

  @Property({ nullable: true })
  actual?: boolean;

  @Property()
  anyo!: number;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'Albaran', mappedBy: (e: Albaran) => e.anyoFiscal, orphanRemoval: false })
  albaranCollection: Collection<Albaran> = new Collection<Albaran>(this);

  @OneToMany({ entity: () => 'Factura', mappedBy: (e: Factura) => e.anyoFiscal, orphanRemoval: false })
  facturaCollection: Collection<Factura> = new Collection<Factura>(this);

  @OneToMany({ entity: () => 'Presupuesto', mappedBy: (e: Presupuesto) => e.anyoFiscal, orphanRemoval: false })
  presupuestoCollection: Collection<Presupuesto> = new Collection<Presupuesto>(this);

  @OneToMany({ entity: () => 'Ticket', mappedBy: (e: Ticket) => e.anyoFiscal, orphanRemoval: false })
  ticketCollection: Collection<Ticket> = new Collection<Ticket>(this);

}

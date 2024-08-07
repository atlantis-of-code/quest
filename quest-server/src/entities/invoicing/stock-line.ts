// Mikro-ORM imports
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { DeliveryNote } from './delivery-note';
import { Item } from '../items/item';
import { StockLog } from '../items/stock-log';
import { Store } from '../items/store';
import { Tax } from '../common/tax';
import { Ticket } from './ticket';

@Entity({ tableName: 'invoicing.stock_line' })
export class StockLine extends QuestEntity {
  //region Field names
  static readonly field = {
    BASE_PRICE: 'base_price',
    DISCOUNT: 'discount',
    ITEM_CODE: 'item_code',
    ITEM_NAME: 'item_name',
    ORDER: 'order',
    QUANTITY: 'quantity',
    TOTAL_BASE: 'total_base',
  };
  //endregion

  //region Entity names
  static entity = {
    ITEM: 'item',
    STORE: 'store',
    TAX: 'tax',
  };
  //endregion

  //region Collection names
  static collection = {
    DELIVERY_NOTE_LINE: 'deliveryNoteLineCollection',
    STOCK_LOG: 'stockLogCollection',
    TICKET_LINE: 'ticketLineCollection',
  };
  //endregion

  //region Fields
  @Property()
  base_price!: string;
  @Property({ defaultRaw: 'default' })
  discount!: string;
  @Property({ nullable: true })
  item_code?: string;
  @Property({ nullable: true })
  item_name?: string;
  @Property({ nullable: true })
  order?: number;
  @Property()
  quantity!: string;
  @Property()
  total_base!: string;
  //endregion

  //region Entities
  @ManyToOne({ entity: () => 'Item', fieldName: 'item_id', nullable: true })
  item?: Item;
  @ManyToOne({ entity: () => 'Store', fieldName: 'store_id', nullable: true })
  store?: Store;
  @ManyToOne({ entity: () => 'Tax', fieldName: 'tax_id' })
  tax!: Tax;
  //endregion

  //region Mapped collections and inversed entities
  @ManyToMany({ entity: () => DeliveryNote, mappedBy: (e: DeliveryNote) => e.stockLineLineCollection })
  deliveryNoteLineCollection: Collection<DeliveryNote> = new Collection<DeliveryNote>(this);
  @OneToMany({ entity: () => 'StockLog', mappedBy: (e: StockLog) => e.stockLine, orphanRemoval: false })
  stockLogCollection: Collection<StockLog> = new Collection<StockLog>(this);
  @ManyToMany({ entity: () => Ticket, mappedBy: (e: Ticket) => e.stockLineLineCollection })
  ticketLineCollection: Collection<Ticket> = new Collection<Ticket>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `StockLine_${this.id}`;
  }
  //endregion
}

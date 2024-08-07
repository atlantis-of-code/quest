// Mikro-ORM imports
import {
  Entity,
  ManyToOne,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Item } from './item';
import { StockCount } from './stock-count';
import { StockLine } from '../invoicing/stock-line';
import { Store } from './store';
import { StoreTransferLine } from './store-transfer-line';

// Enums as constant objects

export const StockTransferTypeConst = {
  DELIVERY_NOTE: { label: 'Delivery note', value: 'Delivery note' },
  TICKET: { label: 'Ticket', value: 'Ticket' },
  TRANSFER: { label: 'Transfer', value: 'Transfer' },
  COUNT: { label: 'Count', value: 'Count' },
} as const;
export type StockTransferType = typeof StockTransferTypeConst[keyof typeof StockTransferTypeConst]['value'];

@Entity({ tableName: 'items.stock_log' })
export class StockLog extends QuestEntity {
  //region Field names
  static readonly field = {
    CUSTOMER_NAME: 'customer_name',
    DATE: 'date',
    DESCRIPTION: 'description',
    DOCUMENT_NAME: 'document_name',
    DOCUMENT_OPERATION: 'document_operation',
    PREVIOUS_STOCK: 'previous_stock',
    QUANTITY: 'quantity',
    TYPE: 'type',
  };
  //endregion

  //region Entity names
  static entity = {
    AUX_STORE: 'auxStore',
    ITEM: 'item',
    STOCK_COUNT: 'stockCount',
    STOCK_LINE: 'stockLine',
    STORE: 'store',
    STORE_TRANSFER_LINE: 'storeTransferLine',
  };
  //endregion

  //region Fields
  @Property({ nullable: true })
  customer_name?: string;
  @Property({ defaultRaw: 'default' })
  date!: Date;
  @Property({ nullable: true })
  description?: string;
  @Property({ nullable: true })
  document_name?: string;
  @Property({ nullable: true })
  document_operation?: string;
  @Property({ defaultRaw: 'default' })
  previous_stock!: string;
  @Property({ defaultRaw: 'default' })
  quantity!: string;
  @Property()
  type!: StockTransferType;
  //endregion

  //region Entities
  @ManyToOne({ entity: () => 'Store', fieldName: 'aux_store_id', nullable: true })
  auxStore?: Store;
  @ManyToOne({ entity: () => 'Item', fieldName: 'item_id' })
  item!: Item;
  @ManyToOne({ entity: () => 'StockCount', fieldName: 'stock_count_id', nullable: true })
  stockCount?: StockCount;
  @ManyToOne({ entity: () => 'StockLine', fieldName: 'stock_line_id', nullable: true })
  stockLine?: StockLine;
  @ManyToOne({ entity: () => 'Store', fieldName: 'store_id' })
  store!: Store;
  @ManyToOne({ entity: () => 'StoreTransferLine', fieldName: 'store_transfer_line_id', nullable: true })
  storeTransferLine?: StoreTransferLine;
  //endregion

  //region CUSTOM
  //endregion
}

// Mikro-ORM imports
import {
  Entity,
  ManyToOne,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Item } from './item';
import { ManualStockTransferLine } from './manual-stock-transfer-line';
import { StockLine } from '../invoicing/stock-line';
import { Store } from './store';

// Enums as constant objects

export const StockTransferType = {
  DELIVERY_NOTE: 'Delivery note',
  TICKET: 'Ticket',
  TRANSFER: 'Transfer',
  RECOUNT: 'Re-count',
} as const;
export type StockTransferTypeType = typeof StockTransferType[keyof typeof StockTransferType];

@Entity({ tableName: 'items.stock_transfer' })
export class StockTransfer extends QuestEntity {
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
    MANUAL_STOCK_TRANSFER_LINE: 'manualStockTransferLine',
    STOCK_LINE: 'stockLine',
    STORE: 'store',
  };
  //endregion

  //region Fields
  @Property({ nullable: true })
  customer_name?: string;
  @Property()
  date?: Date;
  @Property({ nullable: true })
  description?: string;
  @Property({ nullable: true })
  document_name?: string;
  @Property({ nullable: true })
  document_operation?: string;
  @Property()
  previous_stock?: string;
  @Property()
  quantity?: string;
  @Property()
  type!: StockTransferTypeType;
  //endregion

  //region Entities
  @ManyToOne({ entity: () => 'Store', fieldName: 'aux_store_id', nullable: true })
  auxStore?: Store;
  @ManyToOne({ entity: () => 'Item', fieldName: 'item_id' })
  item!: Item;
  @ManyToOne({ entity: () => 'ManualStockTransferLine', fieldName: 'manual_stock_transfer_line_id', nullable: true })
  manualStockTransferLine?: ManualStockTransferLine;
  @ManyToOne({ entity: () => 'StockLine', fieldName: 'stock_line_id', nullable: true })
  stockLine?: StockLine;
  @ManyToOne({ entity: () => 'Store', fieldName: 'store_id' })
  store!: Store;
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `StockTransfer_${this.id}`;
  }
  //endregion
}

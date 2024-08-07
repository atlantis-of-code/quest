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
import { Item } from './item';
import { StockLog } from './stock-log';
import { StoreTransfer } from './store-transfer';

@Entity({ tableName: 'items.store_transfer_line' })
export class StoreTransferLine extends QuestEntity {
  //region Field names
  static readonly field = {
    QUANTITY: 'quantity',
  };
  //endregion

  //region Entity names
  static entity = {
    ITEM: 'item',
    STORE_TRANSFER: 'storeTransfer',
  };
  //endregion

  //region Collection names
  static collection = {
    STOCK_LOG: 'stockLogCollection',
  };
  //endregion

  //region Fields
  @Property()
  quantity!: string;
  //endregion

  //region Entities
  @ManyToOne({ entity: () => 'Item', fieldName: 'item_id', nullable: true })
  item?: Item;
  @ManyToOne({ entity: () => 'StoreTransfer', fieldName: 'store_transfer_id', nullable: true })
  storeTransfer?: StoreTransfer;
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'StockLog', mappedBy: (e: StockLog) => e.storeTransferLine, orphanRemoval: false })
  stockLogCollection: Collection<StockLog> = new Collection<StockLog>(this);
  //endregion

  //region CUSTOM
  //endregion
}

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
import { ManualStockTransfer } from './manual-stock-transfer';
import { StockTransfer } from './stock-transfer';

@Entity({ tableName: 'items.manual_stock_transfer_line' })
export class ManualStockTransferLine extends QuestEntity {
  //region Field names
  static readonly field = {
    QUANTITY: 'quantity',
  };
  //endregion

  //region Entity names
  static entity = {
    ITEM: 'item',
    MANUAL_STOCK_TRANSFER: 'manualStockTransfer',
  };
  //endregion

  //region Collection names
  static collection = {
    STOCK_TRANSFER: 'stockTransferCollection',
  };
  //endregion

  //region Fields
  @Property()
  quantity!: string;
  //endregion

  //region Entities
  @ManyToOne({ entity: () => 'Item', fieldName: 'item_id', nullable: true })
  item?: Item;
  @ManyToOne({ entity: () => 'ManualStockTransfer', fieldName: 'manual_stock_transfer_id', nullable: true })
  manualStockTransfer?: ManualStockTransfer;
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'StockTransfer', mappedBy: (e: StockTransfer) => e.manualStockTransferLine, orphanRemoval: false })
  stockTransferCollection: Collection<StockTransfer> = new Collection<StockTransfer>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `ManualStockTransferLine_${this.id}`;
  }
  //endregion
}

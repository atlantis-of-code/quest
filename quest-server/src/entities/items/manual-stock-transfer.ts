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
import { ManualStockTransferLine } from './manual-stock-transfer-line';
import { Store } from './store';

@Entity({ tableName: 'items.manual_stock_transfer' })
export class ManualStockTransfer extends QuestEntity {
  //region Field names
  static readonly field = {
    DATE: 'date',
  };
  //endregion

  //region Entity names
  static entity = {
    ORIGIN_STORE: 'originStore',
    TARGET_STORE: 'targetStore',
  };
  //endregion

  //region Collection names
  static collection = {
    MANUAL_STOCK_TRANSFER_LINE: 'manualStockTransferLineCollection',
  };
  //endregion

  //region Fields
  @Property()
  date?: Date;
  //endregion

  //region Entities
  @ManyToOne({ entity: () => 'Store', fieldName: 'origin_store_id' })
  originStore!: Store;
  @ManyToOne({ entity: () => 'Store', fieldName: 'target_store_id' })
  targetStore!: Store;
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'ManualStockTransferLine', mappedBy: (e: ManualStockTransferLine) => e.manualStockTransfer, orphanRemoval: true })
  manualStockTransferLineCollection: Collection<ManualStockTransferLine> = new Collection<ManualStockTransferLine>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `ManualStockTransfer_${this.id}`;
  }
  //endregion
}

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
import { Store } from './store';
import { StoreTransferLine } from './store-transfer-line';

@Entity({ tableName: 'items.store_transfer' })
export class StoreTransfer extends QuestEntity {
  //region Field names
  static readonly field = {
    DATE: 'date',
  };
  //endregion

  //region Entity names
  static entity = {
    SOURCE_STORE: 'sourceStore',
    TARGET_STORE: 'targetStore',
  };
  //endregion

  //region Collection names
  static collection = {
    STORE_TRANSFER_LINE: 'storeTransferLineCollection',
  };
  //endregion

  //region Fields
  @Property({ defaultRaw: 'default' })
  date!: Date;
  //endregion

  //region Entities
  @ManyToOne({ entity: () => 'Store', fieldName: 'source_store_id' })
  sourceStore!: Store;
  @ManyToOne({ entity: () => 'Store', fieldName: 'target_store_id' })
  targetStore!: Store;
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'StoreTransferLine', mappedBy: (e: StoreTransferLine) => e.storeTransfer, orphanRemoval: true })
  storeTransferLineCollection: Collection<StoreTransferLine> = new Collection<StoreTransferLine>(this);
  //endregion

  //region CUSTOM
  //endregion
}

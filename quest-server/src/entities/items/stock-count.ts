// Mikro-ORM imports
import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { File } from '../files/file';
import { StockLog } from './stock-log';

@Entity({ tableName: 'items.stock_count' })
export class StockCount extends QuestEntity {
  //region Field names
  static readonly field = {
    DATE: 'date',
  };
  //endregion

  //region Entity names
  static entity = {
    FILE: 'file',
  };
  //endregion

  //region Collection names
  static collection = {
    STOCK_LOG: 'stockLogCollection',
  };
  //endregion

  //region Fields
  @Property({ defaultRaw: 'default' })
  date!: Date;
  //endregion

  //region Entities
  @ManyToOne({ entity: () => 'File', fieldName: 'file_id', nullable: true, cascade: [Cascade.REMOVE] })
  file?: File;
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'StockLog', mappedBy: (e: StockLog) => e.stockCount, orphanRemoval: true })
  stockLogCollection: Collection<StockLog> = new Collection<StockLog>(this);
  //endregion

  //region CUSTOM
  //endregion
}

// Mikro-ORM imports
import {
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { BudgetLine } from '../invoicing/budget-line';
import { Category } from './category';
import { File } from '../files/file';
import { Stock } from './stock';
import { StockLine } from '../invoicing/stock-line';
import { StockLog } from './stock-log';
import { StoreTransferLine } from './store-transfer-line';
import { Tax } from '../common/tax';

@Entity({ tableName: 'items.item' })
export class Item extends QuestEntity {
  //region Field names
  static readonly field = {
    BASE_PRICE: 'base_price',
    CODE: 'code',
    DESCRIPTION: 'description',
    IS_ENABLED: 'is_enabled',
    NAME: 'name',
  };
  //endregion

  //region Entity names
  static entity = {
    CATEGORY: 'category',
    PHOTO: 'photo',
    TAX: 'tax',
  };
  //endregion

  //region Collection names
  static collection = {
    BUDGET_LINE: 'budgetLineCollection',
    FILE: 'fileCollection',
    STOCK: 'stockCollection',
    STOCK_LINE: 'stockLineCollection',
    STOCK_LOG: 'stockLogCollection',
    STORE_TRANSFER_LINE: 'storeTransferLineCollection',
  };
  //endregion

  //region Fields
  @Property({ defaultRaw: 'default' })
  base_price!: string;
  @Property()
  code!: number;
  @Property({ nullable: true })
  description?: string;
  @Property({ defaultRaw: 'default' })
  is_enabled!: boolean;
  @Property()
  name!: string;
  //endregion

  //region Entities
  @ManyToOne({ entity: () => 'Category', fieldName: 'category_id', nullable: true })
  category?: Category;
  @ManyToOne({ entity: () => 'File', fieldName: 'photo_id', nullable: true, cascade: [Cascade.REMOVE] })
  photo?: File;
  @ManyToOne({ entity: () => 'Tax', fieldName: 'tax_id', nullable: true })
  tax?: Tax;
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'BudgetLine', mappedBy: (e: BudgetLine) => e.item, orphanRemoval: false })
  budgetLineCollection: Collection<BudgetLine> = new Collection<BudgetLine>(this);
  @ManyToMany({ entity: () => 'File', pivotTable: 'items.item_file', joinColumn: 'item_id', inverseJoinColumn: 'file_id', cascade: [Cascade.REMOVE] })
  fileCollection: Collection<File> = new Collection<File>(this);
  @OneToMany({ entity: () => 'Stock', mappedBy: (e: Stock) => e.item, orphanRemoval: true })
  stockCollection: Collection<Stock> = new Collection<Stock>(this);
  @OneToMany({ entity: () => 'StockLine', mappedBy: (e: StockLine) => e.item, orphanRemoval: false })
  stockLineCollection: Collection<StockLine> = new Collection<StockLine>(this);
  @OneToMany({ entity: () => 'StockLog', mappedBy: (e: StockLog) => e.item, orphanRemoval: true })
  stockLogCollection: Collection<StockLog> = new Collection<StockLog>(this);
  @OneToMany({ entity: () => 'StoreTransferLine', mappedBy: (e: StoreTransferLine) => e.item, orphanRemoval: false })
  storeTransferLineCollection: Collection<StoreTransferLine> = new Collection<StoreTransferLine>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Item_${this.id}`;
  }
  //endregion
}

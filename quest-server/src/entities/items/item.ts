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
import { ManualStockTransferLine } from './manual-stock-transfer-line';
import { Stock } from './stock';
import { StockLine } from '../invoicing/stock-line';
import { StockTransfer } from './stock-transfer';
import { Tax } from '../common/tax';

@Entity({ tableName: 'items.item' })
export class Item extends QuestEntity {
  //region Field names
  static readonly field = {
    BASE_PRICE: 'base_price',
    CODE: 'code',
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
    MANUAL_STOCK_TRANSFER_LINE: 'manualStockTransferLineCollection',
    STOCK: 'stockCollection',
    STOCK_LINE: 'stockLineCollection',
    STOCK_TRANSFER: 'stockTransferCollection',
  };
  //endregion

  //region Fields
  @Property()
  base_price?: string;
  @Property()
  code!: number;
  @Property()
  is_enabled?: boolean;
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
  @OneToMany({ entity: () => 'ManualStockTransferLine', mappedBy: (e: ManualStockTransferLine) => e.item, orphanRemoval: false })
  manualStockTransferLineCollection: Collection<ManualStockTransferLine> = new Collection<ManualStockTransferLine>(this);
  @OneToMany({ entity: () => 'Stock', mappedBy: (e: Stock) => e.item, orphanRemoval: true })
  stockCollection: Collection<Stock> = new Collection<Stock>(this);
  @OneToMany({ entity: () => 'StockLine', mappedBy: (e: StockLine) => e.item, orphanRemoval: false })
  stockLineCollection: Collection<StockLine> = new Collection<StockLine>(this);
  @OneToMany({ entity: () => 'StockTransfer', mappedBy: (e: StockTransfer) => e.item, orphanRemoval: true })
  stockTransferCollection: Collection<StockTransfer> = new Collection<StockTransfer>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Item_${this.id}`;
  }
  //endregion
}

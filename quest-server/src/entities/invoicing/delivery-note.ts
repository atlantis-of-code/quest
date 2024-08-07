// Mikro-ORM imports
import {
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Customer } from '../customers/customer';
import { File } from '../files/file';
import { FiscalYear } from '../common/fiscal-year';
import { Invoice } from './invoice';
import { Series } from '../common/series';
import { StockLine } from './stock-line';

@Entity({ tableName: 'invoicing.delivery_note' })
export class DeliveryNote extends QuestEntity {
  //region Field names
  static readonly field = {
    DATE: 'date',
    NUMBER: 'number',
    OBSERVATIONS: 'observations',
    TOTAL: 'total',
    TOTAL_BASE: 'total_base',
    TOTAL_TAXES: 'total_taxes',
  };
  //endregion

  //region Entity names
  static entity = {
    CUSTOMER: 'customer',
    FISCAL_YEAR: 'fiscalYear',
    INVOICE: 'invoice',
    SERIES: 'series',
  };
  //endregion

  //region Collection names
  static collection = {
    FILE: 'fileCollection',
    STOCK_LINE_LINE: 'stockLineLineCollection',
  };
  //endregion

  //region Fields
  @Property({ nullable: true })
  date?: Date;
  @Property({ nullable: true })
  number?: number;
  @Property({ nullable: true })
  observations?: string;
  @Property({ nullable: true })
  total?: string;
  @Property({ nullable: true })
  total_base?: string;
  @Property({ nullable: true })
  total_taxes?: string;
  //endregion

  //region Entities
  @ManyToOne({ entity: () => 'Customer', fieldName: 'customer_id' })
  customer!: Customer;
  @ManyToOne({ entity: () => 'FiscalYear', fieldName: 'fiscal_year_id', nullable: true })
  fiscalYear?: FiscalYear;
  @ManyToOne({ entity: () => 'Invoice', fieldName: 'invoice_id', nullable: true })
  invoice?: Invoice;
  @ManyToOne({ entity: () => 'Series', fieldName: 'series_id', nullable: true })
  series?: Series;
  //endregion

  //region Mapped collections and inversed entities
  @ManyToMany({ entity: () => 'File', pivotTable: 'invoicing.delivery_note_file', joinColumn: 'delivery_note_id', inverseJoinColumn: 'file_id', cascade: [Cascade.REMOVE] })
  fileCollection: Collection<File> = new Collection<File>(this);
  @ManyToMany({ entity: () => 'StockLine', pivotTable: 'invoicing.delivery_note_line', joinColumn: 'delivery_note_id', inverseJoinColumn: 'stock_line_id', cascade: [Cascade.REMOVE] })
  stockLineLineCollection: Collection<StockLine> = new Collection<StockLine>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `DeliveryNote_${this.id}`;
  }
  //endregion
}

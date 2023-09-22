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
import { Address } from '../common/address';
import { Customer } from '../customers/customer';
import { File } from '../files/file';
import { FiscalYear } from '../common/fiscal-year';
import { LegalData } from '../common/legal-data';
import { Series } from '../common/series';
import { StockLine } from './stock-line';

@Entity({ tableName: 'invoicing.ticket' })
export class Ticket extends QuestEntity {
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
    COMPANY_ADDRESS: 'companyAddress',
    COMPANY_LEGAL_DATA: 'companyLegalData',
    CUSTOMER: 'customer',
    CUSTOMER_ADDRESS: 'customerAddress',
    CUSTOMER_LEGAL_DATA: 'customerLegalData',
    FISCAL_YEAR: 'fiscalYear',
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
  @ManyToOne({ entity: () => 'Address', fieldName: 'company_address_id', nullable: true })
  companyAddress?: Address;
  @ManyToOne({ entity: () => 'LegalData', fieldName: 'company_legal_data_id', nullable: true })
  companyLegalData?: LegalData;
  @ManyToOne({ entity: () => 'Customer', fieldName: 'customer_id' })
  customer!: Customer;
  @ManyToOne({ entity: () => 'Address', fieldName: 'customer_address_id', nullable: true })
  customerAddress?: Address;
  @ManyToOne({ entity: () => 'LegalData', fieldName: 'customer_legal_data_id', nullable: true })
  customerLegalData?: LegalData;
  @ManyToOne({ entity: () => 'FiscalYear', fieldName: 'fiscal_year_id', nullable: true })
  fiscalYear?: FiscalYear;
  @ManyToOne({ entity: () => 'Series', fieldName: 'series_id', nullable: true })
  series?: Series;
  //endregion

  //region Mapped collections and inversed entities
  @ManyToMany({ entity: () => 'File', pivotTable: 'invoicing.ticket_file', joinColumn: 'ticket_id', inverseJoinColumn: 'file_id', cascade: [Cascade.REMOVE] })
  fileCollection: Collection<File> = new Collection<File>(this);
  @ManyToMany({ entity: () => 'StockLine', pivotTable: 'invoicing.ticket_line', joinColumn: 'ticket_id', inverseJoinColumn: 'stock_line_id', cascade: [Cascade.REMOVE] })
  stockLineLineCollection: Collection<StockLine> = new Collection<StockLine>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Ticket_${this.id}`;
  }
  //endregion
}

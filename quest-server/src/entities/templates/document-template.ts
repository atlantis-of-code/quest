// Mikro-ORM imports
import {
  Embeddable,
  ManyToOne,
  Property } from '@mikro-orm/core';
// Entities imports
import { Customer } from '../customers/customer';
import { FiscalYear } from '../common/fiscal-year';
import { Series } from '../common/series';

@Embeddable()
export class DocumentTemplate {
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
    SERIES: 'series',
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
  @ManyToOne({ entity: () => 'Customer', fieldName: 'customer_id', eager: true })
  customer!: Customer;
  @ManyToOne({ entity: () => 'FiscalYear', fieldName: 'fiscal_year_id', eager: true, nullable: true })
  fiscalYear?: FiscalYear;
  @ManyToOne({ entity: () => 'Series', fieldName: 'series_id', eager: true, nullable: true })
  series?: Series;
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return 'DocumentTemplate';
  }
  //endregion
}

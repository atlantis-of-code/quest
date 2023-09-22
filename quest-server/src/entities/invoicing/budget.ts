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
import { BudgetLine } from './budget-line';
import { Customer } from '../customers/customer';
import { File } from '../files/file';
import { FiscalYear } from '../common/fiscal-year';
import { Series } from '../common/series';

@Entity({ tableName: 'invoicing.budget' })
export class Budget extends QuestEntity {
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

  //region Collection names
  static collection = {
    BUDGET_LINE: 'budgetLineCollection',
    FILE: 'fileCollection',
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
  @ManyToOne({ entity: () => 'Series', fieldName: 'series_id', nullable: true })
  series?: Series;
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'BudgetLine', mappedBy: (e: BudgetLine) => e.budget, orphanRemoval: true })
  budgetLineCollection: Collection<BudgetLine> = new Collection<BudgetLine>(this);
  @ManyToMany({ entity: () => 'File', pivotTable: 'invoicing.budget_file', joinColumn: 'budget_id', inverseJoinColumn: 'file_id', cascade: [Cascade.REMOVE] })
  fileCollection: Collection<File> = new Collection<File>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Budget_${this.id}`;
  }
  //endregion
}

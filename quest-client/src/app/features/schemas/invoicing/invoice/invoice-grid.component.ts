import { Component, inject, Input, OnInit } from '@angular/core';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocTabConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocGridColumn, AocTabConfigurable } from '@atlantis-of-code/aoc-client/core/types';
import { AocModelEmitter, AocModelListener } from '@atlantis-of-code/aoc-client/core/utils';
import Big from 'big.js';
import { of } from 'rxjs';
import { CustomerModelConfig } from '../../../../model-configs/customers/customer-model-config';
import { InvoiceModelConfig } from '../../../../model-configs/invoicing/invoice-model-config';
import { FiscalYear } from '../../../../models/common/fiscal-year';
import { Invoice } from '../../../../models/invoicing/invoice';
import { QuestDatePipe } from '../../../../pipes/quest-date.pipe';
import { QuestDocumentPipe } from '../../../../pipes/quest-document.pipe';
import { QuestPricePipe } from '../../../../pipes/quest-price.pipe';

@Component({
  selector: 'app-invoice-grid',
  standalone: true,
  imports: [
    AocGridModule
  ],
  template: `
    <aoc-grid
      [modelConfig]="modelConfig"
      [columns]="columns"
      [restOptions]="restOptions"
      [modelEmitter]="modelEmitter"
      [modelListener]="modelListener"
    ></aoc-grid>
  `
})
export class InvoiceGridComponent implements OnInit, AocTabConfigurable {
  @Input() modelEmitter: AocModelEmitter<Invoice>;
  @Input() modelListener: AocModelListener<Invoice>;
  protected modelConfig = inject(InvoiceModelConfig);
  protected columns: AocGridColumn<Invoice>[];
  protected restOptions: AocRestOptions<Invoice> = {
    populate: {
      customer: true,
      fiscalYear: true,
      series: true
    }
  };

  private questDatePipe = inject(QuestDatePipe);
  private questDocumentPipe = inject(QuestDocumentPipe);
  private questPricePipe = inject(QuestPricePipe);
  private customerModelConfig = inject(CustomerModelConfig);

  createAocTabConfig(): AocTabConfig {
    return {
      title: of('Invoices')
    }
  }

  ngOnInit() {
    this.columns = [
      {
        header: 'Fiscal year',
        display: [ Invoice.entity.FISCAL_YEAR, FiscalYear.field.YEAR ],
        size: '8rem',
        align: 'right'
      },
      {
        header: 'Date',
        display: [ Invoice.field.DATE, this.questDatePipe ],
        size: '8rem',
        defaultSort: 'desc'
      },
      {
        header: 'Series/number',
        display: (i: Invoice) => this.questDocumentPipe.transform(i, false),
        orderBy: {
          series: { name: 'auto' },
          number: 'auto'
        },
        size: '10rem',
        align: 'center'
      }
    ];
    if (!this.modelListener) {
      this.columns = this.columns.concat([
        {
          header: 'Customer',
          display: [ Invoice.entity.CUSTOMER, this.customerModelConfig ]
        }
      ])
    }
    this.columns = this.columns.concat([
      {
        header: 'Total base',
        display: [ Invoice.field.TOTAL_BASE, this.questPricePipe ],
        size: '10rem',
        align: 'right'
      },
      {
        header: 'Total taxes',
        display: [ Invoice.field.TOTAL_TAXES, this.questPricePipe ],
        size: '10rem',
        align: 'right'
      },
      {
        header: 'Total payments',
        display: [ Invoice.virtual.TOTAL_PAYMENT, this.questPricePipe ],
        size: '10rem',
        align: 'right',
        ngStyle: row => {
          if (Big(row.data.total_payment).lt(row.data.total)) {
            return {
              backgroundColor: 'red',
              color: 'white'
            }
          }
        }
      },
      {
        header: 'Total',
        display: [ Invoice.field.TOTAL, this.questPricePipe ],
        size: '10rem',
        align: 'right',
        ngStyle: { fontWeight: 'bold' }
      }
    ]);
  }
}

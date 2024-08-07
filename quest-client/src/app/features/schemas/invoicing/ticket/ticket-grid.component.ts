import { Component, inject, Input, OnInit } from '@angular/core';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocTabConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocGridColumn, AocTabConfigurable } from '@atlantis-of-code/aoc-client/core/types';
import { AocModelEmitter } from '@atlantis-of-code/aoc-client/core/utils';
import Big from 'big.js';
import { of } from 'rxjs';
import { CustomerModelConfig } from '../../../../model-configs/customers/customer-model-config';
import { TicketModelConfig } from '../../../../model-configs/invoicing/ticket-model-config';
import { FiscalYear } from '../../../../models/common/fiscal-year';
import { Invoice } from '../../../../models/invoicing/invoice';
import { Ticket } from '../../../../models/invoicing/ticket';
import { DocumentTemplate } from '../../../../models/templates/document-template';
import { QuestDatePipe } from '../../../../pipes/quest-date.pipe';
import { QuestDocumentPipe } from '../../../../pipes/quest-document.pipe';
import { QuestPricePipe } from '../../../../pipes/quest-price.pipe';

@Component({
  selector: 'app-ticket-grid',
  standalone: true,
  imports: [
    AocGridModule
  ],
  template: `
    <aoc-grid
      [modelConfig]="modelConfg"
      [columns]="columns"
      [restOptions]="restOptions"
      [modelEmitter]="modelEmitter"
    ></aoc-grid>
  `
})
export class TicketGridComponent implements OnInit, AocTabConfigurable {
  @Input() modelEmitter: AocModelEmitter<Ticket>;

  protected modelConfg = inject(TicketModelConfig);
  protected columns: AocGridColumn<Ticket>[];
  protected restOptions: AocRestOptions<Ticket> = {
    populate: {
      fiscalYear: true,
      series: true,
      customer: true
    }
  };

  private questDatePipe = inject(QuestDatePipe);
  private questPricePipe = inject(QuestPricePipe);
  private questDocumentPipe = inject(QuestDocumentPipe);
  private customerModelConfig = inject(CustomerModelConfig);

  createAocTabConfig(): AocTabConfig {
    return {
      title: of('Tickets')
    }
  }

  ngOnInit() {
    this.columns = [
      {
        header: 'Fiscal year',
        display: [ Ticket.entity.FISCAL_YEAR, FiscalYear.field.YEAR ],
        align: 'right',
        size: '8rem'
      },
      {
        header: 'Date',
        display: [ Ticket.field.DATE, this.questDatePipe ],
        size: '8rem',
        defaultSort: 'desc'
      },
      {
        header: 'Series/number',
        display: (t: Ticket) => this.questDocumentPipe.transform(t as DocumentTemplate, false),
        orderBy: {
          series: { name: 'auto' },
          number: 'auto'
        },
        size: '12rem',
        align: 'center'
      },
      {
        header: 'Customer',
        display: [ Ticket.entity.CUSTOMER, this.customerModelConfig ]
      },
      {
        header: 'Total base',
        display: [ Ticket.field.TOTAL_BASE, this.questPricePipe ],
        size: '12rem',
        align: 'right'
      },
      {
        header: 'Total taxes',
        display: [ Ticket.field.TOTAL_TAXES, this.questPricePipe ],
        size: '12rem',
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
        display: [ Ticket.field.TOTAL, this.questPricePipe ],
        size: '12rem',
        align: 'right',
        ngStyle: { fontWeight: 'bold' }
      }
    ];
  }
}

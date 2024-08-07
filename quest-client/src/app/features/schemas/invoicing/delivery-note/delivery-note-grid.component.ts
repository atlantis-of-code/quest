import { Component, inject, Input, OnInit } from '@angular/core';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocTabConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocFormWindowService } from '@atlantis-of-code/aoc-client/core/services';
import { AocGridColumn, AocTabConfigurable } from '@atlantis-of-code/aoc-client/core/types';
import { AocModelEmitter, AocModelListener } from '@atlantis-of-code/aoc-client/core/utils';
import { aocUiTplRef } from '@atlantis-of-code/aoc-client/ui/common/types';
import { of } from 'rxjs';
import { CustomerModelConfig } from '../../../../model-configs/customers/customer-model-config';
import { DeliveryNoteModelConfig } from '../../../../model-configs/invoicing/delivery-note-model-config';
import { InvoiceModelConfig } from '../../../../model-configs/invoicing/invoice-model-config';
import { FiscalYear } from '../../../../models/common/fiscal-year';
import { DeliveryNote } from '../../../../models/invoicing/delivery-note';
import { Invoice } from '../../../../models/invoicing/invoice';
import { QuestDatePipe } from '../../../../pipes/quest-date.pipe';
import { QuestDocumentPipe } from '../../../../pipes/quest-document.pipe';
import { QuestPricePipe } from '../../../../pipes/quest-price.pipe';

@Component({
  selector: 'app-delivery-note-grid',
  standalone: true,
  imports: [
    AocGridModule,
    QuestDocumentPipe
  ],
  template: `
    <aoc-grid
      [modelConfig]="modelConfig"
      [columns]="columns"
      [restOptions]="restOptions"
      [modelEmitter]="modelEmitter"
      [modelListener]="modelListener"
    >
      <ng-template aocGridCell="invoice" let-invoice='value'>
        <span style="text-decoration: underline; cursor: pointer" (click)="showInvoice(invoice)">{{ invoice | questDocumentPipe }}</span>
      </ng-template>
    </aoc-grid>
  `
})
export class DeliveryNoteGridComponent implements OnInit, AocTabConfigurable {
  @Input() modelEmitter: AocModelEmitter<DeliveryNote>;
  @Input() modelListener: AocModelListener<DeliveryNote>;
  protected modelConfig = inject(DeliveryNoteModelConfig);
  protected columns: AocGridColumn<DeliveryNote>[];
  protected restOptions: AocRestOptions<DeliveryNote> = {
    populate: {
      fiscalYear: true,
      series: true,
      customer: true,
      invoice: {
        fiscalYear: true,
        series: true
      }
    }
  };

  private questDatePipe = inject(QuestDatePipe);
  private questPricePipe = inject(QuestPricePipe);
  private questDocumentPipe = inject(QuestDocumentPipe);
  private customerModelConfig = inject(CustomerModelConfig);
  private invoiceModelConfig = inject(InvoiceModelConfig);
  private aocFormWindowService = inject(AocFormWindowService);

  createAocTabConfig(): AocTabConfig {
    return {
      title: of('Delivery notes')
    }
  }

  ngOnInit() {
    this.columns = [
      {
        header: 'Fiscal year',
        display: [ DeliveryNote.entity.FISCAL_YEAR, FiscalYear.field.YEAR ],
        align: 'right',
        size: '8rem'
      },
      {
        header: 'Date',
        display: [ DeliveryNote.field.DATE, this.questDatePipe ],
        size: '7rem',
        defaultSort: 'desc'
      },
      {
        header: 'Series/number',
        display: dn => this.questDocumentPipe.transform(dn, false),
        orderBy: {
          series: { name: 'auto' },
          number: 'auto'
        },
        size: '9rem',
        align: 'center'
      },
      {
        header: 'Invoice',
        display: [ DeliveryNote.entity.INVOICE, aocUiTplRef('invoice') ],
        size: '9rem',
        align: 'center'
      }
    ];
    if (!this.modelListener) {
      this.columns = this.columns.concat([
        {
          header: 'Customer',
          display: [ DeliveryNote.entity.CUSTOMER, this.customerModelConfig ]
        }
      ]);
    }
    this.columns = this.columns.concat([
      {
        header: 'Total base',
        display: [ DeliveryNote.field.TOTAL_BASE, this.questPricePipe ],
        size: '8rem',
        align: 'right'
      },
      {
        header: 'Total taxes',
        display: [ DeliveryNote.field.TOTAL_TAXES, this.questPricePipe ],
        size: '8rem',
        align: 'right'
      },
      {
        header: 'Total',
        display: [ DeliveryNote.field.TOTAL, this.questPricePipe ],
        size: '8rem',
        align: 'right',
        ngStyle: { fontWeight: 'bold' }
      }
    ]);
  }

  protected showInvoice(invoice: Invoice) {
    this.aocFormWindowService.openUsingModelConfig({
      modelConfig: this.invoiceModelConfig,
      aocFormConfig: {
        persistToDatabase: true,
        loadFromDatabase: true,
        modelOrId: invoice
      }
    }).then();
  }
}

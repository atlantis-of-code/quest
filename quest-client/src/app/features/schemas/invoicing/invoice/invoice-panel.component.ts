import { Component, inject, OnInit } from '@angular/core';
import { AocMasterDetailModule } from '@atlantis-of-code/aoc-client/components/aoc-master-detail';
import { AocTabConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocUnsubscribe } from '@atlantis-of-code/aoc-client/core/decorators';
import { AocTabConfigurable, AocTabConfigurableParams } from '@atlantis-of-code/aoc-client/core/types';
import { AocModelEmitter } from '@atlantis-of-code/aoc-client/core/utils';
import { of } from 'rxjs';
import { InvoiceModelConfig } from '../../../../model-configs/invoicing/invoice-model-config';
import { Invoice } from '../../../../models/invoicing/invoice';
import { InvoiceGridComponent } from './invoice-grid.component';

@Component({
  selector: 'app-invoice-panel',
  standalone: true,
  imports: [
    AocMasterDetailModule,
    InvoiceGridComponent
  ],
  template: `
    <aoc-master-detail
      [masterModelConfig]="invoiceModelConfig"
      [masterModelEmitter]="invoiceModelEmitter"
      [detailWidthPercent]="40"
    >
      <ng-template aocMaster>
        <app-invoice-grid [modelEmitter]="invoiceModelEmitter"></app-invoice-grid>
      </ng-template>
      <ng-template aocDetail tabName="Preview">
        <!--
        TODO: use currentInvoice to send to preview (or its url)
        -->
      </ng-template>
    </aoc-master-detail>
  `
})
export default class InvoicePanelComponent implements OnInit, AocTabConfigurable {
  protected invoiceModelConfig = inject(InvoiceModelConfig);

  @AocUnsubscribe
  protected invoiceModelEmitter = new AocModelEmitter<Invoice>();

  protected currentInvoice: Invoice;

  ngOnInit() {
    this.invoiceModelEmitter.model$.subscribe(invoice => this.currentInvoice = invoice);
  }

  createAocTabConfig(params?: AocTabConfigurableParams): AocTabConfig {
    return {
      title: of('Invoices')
    }
  }
}

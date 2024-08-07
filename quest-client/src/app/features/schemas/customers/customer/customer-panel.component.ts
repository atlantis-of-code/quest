import { Component, inject } from '@angular/core';
import { AocMasterDetailModule } from '@atlantis-of-code/aoc-client/components/aoc-master-detail';
import { AocTabConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocUnsubscribe } from '@atlantis-of-code/aoc-client/core/decorators';
import { AocTabConfigurable } from '@atlantis-of-code/aoc-client/core/types';
import { AocModelEmitter, AocModelListener, aocSetId } from '@atlantis-of-code/aoc-client/core/utils';
import { of } from 'rxjs';
import { CustomerModelConfig } from '../../../../model-configs/customers/customer-model-config';
import { Customer } from '../../../../models/customers/customer';
import { Budget } from '../../../../models/invoicing/budget';
import { DeliveryNote } from '../../../../models/invoicing/delivery-note';
import { Invoice } from '../../../../models/invoicing/invoice';
import { BudgetGridComponent } from '../../invoicing/budget/budget-grid.component';
import { DeliveryNoteGridComponent } from '../../invoicing/delivery-note/delivery-note-grid.component';
import { InvoiceGridComponent } from '../../invoicing/invoice/invoice-grid.component';
import CustomerGridComponent from './customer-grid.component';

@Component({
  selector: 'app-customer-panel',
  standalone: true,
  imports: [
    AocMasterDetailModule,
    CustomerGridComponent,
    InvoiceGridComponent,
    DeliveryNoteGridComponent,
    BudgetGridComponent,
    DeliveryNoteGridComponent
  ],
  template: `
    <aoc-master-detail [masterModelConfig]="modelConfig" [masterModelEmitter]="emitter" [detailWidthPercent]="45">
      <ng-template aocMaster>
        <app-customer-grid [emitter]="emitter"></app-customer-grid>
      </ng-template>
      <ng-template aocDetail tabName="Invoices">
        <app-invoice-grid [modelListener]="invoiceListener"></app-invoice-grid>
      </ng-template>
      <ng-template aocDetail tabName="Delivery notes">
        <app-delivery-note-grid [modelListener]="deliveryNoteListener"></app-delivery-note-grid>
      </ng-template>
      <ng-template aocDetail tabName="Budgets">
        <app-budget-grid [modelListener]="budgetListener"></app-budget-grid>
      </ng-template>
    </aoc-master-detail>
  `
})
export default class CustomerPanelComponent implements AocTabConfigurable {
  protected modelConfig = inject(CustomerModelConfig);

  @AocUnsubscribe
  protected emitter = new AocModelEmitter<Customer>();

  @AocUnsubscribe
  protected invoiceListener = new AocModelListener<Invoice>([
    {
      emitter: this.emitter,
      type: 'filter query',
      filterQuery: aocSetId('customer'),
      dynamicFormGroup: { customer: {} }
    }
  ]);

  @AocUnsubscribe
  protected deliveryNoteListener = new AocModelListener<DeliveryNote>([
    {
      emitter: this.emitter,
      type: 'filter query',
      filterQuery: aocSetId('customer'),
      dynamicFormGroup: { customer: {} }
    }
  ]);

  @AocUnsubscribe
  protected budgetListener = new AocModelListener<Budget>([
    {
      emitter: this.emitter,
      type: 'filter query',
      filterQuery: aocSetId('customer'),
      dynamicFormGroup: { customer: {} }
    }
  ]);

  createAocTabConfig(): AocTabConfig {
    return {
      title: of('Customers'),
      icon: 'groups'
    };
  }
}

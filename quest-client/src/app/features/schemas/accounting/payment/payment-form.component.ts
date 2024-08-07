import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocRestService } from '@atlantis-of-code/aoc-client/core/services';
import { AocFormGroupType } from '@atlantis-of-code/aoc-client/core/types';
import { AocUiAutofocusModule } from '@atlantis-of-code/aoc-client/ui/common/directives/aoc-ui-autofocus';
import { AocUiValidators } from '@atlantis-of-code/aoc-client/ui/common/validators';
import { AocUiDatetimePickerModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-datetime-picker';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { AocUiDialogService } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-dialog';
import {
  AocUiWindowDynConfig,
  AocUiWindowDynConfigurable, AocUiWindowDynRef
} from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import Big from 'big.js';
import { PaymentModelConfig } from '../../../../model-configs/accounting/payment-model-config';
import { Payment } from '../../../../models/accounting/payment';
import { Invoice } from '../../../../models/invoicing/invoice';
import { Ticket } from '../../../../models/invoicing/ticket';
import { QuestDefaultsService } from '../../../../services/quest-defaults-service';
import { PaymentSystemAutocompleteComponent } from '../../common/payment-system/payment-system-autocomplete.component';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  providers: [AocFormController],
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiFormModule,
    AocUiDatetimePickerModule,
    PaymentSystemAutocompleteComponent,
    AocUiInputTextModule,
    AocUiAutofocusModule
  ],
  template: `
    <aoc-form [formGroup]="formGroup" [modelConfig]="modelConfig" [restOptions]="restOptions">
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <aoc-ui-datetime-picker aocUiFormField="Date" mode="date" [formControlName]="$.field.DATE"></aoc-ui-datetime-picker>
            <app-payment-system-autocomplete aocUiFormField="Payment system" [formControlName]="$.entity.PAYMENT_SYSTEM"></app-payment-system-autocomplete>
            <input aocUiInputText aocUiFormField="Quantity" [formControlName]="$.field.QUANTITY" aocUiAutofocus>
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `
})
export default class PaymentFormComponent implements OnInit, AocUiWindowDynConfigurable {
  protected $ = Payment;

  protected modelConfig = inject(PaymentModelConfig);

  protected restOptions: AocRestOptions<Payment> = {
    populate: {
      paymentSystem: true,
      invoiceCollection: true,
      ticketCollection: true
    }
  };

  protected formGroup: FormGroup<AocFormGroupType<Payment>>;

  private questDefaultsService = inject(QuestDefaultsService);
  private aocFormController = inject(AocFormController<Payment>);
  private aocRestService = inject(AocRestService);
  private aocUiWindowDynRef = inject(AocUiWindowDynRef);
  private aocUiDialogService = inject(AocUiDialogService);

  ngOnInit() {
    this.formGroup = new FormGroup<AocFormGroupType<Payment>>({
      date: new FormControl(new Date(), Validators.required),
      paymentSystem: new FormControl(this.questDefaultsService.paymentSystem, Validators.required),
      quantity: new FormControl('0.00', [Validators.required, AocUiValidators.number(2)]),
      invoiceCollection: new FormControl([]),
      ticketCollection: new FormControl([])
    });
    this.handleFormController().then();
  }

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      width: 640,
      height: 150
    }
  }

  private async handleFormController() {
    const currentPayment = await this.aocFormController.patched();
    const [ invoice ] = this.formGroup.controls.invoiceCollection.value;
    if (invoice) {
      await this.checkInvoice(currentPayment, invoice);
      return;
    }
    const [ ticket ] = this.formGroup.controls.ticketCollection.value;
    if (ticket) {
      await this.checkTicket(currentPayment, ticket);
      return;
    }
  }

  private async checkInvoice(currentPayment: Payment, invoice: Invoice) {
    // Other payments, exclude current if form payment has id
    const otherPayments = await this.aocRestService.find(
      Payment,
      { invoiceCollection: { id: invoice.id }, id: currentPayment.id ? { $ne: currentPayment.id } : { $ne: null }}
    );
    this.handlePayments(invoice.total, currentPayment, otherPayments);
  }

  private async checkTicket(currentPayment: Payment, ticket: Ticket) {
    // Other payments, exclude current if form payment has id
    const otherPayments = await this.aocRestService.find(
      Payment,
      { ticketCollection: { id: ticket.id }, id: currentPayment.id ? { $ne: currentPayment.id } : { $ne: null }}
    );
    this.handlePayments(ticket.total, currentPayment, otherPayments);
  }

  private handlePayments(documentTotal: string, currentPayment: Payment, otherPayments: Payment[]) {
    const paymentsTotal = otherPayments.reduce((acc, payment) => acc.plus(payment.quantity), Big('0'));
    const max = Big(documentTotal).minus(paymentsTotal);
    this.formGroup.controls.quantity.addValidators(Validators.max(max.toNumber()));
    if (!currentPayment.id) {
      if (max.eq('0')) {
        this.aocUiDialogService.info({
          message: 'There are no pending payments',
          okCallback: () => this.aocUiWindowDynRef.close()
        });
      } else {
        this.formGroup.controls.quantity.setValue(max.toString());
      }
    }
  }
}

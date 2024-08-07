import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, NgControl } from '@angular/forms';
import { AocFormController } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocDynFormGroup } from '@atlantis-of-code/aoc-client/core/configs';
import { AocDirectivesModule } from '@atlantis-of-code/aoc-client/core/directives';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import Big from 'big.js';
import { PaymentModelConfig } from '../../../../model-configs/accounting/payment-model-config';
import { Payment } from '../../../../models/accounting/payment';
import { PaymentSystem } from '../../../../models/common/payment-system';
import { Invoice } from '../../../../models/invoicing/invoice';
import { Ticket } from '../../../../models/invoicing/ticket';
import { QuestDatePipe } from '../../../../pipes/quest-date.pipe';
import { QuestPricePipe } from '../../../../pipes/quest-price.pipe';

@Component({
  selector: 'app-payment-grid-field',
  standalone: true,
  imports: [
    AocGridModule,
    AocDirectivesModule
  ],
  template: `
    <aoc-grid-field
      [modelConfig]="modelConfig"
      [columns]="columns"
      [dynamicFormGroupConfig]="aocDynFormGroup"
      (modelChange)="calculateAocDynFormGroup()"
    ></aoc-grid-field>
  `
})
export class PaymentGridComponentField implements OnInit {
  protected modelConfig = inject(PaymentModelConfig);

  protected columns: AocGridColumn<Payment>[];
  protected aocDynFormGroup: AocDynFormGroup<Payment>;


  private datePipe = inject(QuestDatePipe);
  private pricePipe = inject(QuestPricePipe);
  private aocFormController = inject(AocFormController<Invoice | Ticket>);
  private ngControl = inject(NgControl);

  ngOnInit() {
    this.columns = [
      {
        header: 'Date',
        display: [ Payment.field.DATE, this.datePipe ],
        size: '7rem',
        defaultSort: 'desc'
      },
      {
        header: 'Payment system',
        display: [ Payment.entity.PAYMENT_SYSTEM, PaymentSystem.field.NAME ]
      },
      {
        header: 'Quantity',
        display: [ Payment.field.QUANTITY, this.pricePipe ],
        size: '7rem',
        align: 'right'
      }
    ];
    this.aocFormController.patched().then(() => {
      this.calculateAocDynFormGroup();
      this.aocFormController.getFormGroup().controls.total.valueChanges.subscribe(total => {
        this.calculateAocDynFormGroup()
      })
    });
  }

  protected calculateAocDynFormGroup() {
    const currentPayments: Payment[] = this.ngControl.control.value;
    let acc = currentPayments.reduce((acc, payment) => acc.plus(payment.quantity), Big(0));
    this.aocDynFormGroup = {
      quantity: { value: Big(this.aocFormController.getFormGroup().controls.total.value).sub(acc).toString(), state: 'enabled' }
    }
  }
}

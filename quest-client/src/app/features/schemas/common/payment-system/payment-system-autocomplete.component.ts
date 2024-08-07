import { Component, inject } from '@angular/core';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';
import { PaymentSystemModelConfig } from '../../../../model-configs/common/payment-system-model-config';
import { PaymentSystem } from '../../../../models/common/payment-system';

@Component({
  selector: 'app-payment-system-autocomplete',
  standalone: true,
  imports: [
    AocAutocompleteModule
  ],
  template: `<aoc-autocomplete [modelConfig]="modelConfig" [restOptions]="restOptions"></aoc-autocomplete>`
})
export class PaymentSystemAutocompleteComponent {
  protected modelConfig = inject(PaymentSystemModelConfig);
  protected restOptions: AocRestOptions<PaymentSystem> = {
    orderBy: { name: 'asc' }
  };
}

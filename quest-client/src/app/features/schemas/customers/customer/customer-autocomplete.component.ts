import { Component, inject } from '@angular/core';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';
import { CustomerModelConfig } from '../../../../model-configs/customers/customer-model-config';
import { Customer } from '../../../../models/customers/customer';

@Component({
  selector: 'app-customer-autocomplete',
  standalone: true,
  imports: [
    AocAutocompleteModule
  ],
  template: `
    <aoc-autocomplete [modelConfig]="modelConfig" [restOptions]="restOptions"></aoc-autocomplete>
  `
})
export class CustomerAutocompleteComponent {
  protected modelConfig = inject(CustomerModelConfig);
  protected restOptions: AocRestOptions<Customer> = {
    orderBy: { legalDataTemplate: { legal_name: 'asc' }}
  };
}

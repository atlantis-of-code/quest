import { Injectable } from '@angular/core';
import {
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigFormResolver,
  AocModelConfigPath,
  AocModelConfigClientPayload,
  AocModelConfigServerPayload
} from '@atlantis-of-code/aoc-client/core/configs';

import { Customer } from '../../models/customers/customer';

/*@Pipe({
  name: 'Customer',
  standalone: true
})*/
@Injectable({
  providedIn: 'root'
})
export class CustomerModelConfig extends AocModelConfig<Customer> {
  constructor() {
    super(Customer);
  }

  // Default read, write, delete and clone permissions
  readonly allow: AocModelConfigAllow = 'all';

  /*
   * Form options:
   * AocModelConfigFormatResolver: resolve form location by preprocessing information
   * AocModelConfigFormPath: route path to this model form
   * AocModelConfigFormImport: lazy loading import a form using its path (recommended)
   */
  readonly form: AocModelConfigFormResolver<Customer> | AocModelConfigPath | AocModelConfigFormImport;

  // Filter definition for payloads sent by grids and autocompletes
  // AocModelConfigClientPayload is used to define here the AocFilterQuery for a given payload search term
  // AocModelConfigServer if a server side filter or query builder must be used to filter for a given payload search term
  readonly payload: AocModelConfigClientPayload<Customer> | AocModelConfigServerPayload;

  /* This method is compatible with Angular Pipe, so the model config can be also used as a @Pipe
  override transform(customer: Customer): string {
    return customer?.toString() ?? '';
  }*/
}

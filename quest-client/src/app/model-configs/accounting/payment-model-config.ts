import { Injectable } from '@angular/core';
import {
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigAllowCheck,
  AocModelConfigFormImport,
  AocModelConfigFormResolver,
  AocModelConfigPath,
  AocModelConfigClientPayload,
  AocModelConfigServerPayload
} from '@atlantis-of-code/aoc-client/core/configs';

import { Payment } from '../../models/accounting/payment';

/*@Pipe({
  name: 'Payment',
  standalone: true
})*/
@Injectable({
  providedIn: 'root'
})
export class PaymentModelConfig extends AocModelConfig<Payment> {
  constructor() {
    super(Payment);
  }

  // Default read, write, delete and clone permissions
  readonly allow: AocModelConfigAllow = 'all';

  /*
   * Applies fine-grained permissions to the specified operation and model,
   * returning 'undefined' if the operation is allowed and a descriptive string message
   * if not permitted.
   */
  readonly allowCheck: AocModelConfigAllowCheck<Payment>;

  /*
   * Form options:
   * AocModelConfigFormatResolver: resolve form location by preprocessing information
   * AocModelConfigFormPath: route path to this model form
   * AocModelConfigFormImport: lazy loading import a form using its path (recommended)
   */
  readonly form: AocModelConfigFormResolver<Payment> | AocModelConfigPath | AocModelConfigFormImport = {
    loadComponent: () => import('../../features/schemas/accounting/payment/payment-form.component')
  };

  // Filter definition for payloads sent by grids and autocompletes
  // AocModelConfigClientPayload is used to define here the AocFilterQuery for a given payload search term
  // AocModelConfigServer if a server side filter or query builder must be used to filter for a given payload search term
  readonly payload: AocModelConfigClientPayload<Payment> | AocModelConfigServerPayload;

  /* This method is compatible with Angular Pipe, so the model config can be also used as a @Pipe
  override transform(payment: Payment): string {
    return payment?.toString() ?? '';
  }*/
}

import { Injectable } from '@angular/core';
import {
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigClientPayload,
  AocModelConfigFormImport,
  AocModelConfigFormResolver,
  AocModelConfigPath,
  AocModelConfigServerPayload, AocModelConfigSocketExtraSubscriptions
} from '@atlantis-of-code/aoc-client/core/configs';
import { Payment } from '../../models/accounting/payment';

import { Invoice } from '../../models/invoicing/invoice';
import { QuestDocumentPipe } from '../../pipes/quest-document.pipe';

/*@Pipe({
  name: 'Invoice',
  standalone: true
})*/
@Injectable({
  providedIn: 'root'
})
export class InvoiceModelConfig extends AocModelConfig<Invoice> {
  constructor(
    private questDocumentPipe: QuestDocumentPipe
  ) {
    super(Invoice);
  }

  // Default read, write, delete and clone permissions
  readonly allow: AocModelConfigAllow = 'all';

  /*
   * Form options:
   * AocModelConfigFormatResolver: resolve form location by preprocessing information
   * AocModelConfigFormPath: route path to this model form
   * AocModelConfigFormImport: lazy loading import a form using its path (recommended)
   */
  readonly form: AocModelConfigFormResolver<Invoice> | AocModelConfigPath | AocModelConfigFormImport = {
    loadComponent: () => import('../../features/schemas/invoicing/invoice/invoice-form.component'),
  };

  // Filter definition for payloads sent by grids and autocompletes
  // AocModelConfigClientPayload is used to define here the AocFilterQuery for a given payload search term
  // AocModelConfigServer if a server side filter or query builder must be used to filter for a given payload search term
  readonly payload: AocModelConfigClientPayload<Invoice> | AocModelConfigServerPayload = p => {
    return {
      $or: [
        { number: { $startsWithNumber: p }},
        { customer: { trade_name: { $aWordStartsWith: p }}},
        { customer: { legalDataTemplate: { legal_name: { $aWordStartsWith: p }}}}
      ]
    }
  };

  readonly socketExtraSubscriptions: AocModelConfigSocketExtraSubscriptions = [ Payment ];

  /* This method is compatible with Angular Pipe, so the model config can be also used as a @Pipe*/
  override transform(invoice: Invoice): string {
    return this.questDocumentPipe.transform(invoice, true);
  }
}

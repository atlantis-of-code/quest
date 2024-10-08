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

import { Ticket } from '../../models/invoicing/ticket';
import { DocumentTemplate } from '../../models/templates/document-template';
import { QuestDocumentPipe } from '../../pipes/quest-document.pipe';

/*@Pipe({
  name: 'Ticket',
  standalone: true
})*/
@Injectable({
  providedIn: 'root'
})
export class TicketModelConfig extends AocModelConfig<Ticket> {
  constructor(
    private questDocumentPipe: QuestDocumentPipe
  ) {
    super(Ticket);
  }

  // Default read, write, delete and clone permissions
  readonly allow: AocModelConfigAllow = 'all';

  /*
   * Form options:
   * AocModelConfigFormatResolver: resolve form location by preprocessing information
   * AocModelConfigFormPath: route path to this model form
   * AocModelConfigFormImport: lazy loading import a form using its path (recommended)
   */
  readonly form: AocModelConfigFormResolver<Ticket> | AocModelConfigPath | AocModelConfigFormImport = {
    loadComponent: () => import('../../features/schemas/invoicing/ticket/ticket-form.component')
  };

  // Filter definition for payloads sent by grids and autocompletes
  // AocModelConfigClientPayload is used to define here the AocFilterQuery for a given payload search term
  // AocModelConfigServer if a server side filter or query builder must be used to filter for a given payload search term
  readonly payload: AocModelConfigClientPayload<Ticket> | AocModelConfigServerPayload;

  readonly socketExtraSubscriptions: AocModelConfigSocketExtraSubscriptions = [ Payment ];

  /* This method is compatible with Angular Pipe, so the model config can be also used as a @Pipe */
  override transform(ticket: Ticket): string {
    return this.questDocumentPipe.transform(ticket as DocumentTemplate, true);
  }
}

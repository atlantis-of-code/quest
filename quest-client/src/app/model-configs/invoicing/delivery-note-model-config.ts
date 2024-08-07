import { Injectable } from '@angular/core';
import {
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigClientPayload,
  AocModelConfigFormImport,
  AocModelConfigFormResolver,
  AocModelConfigPath,
  AocModelConfigServerPayload
} from '@atlantis-of-code/aoc-client/core/configs';
import { AocRestService } from '@atlantis-of-code/aoc-client/core/services';
import { AocUiToastMessageService } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-toast';

import { DeliveryNote } from '../../models/invoicing/delivery-note';
import { QuestDocumentPipe } from '../../pipes/quest-document.pipe';
import { InvoiceModelConfig } from './invoice-model-config';

/*@Pipe({
  name: 'DeliveryNote',
  standalone: true
})*/
@Injectable({
  providedIn: 'root'
})
export class DeliveryNoteModelConfig extends AocModelConfig<DeliveryNote> {
  constructor(
    private questDocumentPipe: QuestDocumentPipe,
    private aocRestService: AocRestService,
    private invoiceModelConfig: InvoiceModelConfig,
    private aocUiToastMessageService: AocUiToastMessageService
  ) {
    super(DeliveryNote);
  }

  // Default read, write, delete and clone permissions
  readonly allow: AocModelConfigAllow = ['add', 'edit', 'delete'];

  /*
   * Form options:
   * AocModelConfigFormatResolver: resolve form location by preprocessing information
   * AocModelConfigFormPath: route path to this model form
   * AocModelConfigFormImport: lazy loading import a form using its path (recommended)
   */
  readonly form: AocModelConfigFormResolver<DeliveryNote> | AocModelConfigPath | AocModelConfigFormImport = new AocModelConfigFormResolver(async modelOrId => {
    let deliveryNote: DeliveryNote = undefined;
    if (modelOrId instanceof DeliveryNote) {
      deliveryNote = modelOrId;
    } else if (typeof modelOrId === 'string') {
      deliveryNote = await this.aocRestService.findOne(DeliveryNote, { id: modelOrId });
    }
    if (+deliveryNote?.invoice?.id > 0) {
      this.aocUiToastMessageService.showWarning('Delivery note in already invoiced, can only be edited inside the associated invoice');
      return { form: this.invoiceModelConfig.form, modelOrId: deliveryNote.invoice.id };
    }
    return {
      form: {
        loadComponent: () => import('../../features/schemas/invoicing/delivery-note/delivery-note-form.component')
      },
      modelOrId: deliveryNote
    }
  });

  // Filter definition for payloads sent by grids and autocompletes
  // AocModelConfigClientPayload is used to define here the AocFilterQuery for a given payload search term
  // AocModelConfigServer if a server side filter or query builder must be used to filter for a given payload search term
  readonly payload: AocModelConfigClientPayload<DeliveryNote> | AocModelConfigServerPayload;

  /* This method is compatible with Angular Pipe, so the model config can be also used as a @Pipe*/
  override transform(deliveryNote: DeliveryNote): string {
    return this.questDocumentPipe.transform(deliveryNote);
  }
}

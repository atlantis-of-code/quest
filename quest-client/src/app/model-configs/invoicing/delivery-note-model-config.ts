import { Injectable } from '@angular/core';
import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigFormResolver,
  AocModelConfigName,
  AocModelConfigPath,
  AocModelConfigClientPayload,
  AocModelConfigServerPayload
} from '@atlantis-of-code/aoc-client/core/configs';

import { DeliveryNote } from '../../models/invoicing/delivery-note';

@Injectable({
  providedIn: 'root'
})
export class DeliveryNoteModelConfig extends AocModelConfig<DeliveryNote> {
  constructor() {
    super(DeliveryNote);
  }

  readonly name: AocModelConfigName = {
    singular: 'delivery note',
    plural: 'delivery notes',
    gender: AocGender.Masculine
  };

  // Default read, write, delete and clone permissions
  readonly allow: AocModelConfigAllow = 'all';

  /*
   * Form options:
   * AocModelConfigFormatResolver: resolve form location by preprocessing information
   * AocModelConfigFormPath: route path to this model form
   * AocModelConfigFormImport: lazy loading import a form using its path (recommended)
   */
  readonly form: AocModelConfigFormResolver<DeliveryNote> | AocModelConfigPath | AocModelConfigFormImport;

  // Filter definition for payloads sent by grids and autocompletes
  // AocModelConfigClientPayload is used to define here the AocFilterQuery for a given payload search term
  // AocModelConfigServer if a server side filter or query builder must be used to filter for a given payload search term
  readonly payload: AocModelConfigClientPayload<DeliveryNote> | AocModelConfigServerPayload;

  // This method is compatible with Angular Pipe, so the model config can be also used as a @Pipe
  transform(deliveryNote: DeliveryNote): string {
    return deliveryNote?.toString() ?? '';
  }
}

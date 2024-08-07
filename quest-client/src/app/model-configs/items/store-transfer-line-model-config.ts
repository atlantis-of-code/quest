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

import { StoreTransferLine } from '../../models/items/store-transfer-line';

/*@Pipe({
  name: 'StoreTransferLine',
  standalone: true
})*/
@Injectable({
  providedIn: 'root'
})
export class StoreTransferLineModelConfig extends AocModelConfig<StoreTransferLine> {
  constructor() {
    super(StoreTransferLine);
  }

  // Default read, write, delete and clone permissions
  readonly allow: AocModelConfigAllow = 'all';

  /*
   * Form options:
   * AocModelConfigFormatResolver: resolve form location by preprocessing information
   * AocModelConfigFormPath: route path to this model form
   * AocModelConfigFormImport: lazy loading import a form using its path (recommended)
   */
  readonly form: AocModelConfigFormResolver<StoreTransferLine> | AocModelConfigPath | AocModelConfigFormImport;

  // Filter definition for payloads sent by grids and autocompletes
  // AocModelConfigClientPayload is used to define here the AocFilterQuery for a given payload search term
  // AocModelConfigServer if a server side filter or query builder must be used to filter for a given payload search term
  readonly payload: AocModelConfigClientPayload<StoreTransferLine> | AocModelConfigServerPayload;

  /* This method is compatible with Angular Pipe, so the model config can be also used as a @Pipe
  override transform(storeTransferLine: StoreTransferLine): string {
    return storeTransferLine?.toString() ?? '';
  }*/
}
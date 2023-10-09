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

import { StreetSuffix } from '../../models/common/street-suffix';

@Injectable({
  providedIn: 'root'
})
export class StreetSuffixModelConfig extends AocModelConfig<StreetSuffix> {
  constructor() {
    super(StreetSuffix);
  }

  // Default read, write, delete and clone permissions
  readonly allow: AocModelConfigAllow = 'all';

  /*
   * Form options:
   * AocModelConfigFormatResolver: resolve form location by preprocessing information
   * AocModelConfigFormPath: route path to this model form
   * AocModelConfigFormImport: lazy loading import a form using its path (recommended)
   */
  readonly form: AocModelConfigFormResolver<StreetSuffix> | AocModelConfigPath | AocModelConfigFormImport;

  // Filter definition for payloads sent by grids and autocompletes
  // AocModelConfigClientPayload is used to define here the AocFilterQuery for a given payload search term
  // AocModelConfigServer if a server side filter or query builder must be used to filter for a given payload search term
  readonly payload: AocModelConfigClientPayload<StreetSuffix> | AocModelConfigServerPayload = p => {
    return {
      $or: [
        { abbrv: { $startsWith: p }},
        { name: { $startsWith: p }}
      ]
    }
  };

  // This method is compatible with Angular Pipe, so the model config can be also used as a @Pipe
  transform(streetSuffix: StreetSuffix): string {
    return streetSuffix?.toString() ?? '';
  }
}

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

import { Gender } from '../../models/common/gender';

@Injectable({
  providedIn: 'root'
})
export class GenderModelConfig extends AocModelConfig<Gender> {
  constructor() {
    super(Gender);
  }

  // Default read, write, delete and clone permissions
  readonly allow: AocModelConfigAllow = 'none';

  /*
   * Form options:
   * AocModelConfigFormatResolver: resolve form location by preprocessing information
   * AocModelConfigFormPath: route path to this model form
   * AocModelConfigFormImport: lazy loading import a form using its path (recommended)
   */
  readonly form: AocModelConfigFormResolver<Gender> | AocModelConfigPath | AocModelConfigFormImport;

  // Filter definition for payloads sent by grids and autocompletes
  // AocModelConfigClientPayload is used to define here the AocFilterQuery for a given payload search term
  // AocModelConfigServer if a server side filter or query builder must be used to filter for a given payload search term
  readonly payload: AocModelConfigClientPayload<Gender> | AocModelConfigServerPayload;

  // This method is compatible with Angular Pipe, so the model config can be also used as a @Pipe
  transform(gender: Gender): string {
    return gender?.toString() ?? '';
  }
}

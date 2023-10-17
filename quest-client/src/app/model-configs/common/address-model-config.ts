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

import { Address } from '../../models/common/address';

/*@Pipe({
  name: 'Address',
  standalone: true
})*/
@Injectable({
  providedIn: 'root'
})
export class AddressModelConfig extends AocModelConfig<Address> {
  constructor() {
    super(Address);
  }

  // Default read, write, delete and clone permissions
  readonly allow: AocModelConfigAllow = 'all';

  /*
   * Form options:
   * AocModelConfigFormatResolver: resolve form location by preprocessing information
   * AocModelConfigFormPath: route path to this model form
   * AocModelConfigFormImport: lazy loading import a form using its path (recommended)
   */
  readonly form: AocModelConfigFormResolver<Address> | AocModelConfigPath | AocModelConfigFormImport;

  // Filter definition for payloads sent by grids and autocompletes
  // AocModelConfigClientPayload is used to define here the AocFilterQuery for a given payload search term
  // AocModelConfigServer if a server side filter or query builder must be used to filter for a given payload search term
  readonly payload: AocModelConfigClientPayload<Address> | AocModelConfigServerPayload;

  /* This method is compatible with Angular Pipe, so the model config can be also used as a @Pipe
  override transform(address: Address): string {
    return address?.toString() ?? '';
  }*/
}

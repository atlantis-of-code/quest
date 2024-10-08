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

import { Country } from '../../models/common/country';

/*@Pipe({
  name: 'Country',
  standalone: true
})*/
@Injectable({
  providedIn: 'root'
})
export class CountryModelConfig extends AocModelConfig<Country> {
  constructor() {
    super(Country);
  }

  // Default read, write, delete and clone permissions
  readonly allow: AocModelConfigAllow = 'all';

  /*
   * Form options:
   * AocModelConfigFormatResolver: resolve form location by preprocessing information
   * AocModelConfigFormPath: route path to this model form
   * AocModelConfigFormImport: lazy loading import a form using its path (recommended)
   */
  readonly form: AocModelConfigFormResolver<Country> | AocModelConfigPath | AocModelConfigFormImport = {
    loadComponent: () => import('../../features/schemas/common/country/country-form.component')
  };

  // Filter definition for payloads sent by grids and autocompletes
  // AocModelConfigClientPayload is used to define here the AocFilterQuery for a given payload search term
  // AocModelConfigServer if a server side filter or query builder must be used to filter for a given payload search term
  readonly payload: AocModelConfigClientPayload<Country> | AocModelConfigServerPayload = payload => {
    return {
      $or: [
        { name: { $aWordStartsWith: payload }},
        { iso_code2: { $startsWith: payload }},
        { iso_code3: { $startsWith: payload }}
      ]
    }
  };

  /* This method is compatible with Angular Pipe, so the model config can be also used as a @Pipe
  override transform(country: Country): string {
    return country?.toString() ?? '';
  }*/
}

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

import { IdentityDocumentType } from '../../models/common/identity-document-type';

/*@Pipe({
  name: 'IdentityDocumentType',
  standalone: true
})*/
@Injectable({
  providedIn: 'root'
})
export class IdentityDocumentTypeModelConfig extends AocModelConfig<IdentityDocumentType> {
  constructor() {
    super(IdentityDocumentType);
  }

  // Default read, write, delete and clone permissions
  readonly allow: AocModelConfigAllow = 'none';

  /*
   * Form options:
   * AocModelConfigFormatResolver: resolve form location by preprocessing information
   * AocModelConfigFormPath: route path to this model form
   * AocModelConfigFormImport: lazy loading import a form using its path (recommended)
   */
  readonly form: AocModelConfigFormResolver<IdentityDocumentType> | AocModelConfigPath | AocModelConfigFormImport = {
    loadComponent: () => import('../../features/schemas/common/identity-document-type/identity-document-type-form.component')
  };

  // Filter definition for payloads sent by grids and autocompletes
  // AocModelConfigClientPayload is used to define here the AocFilterQuery for a given payload search term
  // AocModelConfigServer if a server side filter or query builder must be used to filter for a given payload search term
  readonly payload: AocModelConfigClientPayload<IdentityDocumentType> | AocModelConfigServerPayload = payload => {
    return {
      name: { $startsWith: payload }
    }
  };

  /* This method is compatible with Angular Pipe, so the model config can be also used as a @Pipe
  override transform(identityDocumentType: IdentityDocumentType): string {
    return identityDocumentType?.toString() ?? '';
  }*/
}

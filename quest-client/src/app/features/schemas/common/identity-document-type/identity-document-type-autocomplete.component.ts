import { Component } from '@angular/core';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';
import { IdentityDocumentTypeModelConfig } from '../../../../model-configs/common/identity-document-type-model-config';
import { IdentityDocumentType } from '../../../../models/common/identity-document-type';

@Component({
  selector: 'app-identity-document-type-autocomplete',
  standalone: true,
  imports: [
    AocAutocompleteModule
  ],
  template: `
    <aoc-autocomplete [modelConfig]="modelConfig" [restOptions]="restOptions"></aoc-autocomplete>
  `
})
export class IdentityDocumentTypeAutocompleteComponent {
  restOptions: AocRestOptions<IdentityDocumentType> = {
    orderBy: {
      name: 'desc'
    }
  }
  constructor(
    protected modelConfig: IdentityDocumentTypeModelConfig
  ) {}
}

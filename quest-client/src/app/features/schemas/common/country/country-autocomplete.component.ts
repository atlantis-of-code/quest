import { Component } from '@angular/core';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';
import { CountryModelConfig } from '../../../../model-configs/common/country-model-config';
import { Country } from '../../../../models/common/country';

@Component({
  selector: 'app-country-autocomplete',
  standalone: true,
  imports: [
    AocAutocompleteModule
  ],
  template: `
    <aoc-autocomplete [modelConfig]="modelConfig" [restOptions]="restOptions"></aoc-autocomplete>
  `
})
export class CountryAutocompleteComponent {
  restOptions: AocRestOptions<Country> = {
    orderBy: { name: 'desc' }
  };

  constructor(
    protected modelConfig: CountryModelConfig
  ) {}
}

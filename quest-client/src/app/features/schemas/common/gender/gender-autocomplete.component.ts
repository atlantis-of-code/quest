import {Component} from '@angular/core';
import {AocRestOptions} from '@atlantis-of-code/aoc-client/aoc-common';
import {Gender} from '../../../../models/common/gender';
import {GenderModelConfig} from '../../../../model-configs/common/gender-model-config';
import {AocAutocompleteModule} from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';

@Component({
  selector: 'app-gender-autocomplete',
  standalone: true,
  imports: [
    AocAutocompleteModule
  ],
  template: `
    <aoc-autocomplete [modelConfig]="modelConfig" [restOptions]="restOptions"></aoc-autocomplete>
  `
})
export class GenderAutocompleteComponent {
  protected restOptions: AocRestOptions<Gender> = {
    orderBy: {
      name: 'asc'
    }
  };

  constructor(protected modelConfig: GenderModelConfig) {}
}

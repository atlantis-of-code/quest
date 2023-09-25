import {Component} from '@angular/core';
import {AocRestOptions} from '@atlantis-of-code/aoc-client/aoc-common';
import {Language} from '../../../../models/common/language';
import {LanguageModelConfig} from '../../../../model-configs/common/language-model-config';
import {AocAutocompleteModule} from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';

@Component({
  selector: 'app-language-autocomplete',
  standalone: true,
  imports: [
    AocAutocompleteModule
  ],
  template: `
    <aoc-autocomplete [modelConfig]="modelConfig" [restOptions]="restOptions"></aoc-autocomplete>
  `
})
export class LanguageAutocompleteComponent {
  protected restOptions: AocRestOptions<Language> = {
    orderBy: {
      name: 'asc'
    }
  };

  constructor(protected modelConfig: LanguageModelConfig) {}
}

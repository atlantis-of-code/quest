import { Component, Input } from '@angular/core';
import { SubsectorModelConfig } from '../../../../model-configs/common/subsector-model-config';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Subsector } from '../../../../models/common/subsector';
import { AocModelListener } from '@atlantis-of-code/aoc-client/core/utils';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';

@Component({
  selector: 'app-subsector-select',
  standalone: true,
  imports: [
    AocAutocompleteModule
  ],
  template: `
    <aoc-autocomplete
      [modelConfig]="modelConfig"
      [restOptions]="restOptions"
      [optionsPerPage]="15"
      [modelListener]="aocListener"
    ></aoc-autocomplete>
  `
})
export class SubsectorSelectComponent {
  @Input() aocListener: AocModelListener<Subsector>;

  restOptions: AocRestOptions<Subsector> = {
    orderBy: {
      nombre: 'asc'
    }
  };

  constructor(
    public modelConfig: SubsectorModelConfig
  ) { }
}

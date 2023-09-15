import { Component } from '@angular/core';
import { DenominacionViaModelConfig } from '../../../../model-configs/common/denominacion-via-model-config';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { DenominacionVia } from '../../../../models/common/denominacion-via';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';

@Component({
  selector: 'app-denominacion-via-select',
  standalone: true,
  imports: [
    AocAutocompleteModule
  ],
  template: `
    <aoc-autocomplete
      [modelConfig]="modelConfig"
      [restOptions]="restOptions"
    ></aoc-autocomplete>
  `
})
export class DenominacionViaSelectComponent {
  restOptions: AocRestOptions<DenominacionVia> = {
    orderBy: {
      nombre: 'asc'
    }
  };
  constructor(
    public modelConfig: DenominacionViaModelConfig
  ) { }
}

import { Component } from '@angular/core';
import { PaisModelConfig } from '../../../../model-configs/common/pais-model-config';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Pais } from '../../../../models/common/pais';
import { AocUiDisplay } from '@atlantis-of-code/aoc-client/ui/common/types';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';

@Component({
  selector: 'app-pais-select',
  standalone: true,
  imports: [
    AocAutocompleteModule
  ],
  template: `
    <aoc-autocomplete
      [modelConfig]="modelConfig"
      [restOptions]="restOptions"
      [display]="display"
    ></aoc-autocomplete>
  `
})
export class PaisSelectComponent {
  display: AocUiDisplay = Pais.field.NOMBRE;

  restOptions: AocRestOptions<Pais> = {
    orderBy: {
      nombre: 'asc'
    }
  };

  constructor(
    public modelConfig: PaisModelConfig
  ) { }
}

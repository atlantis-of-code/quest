import { Component } from '@angular/core';
import { TecnicoModelConfig } from '../../../../model-configs/tecnicos/tecnico-model-config';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Tecnico } from '../../../../models/tecnicos/tecnico';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';

@Component({
  selector: 'app-tecnico-select',
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
export class TecnicoSelectComponent {
  restOptions: AocRestOptions<Tecnico> = {
    orderBy: {
      nombre_fiscal: 'asc',
      apellido_1: 'asc',
      apellido_2: 'asc'
    }
  }

  constructor(
    public modelConfig: TecnicoModelConfig
  ) { }
}

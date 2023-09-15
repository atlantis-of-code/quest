import { Component } from '@angular/core';
import { VehiculoModelConfig } from '../../../../model-configs/tecnicos/vehiculo-model-config';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Vehiculo } from '../../../../models/tecnicos/vehiculo';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';

@Component({
  selector: 'app-vehiculo-select',
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
export class VehiculoSelectComponent {
  restOptions: AocRestOptions<Vehiculo> = {
    orderBy: {
      nombre: 'asc'
    }
  };

  constructor(
    public modelConfig: VehiculoModelConfig
  ) { }
}

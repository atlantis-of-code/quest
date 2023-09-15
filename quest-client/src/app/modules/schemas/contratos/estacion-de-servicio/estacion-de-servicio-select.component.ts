import { Component } from '@angular/core';
import {
  EstacionDeServicioModelConfig
} from '../../../../model-configs/contratos/estacion-de-servicio-model-config';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { EstacionDeServicio } from '../../../../models/contratos/estacion-de-servicio';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';

@Component({
  selector: 'app-estacion-de-servicio-select',
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
export class EstacionDeServicioSelectComponent {
  restOptions: AocRestOptions<EstacionDeServicio> = {
    orderBy: {
      codigo: 'asc'
    }
  };

  constructor(
    public modelConfig: EstacionDeServicioModelConfig
  ) { }
}

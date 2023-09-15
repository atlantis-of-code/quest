import { Component } from '@angular/core';
import { AlmacenGasModelConfig } from '../../../../model-configs/configuracion/almacen-gas-model-config';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AlmacenGas } from '../../../../models/configuracion/almacen-gas';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';

@Component({
  selector: 'app-almacen-gas-select',
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
export class AlmacenGasSelectComponent {
  restOptions: AocRestOptions<AlmacenGas> = {
    orderBy: {
      codigo: 'asc'
    }
  };

  constructor(
    public modelConfig: AlmacenGasModelConfig
  ) { }
}

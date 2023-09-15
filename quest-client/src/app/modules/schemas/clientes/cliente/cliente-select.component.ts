import { Component } from '@angular/core';
import { ClienteModelConfig } from '../../../../model-configs/clientes/cliente-model-config';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Cliente } from '../../../../models/clientes/cliente';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';

@Component({
  selector: 'app-cliente-select',
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
export class ClienteSelectComponent {
  restOptions: AocRestOptions<Cliente> = {
    orderBy: {
      embDatosFiscales: {
        nombre_fiscal: 'asc',
        apellido_1: 'asc',
        apellido_2: 'asc'
      }
    }
  }

  constructor(
    public modelConfig: ClienteModelConfig
  ) { }
}

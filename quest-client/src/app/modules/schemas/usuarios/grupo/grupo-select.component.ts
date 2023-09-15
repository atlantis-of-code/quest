import { Component } from '@angular/core';
import { GrupoModelConfig } from '../../../../model-configs/usuarios/grupo-model-config';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Grupo } from '../../../../models/usuarios/grupo';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';

@Component({
  standalone: true,
  selector: 'app-grupo-select',
  imports: [
    AocAutocompleteModule
  ],
  template: `
    <aoc-autocomplete [modelConfig]="modelConfig" [restOptions]="restOptions"></aoc-autocomplete>`
})
export class GrupoSelectComponent {
  protected restOptions: AocRestOptions<Grupo> = {
    orderBy: {
      nombre: 'asc'
    }
  };
  constructor(
    protected modelConfig: GrupoModelConfig
  ) {}
}

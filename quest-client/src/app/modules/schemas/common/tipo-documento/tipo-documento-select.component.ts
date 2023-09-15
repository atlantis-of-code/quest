import { Component } from '@angular/core';
import { TipoDocumentoModelConfig } from '../../../../model-configs/common/tipo-documento-model-config';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { TipoDocumento } from '../../../../models/common/tipo-documento';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';

@Component({
  selector: 'app-tipo-documento-select',
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
export class TipoDocumentoSelectComponent {
  restOptions: AocRestOptions<TipoDocumento> = {
    orderBy: {
      nombre: 'asc'
    }
  };

  constructor(
    public modelConfig: TipoDocumentoModelConfig
  ) { }
}

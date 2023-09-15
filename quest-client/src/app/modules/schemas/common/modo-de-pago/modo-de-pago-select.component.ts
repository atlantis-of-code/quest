import { Component } from '@angular/core';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { ModoDePago } from '../../../../models/common/modo-de-pago';
import { ModoDePagoModelConfig } from '../../../../model-configs/common/modo-de-pago-model-config';

@Component({
  selector: 'app-modo-de-pago-select',
  standalone: true,
  imports: [ AocAutocompleteModule ],
  template: `
    <aoc-autocomplete [modelConfig]="modelConfig" [restOptions]="restOptions"></aoc-autocomplete>`
})
export class ModoDePagoSelectComponent {
  restOptions: AocRestOptions<ModoDePago> = { orderBy: { nombre: 'asc' }};

  constructor(protected modelConfig: ModoDePagoModelConfig) { }
}

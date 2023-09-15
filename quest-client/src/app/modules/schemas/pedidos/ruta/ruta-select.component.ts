import { Component, Input, OnInit } from '@angular/core';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Ruta } from '../../../../models/pedidos/ruta';
import { RutaModelConfig } from '../../../../model-configs/pedidos/ruta-model-config';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';
import { AocModelConfigAllow } from '@atlantis-of-code/aoc-client/core/configs';

@Component({
  standalone: true,
  selector: 'app-ruta-select',
  imports: [
    AocAutocompleteModule
  ],
  template: `
    <aoc-autocomplete [modelConfig]="modelConfig" [restOptions]="restOptions" [placeholder]="placeholder"></aoc-autocomplete>
  `
})
export class RutaSelectComponent implements OnInit {
  @Input() placeholder: string;

  @Input() allow: AocModelConfigAllow;

  restOptions: AocRestOptions<Ruta> = {
    orderBy: {
      nombre: 'asc'
    }
  };

  constructor(protected modelConfig: RutaModelConfig) { }

  ngOnInit() {
    if (this.allow) {
      this.modelConfig = this.modelConfig.cloneWith({ allow: this.allow });
    }
  }
}

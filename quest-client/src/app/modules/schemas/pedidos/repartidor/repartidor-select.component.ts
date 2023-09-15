import { Component, Input, OnInit } from '@angular/core';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Repartidor } from '../../../../models/pedidos/repartidor';
import { RepartidorModelConfig } from '../../../../model-configs/pedidos/repartidor-model-config';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';
import { AocModelConfigAllow } from '@atlantis-of-code/aoc-client/core/configs';

@Component({
  standalone: true,
  selector: 'app-repartidor-select',
  imports: [ AocAutocompleteModule ],
  template: `
    <aoc-autocomplete [modelConfig]="modelConfig" [restOptions]="restOptions" [placeholder]="placeholder"></aoc-autocomplete>
  `
})
export class RepartidorSelectComponent implements OnInit {
  @Input() placeholder: string;

  @Input() allow: AocModelConfigAllow;

  restOptions: AocRestOptions<Repartidor> = {
    orderBy: {
      nombre_fiscal: 'asc',
      apellido_1: 'asc',
      apellido_2: 'asc'
    }
  };

  constructor(
    protected modelConfig: RepartidorModelConfig
  ) { }

  ngOnInit() {
    if (this.allow) {
      this.modelConfig = this.modelConfig.cloneWith({ allow: this.allow })
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ContratoModelConfig } from '../../../../model-configs/contratos/contrato-model-config';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Contrato } from '../../../../models/contratos/contrato';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';

@Component({
  standalone: true,
  selector: 'app-contrato-select',
  imports: [
    AocAutocompleteModule
  ],
  template: `
    <aoc-autocomplete [modelConfig]="modelConfig" [restOptions]="restOptions"></aoc-autocomplete>
  `
})
export class ContratoSelectComponent implements OnInit {
  @Input() populateBombonas = false;

  restOptions: AocRestOptions<Contrato> = {
    orderBy: {
      fecha_alta: 'desc',
      numero_poliza: 'desc'
    },
    populate: {
      cliente: true
    }
  };

  constructor(protected modelConfig: ContratoModelConfig) {}

  ngOnInit() {
    if (this.populateBombonas) {
      this.restOptions.populate.contratoBombonaCollection = {
        bombona: true
      };
      this.restOptions.populate.descuentoCollection = true;
    }
  }
}

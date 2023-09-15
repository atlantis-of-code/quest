import { Component, OnInit } from '@angular/core';
import { AnyoFiscalModelConfig } from '../../../../model-configs/common/anyo-fiscal-model-config';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AnyoFiscal } from '../../../../models/common/anyo-fiscal';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';

@Component({
  selector: 'app-anyo-fiscal-select',
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
export class AnyoFiscalSelectComponent implements OnInit {
  restOptions: AocRestOptions<AnyoFiscal> = {
    orderBy: {
      anyo: 'desc'
    }
  };

  constructor(
    public modelConfig: AnyoFiscalModelConfig
  ) { }

  ngOnInit(): void {
    this.modelConfig = this.modelConfig.cloneWith({allow: 'none'});
  }
}

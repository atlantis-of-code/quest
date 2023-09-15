import { Component, Input, OnInit } from '@angular/core';
import { AlbaranModelConfig } from '../../../../model-configs/facturacion/albaran-model-config';
import { AocFilterQuery, AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Albaran } from '../../../../models/facturacion/albaran';
import { AocModelListener } from '@atlantis-of-code/aoc-client/core/utils';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';

@Component({
  selector: 'app-albaran-select',
  standalone: true,
  imports: [
    AocAutocompleteModule
  ],
  template: `
    <aoc-autocomplete
      [modelConfig]="modelConfig"
      [restOptions]="restOptions"
      [modelListener]="listener"
      [where]="where"
    ></aoc-autocomplete>
  `
})
export class AlbaranSelectComponent implements OnInit {
  @Input() listener: AocModelListener<Albaran>;

  @Input() where: AocFilterQuery<Albaran>;

  @Input() restOptions: AocRestOptions<Albaran>;

  constructor(
    public modelConfig: AlbaranModelConfig
  ) { }

  ngOnInit() {
    this.modelConfig = this.modelConfig.cloneWith({allow: 'none'})
  }
}

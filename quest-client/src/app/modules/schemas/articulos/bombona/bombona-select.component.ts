import { Component, Input, OnInit } from '@angular/core';
import { BombonaModelConfig } from '../../../../model-configs/articulos/bombona-model-config';
import { AocFilterQuery, AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Bombona } from '../../../../models/articulos/bombona';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';

@Component({
  selector: 'app-bombona-select',
  standalone: true,
  imports: [
    AocAutocompleteModule
  ],
  template: `
    <aoc-autocomplete
      [modelConfig]="modelConfig"
      [restOptions]="restOptions"
      [where]="where"
      [placeholder]="placeholder"
      [optionsPerPage]="20"
    ></aoc-autocomplete>

  `
})
export class BombonaSelectComponent implements OnInit {
  @Input() revokePermissions = false;

  @Input() where: AocFilterQuery<Bombona>;

  @Input() placeholder: string;

  restOptions: AocRestOptions<Bombona> = {
    orderBy: {
      codigo_maverma: 'asc'
    }
  };

  constructor(
    public modelConfig: BombonaModelConfig
  ) { }

  ngOnInit(): void {
    if (this.revokePermissions) {
      this.modelConfig = this.modelConfig.cloneWith({allow: 'none'});
    }
  }
}

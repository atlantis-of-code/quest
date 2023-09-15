import { Component, Input, OnInit } from '@angular/core';
import { CategoriaModelConfig } from '../../../../model-configs/articulos/categoria-model-config';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Categoria } from '../../../../models/articulos/categoria';
import { AocModelConfigAllow } from '@atlantis-of-code/aoc-client/core/configs';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';

@Component({
  selector: 'app-categoria-select',
  standalone: true,
  imports: [
    AocAutocompleteModule
  ],
  template: `
    <aoc-autocomplete
      [modelConfig]="modelConfig"
      [restOptions]="restOptions"
      [placeholder]="placeholder"
    ></aoc-autocomplete>

  `
})
export class CategoriaSelectComponent implements OnInit {
  @Input() allow: AocModelConfigAllow;

  @Input() placeholder: string;

  restOptions: AocRestOptions<Categoria> = {
    orderBy: {
      nombre: 'asc'
    }
  }

  constructor(
    public modelConfig: CategoriaModelConfig
  ) { }

  ngOnInit() {
    if (this.allow) {
      this.modelConfig = this.modelConfig.cloneWith({allow: this.allow});
    }
  }
}

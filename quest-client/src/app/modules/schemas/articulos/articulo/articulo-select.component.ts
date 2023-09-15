import { Component, Input, OnInit } from '@angular/core';
import { ArticuloModelConfig } from '../../../../model-configs/articulos/articulo-model-config';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Articulo } from '../../../../models/articulos/articulo';
import { AocModelConfigAllow } from '@atlantis-of-code/aoc-client/core/configs';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';

@Component({
  selector: 'app-articulo-select',
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
export class ArticuloSelectComponent implements OnInit {
  @Input() allow: AocModelConfigAllow;

  @Input() placeholder: string;

  restOptions: AocRestOptions<Articulo> = {
    orderBy: {
      codigo: 'asc'
    },
    populate: {
      categoria: true
    }
  }

  constructor(
    public modelConfig: ArticuloModelConfig
  ) { }

  ngOnInit(): void {
    if (this.allow) {
      this.modelConfig = this.modelConfig.cloneWith({allow: this.allow});
    }
  }
}

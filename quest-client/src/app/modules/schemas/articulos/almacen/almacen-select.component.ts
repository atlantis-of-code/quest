import { Component, Input, OnInit } from '@angular/core';
import { AlmacenModelConfig } from '../../../../model-configs/articulos/almacen-model-config';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Almacen } from '../../../../models/articulos/almacen';
import { AocModelConfigAllow } from '@atlantis-of-code/aoc-client/core/configs';
import { AocModelEmitter, AocModelListener } from '@atlantis-of-code/aoc-client/core/utils';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';

@Component({
  selector: 'app-almacen-select',
  standalone: true,
  imports: [
    AocAutocompleteModule
  ],
  template: `
    <aoc-autocomplete
      [modelConfig]="modelConfig"
      [restOptions]="restOptions"
      [placeholder]="placeholder"
      [modelEmitter]="modelEmitter"
      [modelListener]="modelListener"
    ></aoc-autocomplete>
  `
})
export class AlmacenSelectComponent implements OnInit {
  @Input() allow: AocModelConfigAllow;

  @Input() placeholder: string;

  @Input() modelEmitter: AocModelEmitter<Almacen>;
  @Input() modelListener: AocModelListener<Almacen>;

  restOptions: AocRestOptions<Almacen> = {
    orderBy: {
      nombre: 'asc'
    }
  };

  constructor(
    public modelConfig: AlmacenModelConfig
  ) { }

  ngOnInit() {
    if (this.allow) {
      this.modelConfig = this.modelConfig.cloneWith({ allow: this.allow });
    }
  }
}

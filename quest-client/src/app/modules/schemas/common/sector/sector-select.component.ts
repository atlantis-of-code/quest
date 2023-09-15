import { Component, Input } from '@angular/core';
import { SectorModelConfig } from '../../../../model-configs/common/sector-model-config';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Sector } from '../../../../models/common/sector';
import { AocModelEmitter } from '@atlantis-of-code/aoc-client/core/utils';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';

@Component({
  selector: 'app-sector-select',
  standalone: true,
  imports: [
    AocAutocompleteModule
  ],
  template: `
    <aoc-autocomplete
      [modelConfig]="modelConfig"
      [restOptions]="restOptions"
      [modelEmitter]="aocEmitter"
    ></aoc-autocomplete>
  `
})
export class SectorSelectComponent {
  @Input()
  aocEmitter: AocModelEmitter<Sector>
  restOptions: AocRestOptions<Sector> = {
    orderBy: {
      nombre: 'asc'
    }
  };

  constructor(
    public modelConfig: SectorModelConfig
  ) { }
}

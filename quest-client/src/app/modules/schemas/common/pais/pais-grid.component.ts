import { Component, OnInit } from '@angular/core';
import { PaisModelConfig } from '../../../../model-configs/common/pais-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { Pais } from '../../../../models/common/pais';
import { AocUiWindowDynRef } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';

@Component({
  selector: 'app-pais-grid',
  standalone: true,
  imports: [
    AocGridModule
  ],
  template: `
    <aoc-grid
      [modelConfig]="modelConfig"
      [columns]="columns"
    ></aoc-grid>
  `
})
export default class PaisGridComponent implements OnInit {
  columns: AocGridColumn[];

  constructor(
    public modelConfig: PaisModelConfig,
    private aocUiWindowDynRef: AocUiWindowDynRef
  ) { }

  ngOnInit(): void {
    this.columns = [
      {
        header: 'Nombre',
        display: Pais.field.NOMBRE,
        defaultSort: 'asc'
      }
    ];
    this.aocUiWindowDynRef.header('Listado de países');
    this.aocUiWindowDynRef.show();
  }
}

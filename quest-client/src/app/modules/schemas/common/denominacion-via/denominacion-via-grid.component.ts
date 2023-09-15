import { Component, OnInit } from '@angular/core';
import { DenominacionViaModelConfig } from '../../../../model-configs/common/denominacion-via-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { DenominacionVia } from '../../../../models/common/denominacion-via';
import { AocUiWindowDynRef } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';

@Component({
  selector: 'app-denominacion-via-grid',
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
export default class DenominacionViaGridComponent implements OnInit {
  columns: AocGridColumn[];

  constructor(
    public modelConfig: DenominacionViaModelConfig,
    private aocUiWindowDynRef: AocUiWindowDynRef
  ) { }

  ngOnInit(): void {
    this.columns = [
      { header: 'Nombre del tipo de vía', display: DenominacionVia.field.NOMBRE, defaultSort: 'asc' }
    ];
    this.aocUiWindowDynRef.header('Listado de denominación de vías')
    this.aocUiWindowDynRef.show();
  }
}

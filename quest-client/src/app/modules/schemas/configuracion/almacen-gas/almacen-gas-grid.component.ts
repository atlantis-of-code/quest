import { Component, OnInit } from '@angular/core';
import { AlmacenGasModelConfig } from '../../../../model-configs/configuracion/almacen-gas-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { AlmacenGas } from '../../../../models/configuracion/almacen-gas';
import { AocUiWindowDynRef } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';

@Component({
  selector: 'app-almacen-grid',
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
export default class AlmacenGasGridComponent implements OnInit {
  columns: AocGridColumn[];

  constructor(
    public modelConfig: AlmacenGasModelConfig,
    private aocWindowDynRef: AocUiWindowDynRef
  ) { }

  ngOnInit(): void {
    this.columns = [
      {
        header: 'Código',
        display: AlmacenGas.field.CODIGO,
        defaultSort: 'asc',
        size: '12rem'
      },
      {
        header: 'Nombre',
        display: AlmacenGas.field.NOMBRE
      }
    ];
    this.aocWindowDynRef.header('Almacenes');
    this.aocWindowDynRef.show();
  }
}

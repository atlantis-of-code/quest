import { Component, OnInit } from '@angular/core';
import { AocUiWindowDynRef } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { RutaModelConfig } from '../../../../model-configs/pedidos/ruta-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { Ruta } from '../../../../models/pedidos/ruta';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ruta-grid',
  template: `
    <aoc-grid
      [modelConfig]="modelConfig"
      [columns]="columns"
    ></aoc-grid>
  `,
  imports: [
    CommonModule,
    AocGridModule
  ],
  standalone: true
})
export default class RutaGridComponent implements OnInit {
  columns: AocGridColumn<Ruta>[] = [
    {
      header: 'Nombre',
      display: Ruta.field.NOMBRE,
      defaultSort: 'asc'
    }
  ]
  constructor(
    protected modelConfig: RutaModelConfig,
    private windowDynRef: AocUiWindowDynRef
  ) { }

  ngOnInit() {
    this.windowDynRef.header('Rutas');
    this.windowDynRef.show();
  }
}


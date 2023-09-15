import { Component, OnInit } from '@angular/core';
import { CategoriaModelConfig } from '../../../../model-configs/articulos/categoria-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { Categoria } from '../../../../models/articulos/categoria';
import { AocUiWindowDynRef } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';

@Component({
  selector: 'app-categoria-grid',
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
export default class CategoriaGridComponent implements OnInit {
  columns: AocGridColumn[];

  constructor(
    public modelConfig: CategoriaModelConfig,
    private aocUiWindowDynRef: AocUiWindowDynRef
  ) { }

  ngOnInit(): void {
    this.columns = [
      {
        header: 'Nombre',
        display: Categoria.field.NOMBRE,
        defaultSort: 'asc'
      }
    ];
    this.aocUiWindowDynRef.show();
  }
}

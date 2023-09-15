import { Component, Input, OnInit } from '@angular/core';
import { AlmacenModelConfig } from '../../../../model-configs/articulos/almacen-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { AocModelEmitter } from '@atlantis-of-code/aoc-client/core/utils';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { Almacen } from '../../../../models/articulos/almacen';

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
      [modelEmitter]="emitter"
    ></aoc-grid>

  `
})
export class AlmacenGridComponent implements OnInit {
  @Input() emitter: AocModelEmitter<Almacen>;

  columns: AocGridColumn<Almacen>[];

  constructor(
    public modelConfig: AlmacenModelConfig
  ) { }

  ngOnInit(): void {
    this.columns = [
      {
        header: 'Nombre',
        display: Almacen.field.NOMBRE,
        defaultSort: 'asc'
      }
    ];
  }
}

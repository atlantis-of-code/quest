import { Component, OnInit } from '@angular/core';
import { TraspasoEstocModelConfig } from '../../../../model-configs/articulos/traspaso-estoc-model-config';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { TraspasoEstoc } from '../../../../models/articulos/traspaso-estoc';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { FechaPipe } from '../../../../pipes/fecha.pipe';
import { Almacen } from '../../../../models/articulos/almacen';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';

@Component({
  selector: 'app-traspaso-estoc-grid',
  standalone: true,
  imports: [
    AocGridModule
  ],
  template: `
    <aoc-grid
      [modelConfig]="modelConfig"
      [restOptions]="restOptions"
      [columns]="columns"
    ></aoc-grid>
  `
})
export default class TraspasoEstocGridComponent implements OnInit {
  restOptions: AocRestOptions<TraspasoEstoc> = {
    populate: {
      almacenDestino: true,
      almacenOrigen: true
    }
  };

  columns: AocGridColumn[];

  constructor(
    public modelConfig: TraspasoEstocModelConfig,
    private fechaPipe: FechaPipe
  ) { }

  ngOnInit(): void {
    this.columns = [
      {
        header: 'Fecha',
        display: [TraspasoEstoc.field.FECHA, this.fechaPipe],
        size: '8rem',
        align: 'right'
      },
      {
        header: 'Almacén origen',
        display: [TraspasoEstoc.entity.ALMACEN_ORIGEN, Almacen.field.NOMBRE]
      },
      {
        header: 'Almacén origen',
        display: [TraspasoEstoc.entity.ALMACEN_DESTINO, Almacen.field.NOMBRE]
      }
    ];
  }
}

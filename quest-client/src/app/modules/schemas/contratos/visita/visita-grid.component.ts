import { Component, Input, OnInit } from '@angular/core';
import { VisitaModelConfig } from '../../../../model-configs/contratos/visita-model-config';
import { Visita } from '../../../../models/contratos/visita';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { FechaPipe } from '../../../../pipes/fecha.pipe';
import { AocModelListener } from '@atlantis-of-code/aoc-client/core/utils';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';

@Component({
  selector: 'app-visita-grid',
  standalone: true,
  imports: [
    AocGridModule
  ],
  template: `
    <aoc-grid
      [modelConfig]="modelConfig"
      [columns]="columns"
      [modelListener]="aocListener"
    ></aoc-grid>
  `
})
export class VisitaGridComponent implements OnInit {
  @Input() aocListener: AocModelListener<Visita>;

  columns: AocGridColumn[];

  constructor(
    public modelConfig: VisitaModelConfig,
    private fechaPipe: FechaPipe
  ) { }

  ngOnInit(): void {
    this.columns = [
      {
        header: 'Fecha',
        display: [Visita.field.FECHA, this.fechaPipe],
        size: '10rem',
        defaultSort: 'desc'
      },
      {
        header: 'Descripción',
        display: Visita.field.DESCRIPCION
      }
    ];
  }
}

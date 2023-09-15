import { Component, OnInit } from '@angular/core';
import { RevisionModelConfig } from '../../../../model-configs/contratos/revision-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { FechaPipe } from '../../../../pipes/fecha.pipe';
import { Revision } from '../../../../models/contratos/revision';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';

@Component({
  selector: 'app-revision-grid-field',
  standalone: true,
  imports: [
    AocGridModule
  ],
  template: `
    <aoc-grid-field
      [modelConfig]="modelConfig"
      [columns]="columns"
    ></aoc-grid-field>
  `
})
export class RevisionGridFieldComponent implements OnInit {
  columns: AocGridColumn[];

  constructor(
    public modelConfig: RevisionModelConfig,
    private fechaPipe: FechaPipe
  ) { }

  ngOnInit(): void {
    this.columns = [
      {
        header: 'Fecha',
        display: [Revision.field.FECHA, this.fechaPipe],
        defaultSort: 'desc',
        size: '10rem',
        align: 'right'
      },
      {
        header: 'Número',
        display: Revision.field.NUMERO,
        align: 'right'
      },
      {
        header: 'Tipo',
        display: Revision.field.TIPO
      },
      {
        header: 'Resultado',
        display: Revision.field.RESULTADO
      }
    ];
  }
}

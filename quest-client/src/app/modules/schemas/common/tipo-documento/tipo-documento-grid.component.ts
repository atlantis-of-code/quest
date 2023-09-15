import { Component, OnInit } from '@angular/core';
import { TipoDocumentoModelConfig } from '../../../../model-configs/common/tipo-documento-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { TipoDocumento } from '../../../../models/common/tipo-documento';
import { AocUiWindowDynRef } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';

@Component({
  selector: 'app-tipo-documento-grid',
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
export default class TipoDocumentoGridComponent implements OnInit {
  columns: AocGridColumn[];

  constructor(
    public modelConfig: TipoDocumentoModelConfig,
    private aocUiWindowDynRef: AocUiWindowDynRef
  ) { }

  ngOnInit(): void {
    this.columns = [
      {
        header: 'Nombre',
        display: TipoDocumento.field.NOMBRE,
        defaultSort: 'asc'
      }
    ];
    this.aocUiWindowDynRef.header('Listado de tipos de documento');
    this.aocUiWindowDynRef.show();
  }
}

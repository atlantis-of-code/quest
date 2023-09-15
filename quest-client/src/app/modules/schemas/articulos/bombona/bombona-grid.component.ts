import { Component, OnInit } from '@angular/core';
import { BombonaModelConfig } from '../../../../model-configs/articulos/bombona-model-config';
import { Bombona } from '../../../../models/articulos/bombona';
import { AocUiWindowDynRef } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { PrecioPipe } from '../../../../pipes/precio.pipe';
import { PesoPipe } from '../../../../pipes/peso.pipe';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';

@Component({
  selector: 'app-bombona-grid',
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
export default class BombonaGridComponent implements OnInit {
  columns: AocGridColumn[];

  constructor(
    public modelConfig: BombonaModelConfig,
    private aocWindowDynRef: AocUiWindowDynRef,
    private precioPipe: PrecioPipe,
    private pesoPipe: PesoPipe
  ) { }

  ngOnInit(): void {
    this.columns = [
      { header: 'Código Mav.', display: Bombona.field.CODIGO_MAVERMA },
      { header: 'Codigo NACE', display: Bombona.field.CODIGO_NACE },
      { header: 'Fianza', display: [Bombona.field.FIANZA, this.precioPipe],align: 'right' },
      { header: 'Peso', display: [Bombona.field.PESO, this.pesoPipe], align: 'right', defaultSort: 'asc' }
    ];

    this.aocWindowDynRef.header('Listado de bombonas');
    this.aocWindowDynRef.show();
  }
}

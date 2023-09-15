import { Component, OnInit } from '@angular/core';
import { ModoDePagoModelConfig } from '../../../../model-configs/common/modo-de-pago-model-config';
import { AocUiWindowDynRef } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { ModoDePago } from '../../../../models/common/modo-de-pago';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';

@Component({
  selector: 'app-modo-de-pago-grid',
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
export default class ModoDePagoGridComponent implements OnInit {
  protected columns: AocGridColumn<ModoDePago>[];
  constructor(
    protected modelConfig: ModoDePagoModelConfig,
    private windowDynRef: AocUiWindowDynRef
  ) { }

  ngOnInit(): void {
    this.columns = [
      { header: 'Código Nace', display: ModoDePago.field.CODIGO_NACE, defaultSort: 'asc', size: '12rem' },
      { header: 'Nombre', display: ModoDePago.field.NOMBRE }
    ];
    this.windowDynRef.header('Modos de pago');
    this.windowDynRef.show();
  }
}

import { Component, Input } from '@angular/core';
import { AocModelEmitter } from '@atlantis-of-code/aoc-client/core/utils';
import { PresupuestoModelConfig } from '../../../../model-configs/facturacion/presupuesto-model-config';
import { Presupuesto } from '../../../../models/facturacion/presupuesto';
import { EmbDocumentoGridComponent } from '../../abstract/emb-documento/emb-documento-grid.component';

@Component({
  selector: 'app-presupuesto-grid',
  standalone: true,
  imports: [
    EmbDocumentoGridComponent
  ],
  template: `
    <app-emb-document-grid
      [aocEmitter]="aocEmitter"
      [modelConfig]="modelConfig"
    ></app-emb-document-grid>
  `
})
export class PresupuestoGridComponent  {

  @Input() aocEmitter = new AocModelEmitter<Presupuesto>();

  constructor(
    public modelConfig: PresupuestoModelConfig
  ) { }
}

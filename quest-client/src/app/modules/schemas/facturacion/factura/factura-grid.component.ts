import { Component, Input } from '@angular/core';
import { AocModelEmitter } from '@atlantis-of-code/aoc-client/core/utils';
import { FacturaModelConfig } from '../../../../model-configs/facturacion/factura-model-config';
import { Factura } from '../../../../models/facturacion/factura';
import { EmbDocumentoGridComponent } from '../../abstract/emb-documento/emb-documento-grid.component';

@Component({
  selector: 'app-factura-grid',
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
export class FacturaGridComponent {
  @Input() aocEmitter: AocModelEmitter<Factura>;

  constructor(
    public modelConfig: FacturaModelConfig
  ) { }
}

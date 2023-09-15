import { Component } from '@angular/core';
import { TicketModelConfig } from '../../../../model-configs/facturacion/ticket-model-config';
import { EmbDocumentoGridComponent } from '../../abstract/emb-documento/emb-documento-grid.component';

@Component({
  selector: 'app-ticket-grid',
  standalone: true,
  imports: [
    EmbDocumentoGridComponent
  ],
  template: `
    <app-emb-document-grid
      [modelConfig]="modelConfig"
    ></app-emb-document-grid>
  `
})
export default class TicketGridComponent {
  constructor(
    public modelConfig: TicketModelConfig
  ) { }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AocModelEmitter } from '@atlantis-of-code/aoc-client/core/utils';
import { FacturaModelConfig } from '../../../../model-configs/facturacion/factura-model-config';
import { Factura } from '../../../../models/facturacion/factura';
import { AocMasterDetailModule } from '@atlantis-of-code/aoc-client/components/aoc-master-detail';
import { FacturaGridComponent } from './factura-grid.component';
import { AocPdfViewerModule } from '@atlantis-of-code/aoc-client/components/aoc-pdf-viewer';

@Component({
  selector: 'app-factura-panel',
  standalone: true,
  imports: [
    AocMasterDetailModule,
    FacturaGridComponent,
    AocPdfViewerModule
  ],
  template: `
    <aoc-master-detail
      [masterModelConfig]="facturaModelConfig"
      [masterModelEmitter]="facturaEmitter"
      [detailWidthPercent]="35"
    >
      <ng-template aocMaster>
        <app-factura-grid [aocEmitter]="facturaEmitter"></app-factura-grid>
      </ng-template>

      <ng-template aocDetail tabName="Previsualización">
        <aoc-pdf-viewer [src]="pdfSrc"></aoc-pdf-viewer>
      </ng-template>

    </aoc-master-detail>
  `
})
export default class FacturaPanelComponent implements OnInit, OnDestroy {
  pdfSrc = '';

  facturaEmitter = new AocModelEmitter<Factura>();

  /*movimientoPaletListener = new AocModelListener<MovimientoPalet>([
    {
      type: 'filter query',
      emitter: this.albaranEmitter,
      filterQuery: aocSetId('albaran')
    }
  ]);

  mailListener = new AocModelListener<Mail>([
    {
      type: 'filter query',
      emitter: this.albaranEmitter,
      filterQuery: aocSetId('albaranCollection')
    }
  ]);*/

  constructor(
    public facturaModelConfig: FacturaModelConfig
  ) {}

  ngOnInit() {
    this.facturaEmitter.model$.subscribe(factura => {
      if (factura) {
        this.pdfSrc = `report/factura/pdf?id=${factura.id}&rdm=${Math.random()}`;
      } else {
        this.pdfSrc = null;
      }
    });
  }

  ngOnDestroy() {
    this.facturaEmitter.complete();
    // this.movimientoPaletListener.complete();
    // this.mailListener.complete();
  }
}

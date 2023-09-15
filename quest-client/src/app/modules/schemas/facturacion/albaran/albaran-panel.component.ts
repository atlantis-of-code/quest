import { Component, OnDestroy, OnInit } from '@angular/core';
import { Albaran } from '../../../../models/facturacion/albaran';
import { AlbaranModelConfig } from '../../../../model-configs/facturacion/albaran-model-config';
import { AocModelEmitter } from '@atlantis-of-code/aoc-client/core/utils';
import { AocMasterDetailModule } from '@atlantis-of-code/aoc-client/components/aoc-master-detail';
import { AlbaranGridComponent } from './albaran-grid.component';
import { AocPdfViewerModule } from '@atlantis-of-code/aoc-client/components/aoc-pdf-viewer';

@Component({
  selector: 'app-albaran-panel',
  standalone: true,
  imports: [
    AocMasterDetailModule,
    AlbaranGridComponent,
    AocPdfViewerModule
  ],
  template: `
    <aoc-master-detail
      [masterModelConfig]="albaranModelConfig"
      [masterModelEmitter]="albaranEmitter"
      [detailWidthPercent]="35"
    >
      <ng-template aocMaster>
        <app-albaran-grid [aocEmitter]="albaranEmitter"></app-albaran-grid>
      </ng-template>
      <ng-template aocDetail tabName="Previsualización">
        <aoc-pdf-viewer [src]="pdfSrc"></aoc-pdf-viewer>
      </ng-template>
    </aoc-master-detail>
  `
})
export default class AlbaranPanelComponent implements OnInit, OnDestroy {
  pdfSrc = '';

  albaranEmitter = new AocModelEmitter<Albaran>();

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
    public albaranModelConfig: AlbaranModelConfig
  ) {}

  ngOnInit() {
    this.albaranEmitter.model$.subscribe(albaran => {
      if (albaran) {
        this.pdfSrc = `report/albaran/pdf?id=${albaran.id}&rdm=${Math.random()}`;
      } else {
        this.pdfSrc = null;
      }
    });
  }

  ngOnDestroy() {
    this.albaranEmitter.complete();
    // this.movimientoPaletListener.complete();
    // this.mailListener.complete();
  }
}

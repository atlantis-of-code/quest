import { Component, OnDestroy, OnInit } from '@angular/core';
import { AocModelEmitter } from '@atlantis-of-code/aoc-client/core/utils';
import { PresupuestoModelConfig } from '../../../../model-configs/facturacion/presupuesto-model-config';
import { Presupuesto } from '../../../../models/facturacion/presupuesto';
import { AocMasterDetailModule } from '@atlantis-of-code/aoc-client/components/aoc-master-detail';
import { PresupuestoGridComponent } from './presupuesto-grid.component';
import { AocPdfViewerModule } from '@atlantis-of-code/aoc-client/components/aoc-pdf-viewer';

@Component({
  selector: 'app-presupuesto-panel',
  standalone: true,
  imports: [
    AocMasterDetailModule,
    PresupuestoGridComponent,
    AocPdfViewerModule
  ],
  template: `
    <aoc-master-detail
      [masterModelConfig]="presupuestoModelConfig"
      [masterModelEmitter]="presupuestoEmitter"
      [detailWidthPercent]="35"
    >
      <ng-template aocMaster>
        <app-presupuesto-grid [aocEmitter]="presupuestoEmitter"></app-presupuesto-grid>
      </ng-template>

      <ng-template aocDetail tabName="Previsualización">
        <aoc-pdf-viewer [src]="pdfSrc"></aoc-pdf-viewer>
      </ng-template>
    </aoc-master-detail>
  `
})
export default class PresupuestoPanelComponent implements OnInit, OnDestroy {
  pdfSrc = '';

  presupuestoEmitter = new AocModelEmitter<Presupuesto>();

  constructor(
    public presupuestoModelConfig: PresupuestoModelConfig
  ) {}

  ngOnInit() {
    this.presupuestoEmitter.model$.subscribe(presupuesto => {
      if (presupuesto) {
        this.pdfSrc = `report/presupuesto/pdf?id=${presupuesto.id}&rdm=${Math.random()}`;
      } else {
        this.pdfSrc = null;
      }
    });
  }

  ngOnDestroy() {
    this.presupuestoEmitter.complete();
  }
}

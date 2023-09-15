import { Component, OnDestroy } from '@angular/core';
import { RecuentoEstocModelConfig } from '../../../../model-configs/articulos/recuento-estoc-model-config';
import { AocModelEmitter, AocModelListener, aocSetId } from '@atlantis-of-code/aoc-client/core/utils';
import { RecuentoEstoc } from '../../../../models/articulos/recuento-estoc';
import { MovimientoEstoc } from '../../../../models/articulos/movimiento-estoc';
import { AocMasterDetailModule } from '@atlantis-of-code/aoc-client/components/aoc-master-detail';
import { RecuentoEstocGridComponent } from './recuento-estoc-grid.component';
import { MovimientoEstocGridComponent } from '../movimiento-estoc/movimiento-estoc-grid.component';

@Component({
  selector: 'app-recuento-estoc-panel',
  standalone: true,
  imports: [
    AocMasterDetailModule,
    RecuentoEstocGridComponent,
    MovimientoEstocGridComponent
  ],
  template: `
    <aoc-master-detail
      [masterModelConfig]="modelConfig"
      [masterModelEmitter]="recuentoEstocEmitter"
      [detailWidthPercent]="50"
    >
      <ng-template aocMaster>
        <app-recuento-estoc-grid [modelEmitter]="recuentoEstocEmitter"></app-recuento-estoc-grid>
      </ng-template>
      <ng-template aocDetail tabName="Movimientos de estoc">
        <app-movimiento-estoc-grid [modelListener]="movimientoEstocListener"></app-movimiento-estoc-grid>
      </ng-template>
    </aoc-master-detail>

  `
})
export default class RecuentoEstocPanelComponent implements OnDestroy {
  recuentoEstocEmitter = new AocModelEmitter<RecuentoEstoc>();

  movimientoEstocListener = new AocModelListener<MovimientoEstoc>([
    {
      type: 'filter query',
      emitter: this.recuentoEstocEmitter,
      filterQuery: aocSetId('recuentoEstoc')
    }
  ]);

  constructor(
    public modelConfig: RecuentoEstocModelConfig
  ) { }

  ngOnDestroy() {
    this.recuentoEstocEmitter.complete();
    this.movimientoEstocListener.complete();
  }
}

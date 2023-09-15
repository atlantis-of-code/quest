import { Component, OnDestroy } from '@angular/core';
import { AocModelEmitter, AocModelListener, aocSetId } from '@atlantis-of-code/aoc-client/core/utils';
import { Almacen } from '../../../../models/articulos/almacen';
import { AlmacenModelConfig } from '../../../../model-configs/articulos/almacen-model-config';
import { Estoc } from '../../../../models/articulos/estoc';
import { AocMasterDetailModule } from '@atlantis-of-code/aoc-client/components/aoc-master-detail';
import { AlmacenGridComponent } from './almacen-grid.component';
import { EstocGridComponent } from '../estoc/estoc-grid.component';

@Component({
  selector: 'app-almacen-panel',
  standalone: true,
  imports: [
    AocMasterDetailModule,
    AlmacenGridComponent,
    EstocGridComponent
  ],
  template: `
    <aoc-master-detail
      [masterModelConfig]="modelConfig"
      [masterModelEmitter]="emitter"
      [detailWidthPercent]="60"
    >
      <ng-template aocMaster>
        <app-almacen-grid [emitter]="emitter"></app-almacen-grid>
      </ng-template>

      <ng-template aocDetail tabName="Estoc">
        <app-estoc-grid [modelListener]="estocListener" parentGrid="almacenes"></app-estoc-grid>
      </ng-template>
    </aoc-master-detail>

  `
})
export default class AlmacenPanelComponent implements OnDestroy {
  emitter = new AocModelEmitter<Almacen>();

  estocListener = new AocModelListener<Estoc>([
    {
      emitter: this.emitter,
      type: 'filter query',
      filterQuery: aocSetId('almacen')
    }
  ]);

  constructor(
    public modelConfig: AlmacenModelConfig
  ) { }

  ngOnDestroy(): void {
    this.emitter.complete();
    this.estocListener.complete();
  }
}

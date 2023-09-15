import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticuloModelConfig } from '../../../../model-configs/articulos/articulo-model-config';
import { AocModelEmitter, AocModelListener, aocSetId } from '@atlantis-of-code/aoc-client/core/utils';
import { Articulo } from '../../../../models/articulos/articulo';
import { Estoc } from '../../../../models/articulos/estoc';
import { Fichero } from '../../../../models/ficheros/fichero';
import { AocMasterDetailModule } from '@atlantis-of-code/aoc-client/components/aoc-master-detail';
import { ArticuloGridComponent } from './articulo-grid.component';
import { AngularSplitModule } from 'angular-split';
import { EstocGridComponent } from '../estoc/estoc-grid.component';
import { FotoViewerComponent } from '../../ficheros/foto-viewer.component';

@Component({
  selector: 'app-articulo-panel',
  standalone: true,
  imports: [
    AocMasterDetailModule,
    ArticuloGridComponent,
    AngularSplitModule,
    EstocGridComponent,
    FotoViewerComponent
  ],
  template: `
    <aoc-master-detail
      [masterModelConfig]="articuloModelConfig"
      [masterModelEmitter]="articuloEmitter"
      [detailWidthPercent]="50"
    >
      <ng-template aocMaster>
        <app-articulo-grid [modelEmitter]="articuloEmitter"></app-articulo-grid>
      </ng-template>
      <ng-template aocDetail tabName="Estoc">
        <as-split direction="vertical">
          <as-split-area [size]="70">
            <app-estoc-grid [modelListener]="estocListener" parentGrid="artículos"></app-estoc-grid>
          </as-split-area>
          <as-split-area [size]="30">
            <app-foto-viewer [fichero]="fichero"></app-foto-viewer>
          </as-split-area>
        </as-split>
      </ng-template>
    </aoc-master-detail>
  `
})
export default class ArticuloPanelComponent implements OnInit, OnDestroy {
  articuloEmitter = new AocModelEmitter<Articulo>();

  estocListener = new AocModelListener<Estoc>([
    {
      type: 'filter query',
      emitter: this.articuloEmitter,
      filterQuery: aocSetId('articulo')
    }
  ]);

  fichero: Fichero;

  constructor(
    public articuloModelConfig: ArticuloModelConfig
  ) { }

  ngOnInit() {
    this.articuloEmitter.model$.subscribe(articulo => {
      this.fichero = articulo?.foto;
    });
  }

  ngOnDestroy() {
    this.articuloEmitter.complete();
    this.estocListener.complete();
  }
}

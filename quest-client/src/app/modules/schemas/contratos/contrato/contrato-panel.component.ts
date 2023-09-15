import { Component, OnDestroy } from '@angular/core';
import { ContratoModelConfig } from '../../../../model-configs/contratos/contrato-model-config';
import { AocModelEmitter, AocModelListener, aocSetId } from '@atlantis-of-code/aoc-client/core/utils';
import { Contrato } from '../../../../models/contratos/contrato';
import { Visita } from '../../../../models/contratos/visita';
import { AocMasterDetailModule } from '@atlantis-of-code/aoc-client/components/aoc-master-detail';
import { ContratoGridComponent } from './contrato-grid.component';
import { VisitaGridComponent } from '../visita/visita-grid.component';

@Component({
  selector: 'app-contrato-panel',
  standalone: true,
  imports: [
    AocMasterDetailModule,
    ContratoGridComponent,
    VisitaGridComponent
  ],
  template: `
    <aoc-master-detail
      [masterModelConfig]="contratoModelConfig"
      [masterModelEmitter]="contratoEmitter"
      [detailWidthPercent]="50"
    >
      <ng-template aocMaster>
        <app-contrato-grid [aocEmitter]="contratoEmitter"></app-contrato-grid>
      </ng-template>
      <ng-template aocDetail tabName="Visitas">
        <app-visita-grid [aocListener]="visitaListener"></app-visita-grid>
      </ng-template>
    </aoc-master-detail>
  `
})
export default class ContratoPanelComponent implements OnDestroy {
  contratoEmitter = new AocModelEmitter<Contrato>();

  visitaListener = new AocModelListener<Visita>([
    {
      type: 'filter query',
      emitter: this.contratoEmitter,
      filterQuery: aocSetId('contrato'),
      dynamicFormGroup: {
        contrato: {}
      }
    }
  ]);

  constructor(
    public contratoModelConfig: ContratoModelConfig
  ) { }

  ngOnDestroy() {
    this.contratoEmitter.complete();
    this.visitaListener.complete();
  }
}

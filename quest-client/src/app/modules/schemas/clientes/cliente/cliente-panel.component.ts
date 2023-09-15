import { Component, OnDestroy } from '@angular/core';
import { ClienteModelConfig } from '../../../../model-configs/clientes/cliente-model-config';
import { AocModelEmitter, AocModelListener, aocSetId } from '@atlantis-of-code/aoc-client/core/utils';
import { Cliente } from '../../../../models/clientes/cliente';
import { Contrato } from '../../../../models/contratos/contrato';
import { AocMasterDetailModule } from '@atlantis-of-code/aoc-client/components/aoc-master-detail';
import { ClienteGridComponent } from './cliente-grid.component';
import { ContratoGridComponent } from '../../contratos/contrato/contrato-grid.component';

@Component({
  selector: 'app-cliente-panel',
  standalone: true,
  imports: [
    AocMasterDetailModule,
    ClienteGridComponent,
    ContratoGridComponent
  ],
  template: `
    <aoc-master-detail
      [detailWidthPercent]="50"
      [masterModelConfig]="clienteConfig"
      [masterModelEmitter]="clienteEmitter"
    >
      <ng-template aocMaster>
        <app-cliente-grid [aocEmitter]="clienteEmitter"></app-cliente-grid>
      </ng-template>
      <ng-template aocDetail tabName="Contratos">
        <app-contrato-grid [aocListener]="contratoListener" [standalone]="false"></app-contrato-grid>
      </ng-template>
    </aoc-master-detail>
  `
})
export default class ClientePanelComponent implements OnDestroy {
  clienteEmitter = new AocModelEmitter<Cliente>();

  contratoListener = new AocModelListener<Contrato>([
    {
      type: 'filter query',
      emitter: this.clienteEmitter,
      filterQuery: aocSetId('cliente'),
      dynamicFormGroup: {
        cliente: { when: 'afterModelReady' }
      }
    }
  ]);

  constructor(
    public clienteConfig: ClienteModelConfig
  ) { }

  ngOnDestroy() {
    this.clienteEmitter.complete();
    this.contratoListener.complete();
  }
}

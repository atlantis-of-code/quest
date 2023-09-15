import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AocUiToastMessageService } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-toast';
import { ContratoModelConfig } from '../../../../model-configs/contratos/contrato-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { AocFilterQuery, AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Contrato } from '../../../../models/contratos/contrato';
import { FechaPipe } from '../../../../pipes/fecha.pipe';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../../../../models/clientes/cliente';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { startOfTomorrow } from 'date-fns';
import { NaceConnectorService } from '../../../../utils/nace-connector.service';
import { AocModelEmitter, AocModelListener } from '@atlantis-of-code/aoc-client/core/utils';
import { DatosFiscalesPipe } from '../../../../pipes/datos-fiscales.pipe';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { AocUiInputCheckboxModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-checkbox';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contrato-grid',
  standalone: true,
  imports: [
    AocGridModule,
    AocUiToolbarModule,
    AocUiItemModule,
    AocUiButtonModule,
    AocUiInputCheckboxModule,
    ReactiveFormsModule,
    NgIf
  ],
  template: `
    <aoc-grid
      [modelConfig]="modelConfig"
      [columns]="columns"
      [where]="where"
      [restOptions]="restOptions"
      [modelEmitter]="aocEmitter"
      [modelListener]="aocListener"
    >
      <ng-template aocUiToolbar="left" *ngIf="standalone">
        <aoc-ui-item>
          <button aocUiButton icon="extension" label="Recibir desde ext. NACE"
                  (click)="recibirExtNACE($event)"></button>
        </aoc-ui-item>
      </ng-template>
      <ng-template aocUiToolbar="right">
        <aoc-ui-item>
          Sólo de alta
        </aoc-ui-item>
        <aoc-ui-item>
          <input type="checkbox" aocUiInputCheckbox [formControl]="soloAltaFiltro">
        </aoc-ui-item>
      </ng-template>
    </aoc-grid>
  `
})
export class ContratoGridComponent implements OnInit, OnDestroy {
  @Input() aocEmitter: AocModelEmitter<Contrato>;

  @Input() aocListener: AocModelListener<Contrato>;

  @Input() standalone = true;

  columns: AocGridColumn<Contrato>[];

  where: AocFilterQuery<Contrato> = {
    $and: [ this.getSoloDeAltaCondition() ]
  }

  restOptions: AocRestOptions<Contrato> = {}

  soloAltaFiltro = new UntypedFormControl(true);

  filtrosSubject = new Subject<void>();

  constructor(
    public modelConfig: ContratoModelConfig,
    private fechaPipe: FechaPipe,
    private activatedRoute: ActivatedRoute,
    private datosFiscalesPipe: DatosFiscalesPipe,
    private naceConnectorService: NaceConnectorService,
    private aocUiToastMessageService: AocUiToastMessageService
  ) { }

  ngOnInit(): void {
    this.columns = [
      { header: 'Fecha alta', display: [Contrato.field.FECHA_ALTA, this.fechaPipe], size: '10rem', align: 'right', defaultSort: 'desc' },
      { header: 'Fecha baja', display: [Contrato.field.FECHA_BAJA, this.fechaPipe], size: '10rem', align: 'right' },
      { header: 'Número póliza', display: Contrato.field.NUMERO_POLIZA }
    ];
    if (this.standalone) {
      this.restOptions.populate = {
        cliente: true
      };
      this.columns.push({ header: 'Cliente',
        display: [ Contrato.entity.CLIENTE, (cliente: Cliente) => this.datosFiscalesPipe.transform(cliente.embDatosFiscales) ],
        orderBy: {
          cliente: {
            embDatosFiscales: {
              nombre_fiscal: 'auto',
              apellido_1: 'auto',
              apellido_2: 'auto'
            }
          }
        }
      });
    }
    if ((this.activatedRoute.snapshot.data as any)?.full) {
      this.modelConfig = this.modelConfig.cloneWith({payload: { fnName: 'contratoFilter', type: 'filter'}});
      this.columns[2].size = '10rem';
      this.columns = this.columns.concat(
        {
          header: 'Cliente',
          display: [Contrato.entity.CLIENTE, this.datosFiscalesPipe],
          orderBy: {
            cliente: {
              embDatosFiscales: {
                nombre_fiscal: 'auto',
                apellido_1: 'auto',
                apellido_2: 'auto'
              }
            }
          }
        }
      )
      this.restOptions.populate = {
        cliente: true
      };
    }
    this.initFiltros();
  }

  initFiltros() {
    this.soloAltaFiltro.valueChanges.pipe(takeUntil(this.filtrosSubject)).subscribe((soloDeAlta) => {
      if (soloDeAlta) {
        this.where = {
          $and: [ this.getSoloDeAltaCondition() ]
        };
      } else {
        this.where = {};
      }
      this.where = {...this.where};
    });
  }

  recibirExtNACE(_: Event) {
    this.naceConnectorService.getAndProcessPayload().then(payload => {
      // this.extensionPayload = JSON.stringify(payload, undefined, 4);
      // this.changeDetectorRef.detectChanges(); // need this to refresh template
      console.log(payload);
    }).catch(_ => {
      console.log('no payload... nothing to do');
      this.aocUiToastMessageService.showError('No hay ningún contrato cargado en la extensión NACE.');
    });
  }

  ngOnDestroy() {
    this.filtrosSubject.next();
    this.filtrosSubject.unsubscribe();
  }

  private getSoloDeAltaCondition(): AocFilterQuery<Contrato> {
    return {
      $or: [
        { fecha_baja: null },
        { fecha_baja: { $gte: startOfTomorrow() } }
      ]
    };
  }
}

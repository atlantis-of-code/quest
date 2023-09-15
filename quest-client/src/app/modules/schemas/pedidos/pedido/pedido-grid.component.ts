import { Component, OnDestroy, OnInit } from '@angular/core';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { Pedido } from '../../../../models/pedidos/pedido';
import { PedidoModelConfig } from '../../../../model-configs/pedidos/pedido-model-config';
import { FechaPipe } from '../../../../pipes/fecha.pipe';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocFilterQuery, AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Contrato } from '../../../../models/contratos/contrato';
import { ContratoModelConfig } from '../../../../model-configs/contratos/contrato-model-config';
import { DatosFiscalesPipe } from '../../../../pipes/datos-fiscales.pipe';
import { Cliente } from '../../../../models/clientes/cliente';
import { Ruta } from '../../../../models/pedidos/ruta';
import { PrecioPipe } from '../../../../pipes/precio.pipe';
import { AocUiDataMenu, aocUiTplRef } from '@atlantis-of-code/aoc-client/ui/common/types';
import { CommonModule } from '@angular/common';
import { AocUiTooltipModule } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-tooltip';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { AocRestService } from '@atlantis-of-code/aoc-client/core/services';
import { RutaSelectComponent } from '../ruta/ruta-select.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Repartidor } from '../../../../models/pedidos/repartidor';
import { RepartidorSelectComponent } from '../repartidor/repartidor-select.component';
import { Subscription } from 'rxjs';
import { AocUiInputCheckboxModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-checkbox';
import { HttpClient } from '@angular/common/http';
import { AocConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocUiToastMessageService } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-toast';
import { AocModelId } from '@atlantis-of-code/aoc-client/core/models';
import { AocUiDom } from '@atlantis-of-code/aoc-client/ui/common/utils';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import {
  AocUiVerticalSeparatorModule
} from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-vertical-separator';

@Component({
  standalone: true,
  selector: 'app-pedido-grid',
  imports: [
    CommonModule,
    AocGridModule,
    AocUiTooltipModule,
    AocUiToolbarModule,
    AocUiButtonModule,
    RutaSelectComponent,
    ReactiveFormsModule,
    RepartidorSelectComponent,
    AocUiInputCheckboxModule,
    AocUiItemModule,
    AocUiVerticalSeparatorModule
  ],
  template: `
    <aoc-grid
      [modelConfig]="modelConfig"
      [columns]="columns"
      [restOptions]="restOptions"
      [where]="where"
      searchInputMode="queryBuilderFunctions"
      (selectionChange)="selected = $any($event)"
    >
      <ng-template aocUiToolbar="left">
        <aoc-ui-item>
          <button aocUiButton label="Modificar estados (seleccionados)" icon="check" [menu]="menuEstados" [disabled]="!this.selected.length"></button>
        </aoc-ui-item>
        <aoc-ui-vertical-separator></aoc-ui-vertical-separator>
        <aoc-ui-item>
          <button aocUiButton label="Generar fichero de alta masiva" icon="table" [menu]="menuAltaMasivaNace"></button>
        </aoc-ui-item>
      </ng-template>
      <ng-template aocUiToolbar="right" [formGroup]="filterFormGroup">
        <aoc-ui-item>
          <input type="checkbox" aocUiInputCheckbox="Sólo pendientes Nace" formControlName="soloPendientesNace">
        </aoc-ui-item>
        <aoc-ui-item>
          <input type="checkbox" aocUiInputCheckbox="Sólo pendientes entrega" formControlName="soloPendientesEntrega">
        </aoc-ui-item>
        <aoc-ui-item>
          <app-ruta-select placeholder="Filtrar por ruta..." allow="none" formControlName="ruta"></app-ruta-select>
        </aoc-ui-item>
        <aoc-ui-item>
          <app-repartidor-select placeholder="Filtrar por repartidor..." allow="none" formControlName="repartidor"></app-repartidor-select>
        </aoc-ui-item>
      </ng-template>
      <ng-template aocGridCell="entregado" let-entregado="value">
        <span *ngIf="entregado" class="material-symbols-rounded"
              aocUiTooltip="El pedido ya ha sido entregado">done</span>
        <span *ngIf="!entregado" class="material-symbols-rounded" aocUiTooltip="El pedido está pendiente de entrega">warning</span>
      </ng-template>
      <ng-template aocGridCell="altaEnNace" let-altaEnNace="value">
        <span *ngIf="altaEnNace" class="material-symbols-rounded"
              aocUiTooltip="El pedido está de alta en Nace">done</span>
        <span *ngIf="!altaEnNace" class="material-symbols-rounded"
              aocUiTooltip="El pedido está pendiente de de dar de alta en Nace">warning</span>
      </ng-template>
    </aoc-grid>
  `
})
export default class PedidoGridComponent implements OnInit, OnDestroy {
  protected columns: AocGridColumn<Pedido>[];

  protected where: AocFilterQuery<Pedido> = {};

  protected restOptions: AocRestOptions<Pedido> = {
    populate: {
      contrato: {
        cliente: true
      },
      repartidor: true,
      ruta: true
    },
    queryBuilderFunctions: {}
  }

  protected selected: Pedido[] = [];

  protected menuEstados: AocUiDataMenu = [
    { label: 'Marcar seleccionados de alta en Nace', icon: 'check', command: _ => this.marcarDeAltaEnNace() },
    { label: 'Marcar seleccionados de baja en Nace', icon: 'close', command: _ => this.marcarPendientesEnNace() },
    { type: 'separator'},
    { label: 'Marcar seleccionados como entregados', icon: 'check', command: _ => this.marcarComoEntregados() },
    { label: 'Marcar seleccionados como pendientes de entrega', icon: 'close', command: _ => this.marcarComoPendientesDeEntrega() }
  ];

  protected menuAltaMasivaNace: AocUiDataMenu = [
    { label: 'Generar fichero con pedidos pendientes', command: _ => this.altaMasivaNace('pendientes') },
    { label: 'Generar fichero con pedidos seleccionados', command: _ => this.altaMasivaNace('seleccionados') }
  ]

  protected filterFormGroup = new FormGroup({
    soloPendientesNace: new FormControl<boolean>(false),
    soloPendientesEntrega: new FormControl<boolean>(false),
    ruta: new FormControl<Ruta>(null),
    repartidor: new FormControl<Repartidor>(null)
  });

  private filterFormGroupSubscription: Subscription;

  constructor(
    protected modelConfig: PedidoModelConfig,
    private fechaPipe: FechaPipe,
    private contratoModelConfig: ContratoModelConfig,
    private datosFiscalesPipe: DatosFiscalesPipe,
    private precioPipe: PrecioPipe,
    private aocRestService: AocRestService,
    private httpClient: HttpClient,
    private aocConfig: AocConfig,
    private aocUiToastMessageService: AocUiToastMessageService
  ) { }

  ngOnInit() {
    this.columns = [
      {
        header: 'Nace',
        headerTooltip: 'El pedido está de alta en Nace',
        display: [ Pedido.field.ALTA_EN_NACE, aocUiTplRef('altaEnNace') ],
        size: '5.5rem',
        align: 'center'
      },
      {
        header: 'Entr.',
        headerTooltip: 'El pedido ha sido entregado',
        display: [ Pedido.field.ENTREGADO, aocUiTplRef('entregado' )],
        size: '5rem',
        align: 'center'
      },
      {
        header: 'Fecha creación',
        display: [ Pedido.field.FECHA_CREACION, this.fechaPipe ],
        size: '10rem',
        defaultSort: 'desc'
      },
      {
        header: 'Fecha entrega',
        display: [ Pedido.field.FECHA_ENTREGA, this.fechaPipe ],
        size: '10rem'
      },
      {
        header: 'Contrato',
        display: [ Pedido.entity.CONTRATO, this.contratoModelConfig.transform],
        orderBy: {
          contrato: {
            numero_poliza: 'auto',
            fecha_alta: 'auto'
          }
        }
      },
      {
        header: 'Cliente',
        display: [ Pedido.entity.CONTRATO, Contrato.entity.CLIENTE, Cliente.embedded.EMB_DATOS_FISCALES, this.datosFiscalesPipe ],
        orderBy: {
          contrato: {
            cliente: {
              embDatosFiscales: {
                nombre_fiscal: 'auto',
                apellido_1: 'auto',
                apellido_2: 'auto'
              }
            }
          }
        },
      },
      {
        header: 'Repartidor',
        display: [ Pedido.entity.REPARTIDOR, this.datosFiscalesPipe ],
        orderBy: {
          repartidor: {
            nombre_fiscal: 'auto',
            apellido_1: 'auto',
            apellido_2: 'auto'
          }
        }
      },
      {
        header: 'Ruta',
        display: [ Pedido.entity.RUTA, Ruta.field.NOMBRE ]
      },
      {
        header: 'Total',
        display: [ Pedido.field.TOTAL, this.precioPipe ],
        size: '8rem',
        align: 'right'
      }
    ];
    this.filterFormGroupSubscription = this.filterFormGroup.valueChanges.subscribe(filters => {
      if (filters.soloPendientesNace) {
        this.where.alta_en_nace = false;
      } else {
        delete this.where.alta_en_nace;
      }
      if (filters.soloPendientesEntrega) {
        this.where.entregado = false;
      } else {
        delete this.where.entregado;
      }
      if (filters.ruta) {
        this.where.ruta = { id: filters.ruta.id };
      } else {
        delete this.where.ruta;
      }
      if (filters.repartidor) {
        this.where.repartidor = { id: filters.repartidor.id }
      } else {
        delete this.where.repartidor;
      }
      this.where = {...this.where};
    });
  }

  ngOnDestroy() {
    this.filterFormGroupSubscription?.unsubscribe();
  }

  protected async marcarDeAltaEnNace() {
    const idsValidos = this.selected.filter(p => !p.alta_en_nace).map(p => p.id);
    if (idsValidos.length) {
      await this.aocRestService.nativeUpdate(Pedido, { id: { $in: idsValidos } }, { alta_en_nace: true });
    }
  }

  protected async marcarPendientesEnNace() {
    const idsValidos = this.selected.filter(p => p.alta_en_nace).map(p => p.id);
    if (idsValidos.length) {
      await this.aocRestService.nativeUpdate(Pedido, { id: { $in: idsValidos } }, { alta_en_nace: false });
    }
  }

  protected async marcarComoEntregados() {
    const idsValidos = this.selected.filter(p => !p.entregado).map(p => p.id);
    if (idsValidos.length) {
      await this.aocRestService.nativeUpdate(Pedido, { id: { $in: idsValidos } }, { entregado: true });
    }
  }

  protected async marcarComoPendientesDeEntrega() {
    const idsValidos = this.selected.filter(p => p.entregado).map(p => p.id);
    if (idsValidos.length) {
      await this.aocRestService.nativeUpdate(Pedido, { id: { $in: idsValidos } }, { entregado: false });
    }
  }

  protected altaMasivaNace(modo: 'pendientes' | 'seleccionados') {
    let ids: AocModelId[];
    if (modo === 'seleccionados') {
      ids = this.selected.filter(p => p.alta_en_nace === false).map(p => p.id);
      if (!ids.length) {
        this.aocUiToastMessageService.showWarning('No hay ningún pedido seleccionado pendiente de dar de alta en Nace');
        return;
      }
    }
    const url = `${this.aocConfig.SERVER_URL}pedido/alta-masiva-nace`;
    this.httpClient.post(url, ids ? {ids}: {}, {withCredentials: true, responseType: 'arraybuffer'}).subscribe(response => {
      AocUiDom.createAndDownloadBlobFile(
        response,
        'Alta masiva nace',
        'xlsx'
      );
      this.aocUiToastMessageService.showSuccess('Exportación correcta.');
    });
  }
}

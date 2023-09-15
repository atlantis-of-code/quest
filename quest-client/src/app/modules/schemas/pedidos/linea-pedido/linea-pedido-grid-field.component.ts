import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { LineaPedido } from '../../../../models/pedidos/linea-pedido';
import { LineaPedidoModelConfig } from '../../../../model-configs/pedidos/linea-pedido-model-config';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { Bombona } from '../../../../models/articulos/bombona';
import { Contrato } from '../../../../models/contratos/contrato';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { FormControl, FormGroupDirective, NgControl, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom, ReplaySubject } from 'rxjs';
import { AocFilterQuery } from '@atlantis-of-code/aoc-client/aoc-common';
import { Pedido } from '../../../../models/pedidos/pedido';
import { takeUntil } from 'rxjs/operators';
import { PrecioPipe } from '../../../../pipes/precio.pipe';
import { AocUiWindowDynRef, AocUiWindowDynService } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocUiShareService } from '@atlantis-of-code/aoc-client/ui/common/services';
import { LineaPedidoCantidadFormComponent } from './linea-pedido-cantidad-form.component';
import { BombonaModelConfig } from '../../../../model-configs/articulos/bombona-model-config';
import { MavermaDefaultsService } from '../../../../services/maverma-defaults.service';
import { Big } from 'big.js';
import { PorcentajePipe } from '../../../../pipes/porcentaje.pipe';
import { isAfter, isBefore } from 'date-fns';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import { BombonaSelectComponent } from '../../articulos/bombona/bombona-select.component';

@Component({
  standalone: true,
  selector: 'app-linea-pedido-grid-field',
  imports: [
    AocGridModule,
    AocUiToolbarModule,
    BombonaSelectComponent,
    ReactiveFormsModule,
    AocUiItemModule
  ],
  template: `
    <aoc-grid-field
      [modelConfig]="modelConfig"
      [columns]="columns"
      [sortField]="LineaPedidoClass.field.ORDEN"
      sortDir="asc"
    >
      <ng-template aocUiToolbar="left">
        <aoc-ui-item>
          <app-bombona-select
            style="width: 25rem"
            [revokePermissions]="true"
            [formControl]="bombonaFormControl"
            [where]="bombonaWhere"
            placeholder="Seleccione un producto (bombona)..."
            #focusTarget
          ></app-bombona-select>
        </aoc-ui-item>
      </ng-template>

      <ng-template>

      </ng-template>
    </aoc-grid-field>
  `
})
export class LineaPedidoGridFieldComponent implements OnInit, OnDestroy {
  @ViewChild('focusTarget', {static: false, read: ElementRef}) private focusTarget;

  protected LineaPedidoClass = LineaPedido;

  protected columns: AocGridColumn<LineaPedido>[];

  protected bombonaFormControl: FormControl<Bombona>;

  protected bombonaWhere: AocFilterQuery<Bombona>;

  private unsubscriber = new ReplaySubject<void>(1);

  private contrato: Contrato;

  private fechaPedido: Date;

  constructor(
    protected modelConfig: LineaPedidoModelConfig,
    private ngControl: NgControl,
    private formGroupDirective: FormGroupDirective,
    private bombonaModelConfig: BombonaModelConfig,
    private precioPipe: PrecioPipe,
    private porcentajePipe: PorcentajePipe,
    private windowDynService: AocUiWindowDynService,
    private shareService: AocUiShareService,
    private windowDynRef: AocUiWindowDynRef,
    private mavermaDefaults: MavermaDefaultsService
  ) {}

  ngOnInit() {
    this.columns = [
      {
        header: 'Producto',
        display: [ LineaPedido.entity.BOMBONA, this.bombonaModelConfig.transform ],
        orderBy: {
          bombona: {
            codigo_maverma: 'auto',
            codigo_nace: 'auto'
          }
        }
      },
      {
        header: 'Cantidad',
        display: LineaPedido.field.CANTIDAD,
        align: 'right',
        size: '10rem'
      },
      {
        header: 'Precio unitario (€)',
        display: [LineaPedido.field.PRECIO_UNITARIO, this.precioPipe],
        align: 'right',
        size: '12rem'
      },
      {
        header: 'IVA (%)',
        display: [LineaPedido.field.IVA, this.porcentajePipe],
        align: 'right',
        size: '8rem'
      },
      {
        header: 'PVP (€)',
        display: [LineaPedido.field.PVP, this.precioPipe],
        align: 'right',
        size: '8rem'
      },
      {
        header: 'Descuento (€)',
        display: [LineaPedido.field.DESCUENTO, this.precioPipe],
        align: 'right',
        size: '12rem'
      },
      {
        header: 'Suplemento (€)',
        display: [LineaPedido.field.SUPLEMENTO, this.precioPipe],
        align: 'right',
        size: '12rem'
      },
      {
        header: 'Precio Total (€)',
        display: [LineaPedido.field.TOTAL_LINEA, this.precioPipe],
        align: 'right',
        size: '12rem'
      }
    ];

    this.bombonaFormControl = new FormControl<Bombona>(null);
    this.bombonaFormControl.valueChanges.pipe(takeUntil(this.unsubscriber)).subscribe(bombona => {
      if (bombona) {
        this.procesarBombona(bombona).then(_ => {
          this.bombonaFormControl.setValue(null);
          this.focusTarget.nativeElement.querySelector('.aoc-ui-autocomplete-input').focus();
        });
      }
    });

    this.formGroupDirective.form.controls[Pedido.entity.CONTRATO].valueChanges.pipe(takeUntil(this.unsubscriber)).subscribe((contrato: Contrato) => {
      this.contrato = contrato;
      this.bombonaWhere = { id: { $in: contrato?.contratoBombonaCollection.map(o => o.bombona.id) ?? [] }};
    });

    this.formGroupDirective.form.controls[Pedido.field.FECHA_CREACION].valueChanges.pipe(takeUntil(this.unsubscriber)).subscribe((fecha: Date) => {
      this.fechaPedido = fecha ?? new Date();
    });
  }

  private async procesarBombona(bombona: Bombona) {
    const shareId = this.shareService.register();
    this.windowDynService.open(LineaPedidoCantidadFormComponent, {
      header: `Selecciona la cantidad para '${this.bombonaModelConfig.transform(bombona)}'`,
      width: 320,
      height: 190,
      parentWindowNumber: this.windowDynRef.windowNumber,
      closable: false,
      aocUiShareId: shareId
    });
    const response = await firstValueFrom(this.shareService.getResponseObservable<number | 'cancelar'>(shareId));
    if (response === 'cancelar') {
      return;
    }
    const current: LineaPedido[] = this.ngControl.control.value;
    const nuevaLineaPedido = new LineaPedido();
    nuevaLineaPedido.orden = current.length ? Math.max(...current.map(lp => lp.orden)) + 1 : 1;
    nuevaLineaPedido.bombona = bombona;
    nuevaLineaPedido.cantidad = response;
    nuevaLineaPedido.precio_unitario = bombona.fianza;
    nuevaLineaPedido.iva = this.mavermaDefaults.empresa.iva;
    const precioConIva = Big(nuevaLineaPedido.precio_unitario).mul(nuevaLineaPedido.iva).div(100).round(2, Big.roundHalfEven);
    nuevaLineaPedido.pvp = Big(nuevaLineaPedido.precio_unitario).add(precioConIva).toString();
    const descuento = this.contrato.descuentoCollection.find(d => d.bombona.id === bombona.id && isBefore(d.fecha_inicio, this.fechaPedido) && isAfter(d.fecha_fin, this.fechaPedido))?.descuento_euros ?? '0.00';
    nuevaLineaPedido.descuento = Big(descuento).mul(response).toString();
    nuevaLineaPedido.suplemento = '0.00';
    nuevaLineaPedido.total_linea = Big(nuevaLineaPedido.pvp).mul(response).sub(nuevaLineaPedido.descuento).toString();
    current.push(nuevaLineaPedido);
    this.ngControl.control.setValue(current);
    this.bombonaFormControl.setValue(null);
  }

  ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}

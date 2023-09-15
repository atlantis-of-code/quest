import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MovimientoEstocModelConfig } from '../../../../model-configs/articulos/movimiento-estoc-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { MovimientoEstoc } from '../../../../models/articulos/movimiento-estoc';
import { AocFilterQuery, AocQueryOrderMap, AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Articulo } from '../../../../models/articulos/articulo';
import { ArticuloModelConfig } from '../../../../model-configs/articulos/articulo-model-config';
import { Almacen } from '../../../../models/articulos/almacen';
import { FechaHoraPipe } from '../../../../pipes/fecha-hora.pipe';
import { FormControl, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AocModelListener } from '@atlantis-of-code/aoc-client/core/utils';
import { AocUiTableCustomSortEvent } from '@atlantis-of-code/aoc-client/ui/data/aoc-ui-table';
import { Big } from 'big.js';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import { ArticuloSelectComponent } from '../articulo/articulo-select.component';
import { AlmacenSelectComponent } from '../almacen/almacen-select.component';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';

@Component({
  selector: 'app-movimiento-estoc-grid',
  standalone: true,
  imports: [
    AocGridModule,
    ReactiveFormsModule,
    AocUiItemModule,
    ArticuloSelectComponent,
    AlmacenSelectComponent,
    AocUiToolbarModule
  ],
  template: `
    <aoc-grid
      [modelConfig]="modelConfig"
      [columns]="columns"
      [restOptions]="restOptions"
      [modelListener]="modelListener"
      [where]="where"
      [customSort]="customSort"
    >
      <ng-template aocUiToolbar="right" [formGroup]="filtrosFormGroup">
        <aoc-ui-item>
          <app-articulo-select allow="none" [formControlName]="MovimientoEstocClass.entity.ARTICULO"
                               placeholder="Filtrar por artículo..." style="width: 20rem"></app-articulo-select>
        </aoc-ui-item>
        <aoc-ui-item>
          <app-almacen-select allow="none" [formControlName]="MovimientoEstocClass.entity.ALMACEN"
                              placeholder="Filtrar por almacén..." style="width: 20rem"></app-almacen-select>
        </aoc-ui-item>
      </ng-template>
    </aoc-grid>
  `
})
export class MovimientoEstocGridComponent implements OnInit, OnDestroy {
  @Input() modelListener: AocModelListener<MovimientoEstoc>;

  columns: AocGridColumn<MovimientoEstoc>[];

  restOptions: AocRestOptions<MovimientoEstoc>;

  where: AocFilterQuery<MovimientoEstoc>;

  MovimientoEstocClass = MovimientoEstoc;
  filtrosFormGroup: UntypedFormGroup;
  filtrosFormGroupSubscription: Subscription;

  // Añadimos id a la ordenación incondicionalmente porque varios movimientos tienen fechas idénticas
  customSort = (sortEvent: AocUiTableCustomSortEvent, queryOrderMapArray: AocQueryOrderMap<unknown>[]) => {
    queryOrderMapArray.push({id: sortEvent.order});
  }

  constructor(
    public modelConfig: MovimientoEstocModelConfig,
    private fechaHoraPipe: FechaHoraPipe,
    private articuloModelConfig: ArticuloModelConfig
  ) { }

  ngOnInit(): void {
    this.columns = [
      {
        header: 'Fecha',
        display: [MovimientoEstoc.field.FECHA, this.fechaHoraPipe],
        defaultSort: 'desc',
        size: '11rem',
        align: 'right'
      },
      {
        header: 'Artículo',
        display: [MovimientoEstoc.entity.ARTICULO, this.articuloModelConfig.transform ],
        orderBy: [MovimientoEstoc.entity.ARTICULO, Articulo.field.CODIGO],
        size: '20rem'
      },
      {
        header: 'Almacén',
        display: [MovimientoEstoc.entity.ALMACEN, Almacen.field.NOMBRE],
        size: '20rem'
      },
      {
        header: 'Tipo',
        display: MovimientoEstoc.field.TIPO,
        size: '10rem'
      },
      {
        header: 'Op. documento',
        headerTooltip: 'Operación realizada sobre el documento de origen (número de albarán, ticket, traspaso o recuento)',
        display: MovimientoEstoc.field.OPERACION_DOCUMENTO,
        size: '12rem'
      },
      {
        header: 'Nombre documento',
        headerTooltip: 'Nombre del documento de origen (número de albarán, ticket, traspaso o recuento)',
        display: MovimientoEstoc.field.NOMBRE_DOCUMENTO,
        size: '12rem',
        align: 'right'
      },
      {
        header: 'Cliente',
        display: MovimientoEstoc.field.NOMBRE_CLIENTE
      },
      {
        header: 'Descripción',
        display: MovimientoEstoc.field.DESCRIPCION
      },
      {
        header: 'Cantidad',
        display: MovimientoEstoc.field.CANTIDAD,
        size: '12rem',
        align: 'right'
      },
      {
        header: 'Estoc resultante',
        display: (movimientoEstoc) => {
          if (movimientoEstoc.tipo === 'Recuento') {
            return movimientoEstoc.cantidad;
          } else {
            return Big(movimientoEstoc.cantidad).plus(movimientoEstoc.estoc_anterior ?? '0').toString();
          }
        },
        size: '12rem',
        align: 'right'
      }
    ];
    this.restOptions = {
      populate: {
        almacen: true,
        articulo: true,
        lineaAlbaran: true
      }
    }
    this.filtrosFormGroup = new UntypedFormGroup({
      [MovimientoEstoc.entity.ARTICULO]: new FormControl<Articulo>(null),
      [MovimientoEstoc.entity.ALMACEN]: new FormControl<Almacen>(null)
    });
    this.filtrosFormGroupSubscription = this.filtrosFormGroup.valueChanges.subscribe(values => {
      this.where = {};
      const articulo = values[MovimientoEstoc.entity.ARTICULO];
      if (articulo) {
        this.where.articulo = { id : articulo.id };
      }
      const almacen = values[MovimientoEstoc.entity.ALMACEN];
      if (almacen) {
        this.where.almacen = { id: almacen.id };
      }
    });
  }

  ngOnDestroy() {
    this.filtrosFormGroupSubscription.unsubscribe();
  }
}

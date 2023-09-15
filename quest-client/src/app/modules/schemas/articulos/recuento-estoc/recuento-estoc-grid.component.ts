import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RecuentoEstocModelConfig } from '../../../../model-configs/articulos/recuento-estoc-model-config';
import { AocGridColumn, AocSpreadsheetColumn } from '@atlantis-of-code/aoc-client/core/types';
import { RecuentoEstoc } from '../../../../models/articulos/recuento-estoc';
import { FechaPipe } from '../../../../pipes/fecha.pipe';
import { AocFilterQuery, AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Fichero } from '../../../../models/ficheros/fichero';
import { AocModelEmitter } from '@atlantis-of-code/aoc-client/core/utils';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Almacen } from '../../../../models/articulos/almacen';
import { Subscription } from 'rxjs';
import { Estoc } from '../../../../models/articulos/estoc';
import { EstocModelConfig } from '../../../../model-configs/articulos/estoc-model-config';
import { Articulo } from '../../../../models/articulos/articulo';
import { HttpClient } from '@angular/common/http';
import { MavermaUtilsService } from '../../../../services/maverma-utils.service';
import { AocConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { aocUiTplRef } from '@atlantis-of-code/aoc-client/ui/common/types';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import { AlmacenSelectComponent } from '../almacen/almacen-select.component';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { AocDirectivesModule } from '@atlantis-of-code/aoc-client/core/directives';
import { AocUiFileSelectModule } from '@atlantis-of-code/aoc-client/ui/common/directives/aoc-ui-file-select';
import { AocUiTooltipModule } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-tooltip';

@Component({
  selector: 'app-recuento-estoc-grid',
  standalone: true,
  imports: [
    AocGridModule,
    AocUiItemModule,
    AlmacenSelectComponent,
    AocUiButtonModule,
    AocDirectivesModule,
    ReactiveFormsModule,
    AocUiFileSelectModule,
    AocUiTooltipModule
  ],
  template: `
    <aoc-grid
      [modelConfig]="modelConfig"
      [restOptions]="restOptions"
      [columns]="columns"
      [modelEmitter]="modelEmitter"
    >
      <ng-template aocUiToolbar="left">
        <aoc-ui-item>
          <app-almacen-select allow="none" [formControl]="almacenControl" placeholder="Seleccionar almacén..."
                              style="width: 30rem"></app-almacen-select>
        </aoc-ui-item>
        <aoc-ui-item>
          <button
            aocUiButton
            [disabled]="!almacenControl.value"
            label="Descargar fichero de estoc actual"
            icon="file_download"
            aocSpreadsheet
            [where]="estocFilterQuery"
            [restOptions]="estocRestOptions"
            [columns]="estocColumns"
            [modelConfig]="estocModelConfig"
            [fileName]="estocFileName"
          ></button>
        </aoc-ui-item>
        <aoc-ui-item>
          <button
            aocUiButton
            icon="file_upload"
            label="Cargar fichero de recuento"
            (aocUiFileSelect)="cargarInventario($event)"
          ></button>
        </aoc-ui-item>
      </ng-template>

      <ng-template aocGridCell="descargarFichero" let-fichero="value">
        <button
          aocUiButton
          icon="file_download"
          label="Descargar fichero de este recuento"
          (click)="descargarFichero(fichero)"
          aocUiTooltip="Descargar fichero"
        ></button>
      </ng-template>
    </aoc-grid>
  `
})
export class RecuentoEstocGridComponent implements OnInit, OnDestroy {
  @Input() modelEmitter: AocModelEmitter<RecuentoEstoc>;

  columns: AocGridColumn<RecuentoEstoc>[];

  restOptions: AocRestOptions<RecuentoEstoc> = {
    populate: {
      fichero: true
    }
  }

  // Control de exportación de datos, filtramos por almacén
  almacenControl: FormControl<Almacen>;
  almacenSubscription: Subscription;
  estocFilterQuery: AocFilterQuery<Estoc>;
  estocColumns: AocSpreadsheetColumn[];
  estocFileName: string;
  estocRestOptions: AocRestOptions<Estoc> = {
    populate: {
      almacen: true,
      articulo: true
    },
    orderBy: {
      almacen: {
        nombre: 'asc',
      },
      articulo: {
        codigo: 'asc',
        nombre: 'asc'
      }
    }
  };

  constructor(
    public modelConfig: RecuentoEstocModelConfig,
    public estocModelConfig: EstocModelConfig,
    private fechaPipe: FechaPipe,
    private httpClient: HttpClient,
    private mavermaUtils: MavermaUtilsService,
    private aocConfig: AocConfig
  ) { }

  ngOnInit(): void {
    this.columns = [
      {
        header: 'Fecha',
        display: [ RecuentoEstoc.field.FECHA, this.fechaPipe ],
        defaultSort: 'desc',
        size: '12rem'
      },
      {
        header: 'Nombre del fichero',
        display: [ RecuentoEstoc.entity.FICHERO, Fichero.field.NOMBRE ]
      },
      {
        header: '',
        display: [ RecuentoEstoc.entity.FICHERO, aocUiTplRef('descargarFichero')],
        size: '20rem',
        align: 'center',
        sortable: false
      }
    ];

    this.almacenControl = new FormControl<Almacen>(null);
    this.almacenSubscription = this.almacenControl.valueChanges.subscribe(almacen => {
      if (almacen) {
        this.estocFileName = `Estoc de ${almacen.nombre} (${this.fechaPipe.transform(new Date())})`;
        this.estocFilterQuery = {
          almacen: { id: almacen.id }
        }
      } else {
        this.estocFileName = undefined;
        this.estocFilterQuery = undefined;
      }
    });
    this.estocColumns = [
      { header: '', field: 'id', type: 'string' },
      { header: 'Almacén', field: [Estoc.entity.ALMACEN, Almacen.field.NOMBRE] },
      { header: 'Código', field: [Estoc.entity.ARTICULO, Articulo.field.CODIGO] },
      { header: 'Nombre', field: [Estoc.entity.ARTICULO, Articulo.field.NOMBRE] },
      { header: 'Cantidad', field: Estoc.field.CANTIDAD, type: 'number' }
    ];
  }

  async cargarInventario(fileList: FileList) {
    if (fileList.length !== 1) {
      return;
    }
    const file = fileList.item(0);
    const fileName = file.name;
    const payload = await this.mavermaUtils.getRawDataFromFile(file);
    this.httpClient.post(
      `${this.aocConfig.SERVER_URL}estoc/cargar_fichero_inventario`,
      { payload, fileName },
      { withCredentials: true }
    ).subscribe({
      next: _ => {
      },
      error: _ => {
      }
    });
  }

  descargarFichero(fichero: Fichero) {
    this.mavermaUtils.descargarFichero(fichero);
  }

  ngOnDestroy() {
    this.almacenSubscription.unsubscribe();
  }
}

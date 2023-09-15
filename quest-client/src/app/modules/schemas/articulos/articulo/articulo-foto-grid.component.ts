import { Component, OnInit } from '@angular/core';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { Articulo } from '../../../../models/articulos/articulo';
import { AocFilterQuery, AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { ArticuloModelConfig } from '../../../../model-configs/articulos/articulo-model-config';
import { aocUiTplRef } from '@atlantis-of-code/aoc-client/ui/common/types';
import { MavermaUtilsService } from '../../../../services/maverma-utils.service';
import { Fichero } from '../../../../models/ficheros/fichero';
import { AocRestService } from '@atlantis-of-code/aoc-client/core/services';
import { AocModelManager } from '@atlantis-of-code/aoc-client/core/models';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocUiFileSelectModule } from '@atlantis-of-code/aoc-client/ui/common/directives/aoc-ui-file-select';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { AocUiInputCheckboxModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-checkbox';
import { NgIf } from '@angular/common';
import { FotoViewerComponent } from '../../ficheros/foto-viewer.component';

@Component({
  selector: 'app-articulo-foto-grid',
  standalone: true,
  imports: [
    AocGridModule,
    AocUiFileSelectModule,
    FotoViewerComponent,
    AocUiItemModule,
    ReactiveFormsModule,
    AocUiToolbarModule,
    AocUiInputCheckboxModule,
    NgIf
  ],
  template: `
    <aoc-grid
      [modelConfig]="modelConfig"
      [columns]="columns"
      [restOptions]="restOptions"
      [where]="where"
    >
      <ng-template aocGridCell="foto" let-articulo="model">
        <div style="height: 7rem" (aocUiFileSelect)="procesarClick($event, articulo)" [multiple]="false">
          <app-foto-viewer *ngIf="articulo.foto" [fichero]="articulo.foto"></app-foto-viewer>
          <span *ngIf="!articulo.foto" style="font-size: 6rem; margin-top: 0.5rem" class="material-symbols-rounded">camera</span>
        </div>
      </ng-template>
      <ng-template aocUiToolbar="right">
        <aoc-ui-item>
          <input type="checkbox" aocUiInputCheckbox="Sólo sin foto" [formControl]="soloSinFotoFormControl">
        </aoc-ui-item>
      </ng-template>
      <!--
      <ng-template aocUiTableTemplate="rowExpansion" let-articulo>
        <div *ngIf="articulo.foto" style="height: 5rem">
          <app-foto-viewer [fichero]="articulo.foto"></app-foto-viewer>
        </div>
        <span *ngIf="!articulo.foto">Sin fotografía, pulse el botón de la cámara para realizar una...</span>
      </ng-template>
      -->
    </aoc-grid>
  `
})
export default class ArticuloFotoGridComponent implements OnInit {
  columns: AocGridColumn<Articulo>[];

  where: AocFilterQuery<Articulo> = {};

  restOptions: AocRestOptions<Articulo> = {
    populate: {
      foto: true
    }
  };

  soloSinFotoFormControl = new FormControl(false);
  soloSinFotoSubscription: Subscription;

  constructor(
    public modelConfig: ArticuloModelConfig,
    private mavermaUtils: MavermaUtilsService,
    private restService: AocRestService
  ) { }

  ngOnInit(): void {
    this.modelConfig = this.modelConfig.cloneWith({ allow: 'none', socketExtraSubscriptions: [Fichero] });
    this.columns = [
      {
        header: 'Artículo',
        display: this.modelConfig.transform,
        defaultSort: 'asc',
        orderBy: {
          codigo: 'auto',
          nombre: 'auto'
        }
      },
      {
        header: 'Foto',
        display: aocUiTplRef('foto'),
        size: '15rem',
        align: 'center',
      }
    ];
    this.soloSinFotoSubscription = this.soloSinFotoFormControl.valueChanges.subscribe((soloSinFoto: boolean) => {
      if (soloSinFoto) {
        this.where.foto = {id: null};
      } else {
        delete this.where.foto;
      }
      this.where = { ...this.where };
    })
  }

  async procesarClick(fileList: FileList, articulo: Articulo) {
    const file = fileList[0];
    const raw = await this.mavermaUtils.getRawDataFromFile(file);
    if (!articulo.foto) {
      articulo.foto = new Fichero();
    }
    articulo.foto.raw = raw;
    articulo.foto.nombre = file.name;
    articulo.foto.mime = file.type;
    articulo.foto.directorio = 'artículos';
    articulo.foto.referencia_classe = AocModelManager.tableName(Articulo);
    await this.restService.persist(Articulo, articulo);
    this.where = {...this.where};
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FicheroModelConfig } from '../../../model-configs/ficheros/fichero-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { Fichero } from '../../../models/ficheros/fichero';
import { AocModel, AocModelManager } from '@atlantis-of-code/aoc-client/core/models';
import { MavermaUtilsService } from '../../../services/maverma-utils.service';
import { NgControl, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { AocUiDialogService } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-dialog';
import { AocUiWindowDynRef } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocUiShareService } from '@atlantis-of-code/aoc-client/ui/common/services';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FicheroUtilsService } from '../../../services/fichero-utils.service';
import { aocUiTplRef } from '@atlantis-of-code/aoc-client/ui/common/types';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import { NgIf } from '@angular/common';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { AocUiFileSelectModule } from '@atlantis-of-code/aoc-client/ui/common/directives/aoc-ui-file-select';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { AocUiDropModule } from '@atlantis-of-code/aoc-client/ui/common/directives/aoc-ui-drop';
import { MimeToIconPipe } from '../../../pipes/mime-to-icon.pipe';

@Component({
  selector: "app-fichero-grid-field",
  standalone: true,
  imports: [
    AocGridModule,
    AocUiToolbarModule,
    AocUiItemModule,
    NgIf,
    AocUiButtonModule,
    AocUiFileSelectModule,
    ReactiveFormsModule,
    AocUiInputTextModule,
    AocUiDropModule,
    MimeToIconPipe
  ],
  template: `
    <aoc-grid-field
      [modelConfig]="modelConfig"
      [columns]="columns"
      aocUiDrop
      (itemsDrop)="procesarDrop($event)"
    >
      <ng-template aocUiToolbar="left">
        <aoc-ui-item *ngIf="subdirectorio">
          <strong
            >{{ subdirectorio.toLocaleLowerCase()[0].toUpperCase()
            }}{{ subdirectorio.toLocaleLowerCase().slice(1) }}</strong
          >
        </aoc-ui-item>
      </ng-template>
      <ng-template aocUiToolbar="right">
        <aoc-ui-item>
          <button
            aocUiButton
            label="Añadir ficheros"
            icon="file_open"
            (aocUiFileSelect)="procesarClick($event)"
            [multiple]="true"
          ></button>
        </aoc-ui-item>
      </ng-template>

      <ng-template aocGridCell="mime" let-mime="value">
        <i style="font-size: 1.37rem" class="material-symbols-rounded">{{
          mime | mimeToIcon
        }}</i>
      </ng-template>

      <ng-template aocGridCell="download" let-fichero="model">
        <i class="cloud_download" (click)="descargarFichero(fichero)"></i>
      </ng-template>

      <ng-template aocGridCell="edicionNombre" let-formControl="formControl">
        <input aocUiInputText [formControl]="formControl" />
      </ng-template>
    </aoc-grid-field>
  `,
})
export class FicheroGridFieldComponent implements OnInit {
  @Input()
  claseReferencia: new () => AocModel;

  @Input()
  directorio: string;

  @Input()
  subdirectorio: string;

  columns: AocGridColumn<Fichero>[];

  constructor(
    public modelConfig: FicheroModelConfig,
    private ngControl: NgControl,
    private router: Router,
    private http: HttpClient,
    private aocUiDialogService: AocUiDialogService,
    private aocUiShareService: AocUiShareService,
    private aocUiWindowDynRef: AocUiWindowDynRef,
    private ficheroUtilsService: FicheroUtilsService,
    private mavermaUtils: MavermaUtilsService
  ) {}

  ngOnInit(): void {
    this.columns = [
      {
        header: "",
        display: [Fichero.field.MIME, aocUiTplRef("mime")],
        size: "5rem",
        align: "center",
      },
      {
        header: "Nombre",
        display: Fichero.field.NOMBRE,
        defaultSort: "asc",
        // size: '30rem',
        editable: [
          aocUiTplRef("edicionNombre"),
          new UntypedFormControl(null, Validators.required),
        ],
      },
      {
        header: "Ruta de disco",
        display: (fichero) =>
          +fichero.id > 0
            ? `/${fichero.directorio}/${fichero.referencia_id}/${fichero.nombre}`
            : "Pendiente de guardar a disco",
        sortable: false,
      },
      {
        header: "",
        display: aocUiTplRef("download"),
        sortable: false,
        size: "5rem",
        align: "center",
      },
    ];
  }

  procesarDrop(items: DataTransferItem[]) {
    if (!items?.length) {
      return;
    }
    const files: File[] = [];
    for (const item of items) {
      files.push(item.getAsFile());
    }
    this.procesarFicheros(files).then();
  }

  procesarClick(event: FileList) {
    /*const files = await this.ficheroUtilsService.seleccionarFichero(true, this.aocUiWindowDynRef);
    if (files) {
      this.procesarFicheros(files).then();
    }*/
    this.procesarFicheros(Array.from(event)).then();
  }

  private async procesarFicheros(files: File[]) {
    const currentFicheros = this.ngControl.control.value as Fichero[];
    for (const file of files) {
      const raw = await this.mavermaUtils.getRawDataFromFile(file);
      const ficheroExistente = currentFicheros.find(
        (fichero) => fichero.nombre === file.name
      );
      if (ficheroExistente && +ficheroExistente.id > 0) {
        let promiseResolve: {
          (): void;
          (value: void | PromiseLike<void>): void;
        };
        const promise = new Promise<void>(
          (resolve) => (promiseResolve = resolve)
        );
        this.aocUiDialogService.confirm({
          header: "Atención",
          message: `El fichero ${file.name} ya existe, ¿quieres sobreescribirlo?`,
          okLabel: "SOBREESCRIBIR",
          cancelLabel: "CANCELAR",
          okCallback: () => {
            ficheroExistente.mime = file.type;
            ficheroExistente.raw = raw;
            promiseResolve();
          },
          cancelCallback: () => {
            // Do nothing
            promiseResolve();
          },
        });
        await promise;
      } else {
        let fichero: Fichero;
        if (ficheroExistente) {
          fichero = ficheroExistente;
        } else {
          fichero = new Fichero();
        }
        fichero.nombre = file.name;
        fichero.raw = raw;
        fichero.referencia_classe = AocModelManager.tableName(
          this.claseReferencia
        );
        fichero.directorio = this.directorio;
        fichero.subdirectorio = this.subdirectorio;
        fichero.mime = file.type;
        if (!ficheroExistente) {
          currentFicheros.push(fichero);
        }
      }
      this.ngControl.control.setValue(currentFicheros);
    }
  }

  descargarFichero(fichero: Fichero) {
    this.ficheroUtilsService.descargar(fichero);
  }
}

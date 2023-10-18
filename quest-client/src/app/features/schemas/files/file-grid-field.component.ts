import { NgIf, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgControl, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocModel, AocModelManager } from '@atlantis-of-code/aoc-client/core/models';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import { AocUiDropModule } from '@atlantis-of-code/aoc-client/ui/common/directives/aoc-ui-drop';
import { AocUiFileSelectModule } from '@atlantis-of-code/aoc-client/ui/common/directives/aoc-ui-file-select';
import { aocUiTplRef } from '@atlantis-of-code/aoc-client/ui/common/types';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { AocUiDialogService } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-dialog';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { FileModelConfig } from '../../../model-configs/files/file-model-config';
import { File as AppFile } from '../../../models/files/file';
import { MimeToIconPipe } from '../../../pipes/mime-to-icon.pipe';
import { FilesService } from '../../../services/files.service';

@Component({
  selector: 'app-file-grid-field',
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
    MimeToIconPipe,
    TitleCasePipe
  ],
  template: `
    <aoc-grid-field
      [modelConfig]="modelConfig"
      [columns]="columns"
      aocUiDrop
      (filesDrop)="processFiles($event)"
    >
      <ng-template aocUiToolbar="left">
        <aoc-ui-item>
          <button aocUiButton label="Click to add files or drag and drop onto the grid..." icon="upload_file"
                  (aocUiFileSelect)="procesarClick($event)"
                  [multiple]="true"></button>
        </aoc-ui-item>
      </ng-template>

      <ng-template aocUiToolbar="right">
        <aoc-ui-item *ngIf="fileSubdirectory">
          <strong>{{ fileSubdirectory | titlecase }}</strong>
        </aoc-ui-item>
      </ng-template>

      <ng-template aocGridCell="mime" let-mime="value">
        <i style="font-size: 1.37rem" class="material-symbols-rounded">{{mime | mimeToIcon}}</i>
      </ng-template>

      <ng-template aocGridCell="download" let-fichero="model">
        <i class="cloud_download" (click)="downloadFile(fichero)"></i>
      </ng-template>

      <ng-template aocGridCell="nameEdit" let-formControl="formControl">
        <input aocUiInputText [formControl]="formControl">
      </ng-template>
    </aoc-grid-field>
  `
})
export class FileGridFieldComponent implements OnInit {
  @Input()
  fileParentClass: new() => AocModel;

  @Input()
  fileDirectory: string;

  @Input()
  fileSubdirectory: string;

  columns: AocGridColumn<AppFile>[];

  constructor(
    public modelConfig: FileModelConfig,
    private ngControl: NgControl,
    private aocUiDialogService: AocUiDialogService,
    private filesService: FilesService
  ) { }

  ngOnInit(): void {
    this.columns = [
      {
        header: '',
        display: [ AppFile.field.MIME, aocUiTplRef('mime')],
        size: '5rem',
        align: 'center'
      },
      {
        header: 'Name',
        display: AppFile.field.NAME,
        defaultSort: 'asc',
        // size: '30rem',
        editable: [aocUiTplRef('nameEdit'), new UntypedFormControl(null, Validators.required)]
      }, {
        header: 'Path',
        display: (file) => +file.id > 0 ?
          `/${file.directory}/${file.ref_id}/${file.name}` :
          'Pending upload...',
        sortable: false
      },
      {
        header: '',
        display: aocUiTplRef('download'),
        sortable: false,
        size: '5rem',
        align: 'center'
      }
    ];
  }

  protected procesarClick(event: FileList) {
    this.processFiles(Array.from(event)).then();
  }

  protected async processFiles(files: File[]) {
    const currentAppFiles: AppFile[] = this.ngControl.control.value;
    for (const file of files) {
      const raw = await this.filesService.getRawDataFromFile(file);
      const existingFile = currentAppFiles.find(appFile => appFile.name === file.name);
      if (existingFile && +existingFile.id > 0) {
        let promiseResolve: { (): void; (value: void | PromiseLike<void>): void; };
        const promise = new Promise<void>(resolve => promiseResolve = resolve);
        this.aocUiDialogService.confirm({
          header: 'Attention',
          message: `The file ${file.name} already exists. Overwrite?`,
          okLabel: 'OVERWRITE',
          cancelLabel: 'CANCEL',
          okCallback: () => {
            existingFile.mime = file.type;
            existingFile.raw = raw;
            promiseResolve();
          },
          cancelCallback: () => {
            // Do nothing
            promiseResolve();
          }
        });
        await promise;
      } else {
        let appFile: AppFile;
        if (existingFile) {
          appFile = existingFile;
        } else {
          appFile = new AppFile();
        }
        appFile.name = file.name;
        appFile.raw = raw;
        appFile.ref_class = AocModelManager.tableName(this.fileParentClass);
        appFile.directory = this.fileDirectory;
        appFile.subdirectory = this.fileSubdirectory;
        appFile.mime = file.type;
        if (!existingFile) {
          currentAppFiles.push(appFile)
        }
      }
      this.ngControl.control.setValue(currentAppFiles);
    }
  }

  downloadFile(appFile: AppFile) {
    this.filesService.download(appFile)
  }
}

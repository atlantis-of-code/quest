import { NgIf, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { AocUiWindowDynService } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { FileModelConfig } from '../../../model-configs/files/file-model-config';
import { File as AppFile } from '../../../models/files/file';
import { QuestMimeToIconPipe } from '../../../pipes/quest-mime-to-icon.pipe';
import { QuestFilesService } from '../../../services/quest-files.service';
import { FilePreviewComponent } from './file-preview.component';

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
    QuestMimeToIconPipe,
    TitleCasePipe,
    FilePreviewComponent
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
                          (aocUiFileSelect)="clickProcess($event)"
                          [multiple]="true"></button>
              </aoc-ui-item>
          </ng-template>

          <ng-template aocUiToolbar="right">
              <aoc-ui-item *ngIf="fileSubdirectory">
                  {{ fileSubdirectory | titlecase }} folder
              </aoc-ui-item>
          </ng-template>

          <ng-template aocGridCell="mime" let-mime="value" let-appFile="model">
              <button aocUiButton class="aoc-grid-row-cell-actions-button" (click)="preview(appFile)"
                      [icon]="mime | questMimeToIcon" [title]="mime"></button>
          </ng-template>

          <ng-template aocGridCell="download" let-appFile="model">
              <button aocUiButton class="aoc-grid-row-cell-actions-button" (click)="downloadFile(appFile)"
                      icon="cloud_download"></button>
          </ng-template>

          <ng-template aocGridCell="nameEdit" let-formControl="formControl">
              <input aocUiInputText [formControl]="formControl">
          </ng-template>
      </aoc-grid-field>

      <ng-template #previewWindow>
          <app-file-preview [files]="ngControl.value" [index]="previewFileIndex"></app-file-preview>
      </ng-template>
  `
})
export class FileGridFieldComponent implements OnInit {
  @Input() private fileParentClass: new() => AocModel;
  @Input() private fileDirectory: string;
  @Input() protected fileSubdirectory: string;

  @ViewChild('previewWindow', { read: TemplateRef }) private previewWindowTemplateRef: TemplateRef<any>;

  protected columns: AocGridColumn<AppFile>[];
  protected previewFileIndex = 0;

  constructor(
    protected modelConfig: FileModelConfig,
    protected ngControl: NgControl,
    private aocUiDialogService: AocUiDialogService,
    private filesService: QuestFilesService,
    private aocUiWindowDynService: AocUiWindowDynService,
    private aocModelManager: AocModelManager
  ) { }

  ngOnInit(): void {
    this.columns = [
      {
        header: 'Name',
        display: AppFile.field.NAME,
        defaultSort: 'asc',
        // size: '30rem',
        editable: [aocUiTplRef('nameEdit'), new UntypedFormControl(null, Validators.required)]
      }, {
        header: 'Path',
        display: (file) => +file.id > 0 ?
          `/${file.directory}/${file.ref_id}/${file.subdirectory ? file.subdirectory + '/' : ''}${file.name}` :
          'Pending upload...',
        sortable: false
      },
      {
        header: 'Prev',
        headerTooltip: 'Click to preview file...',
        display: [ AppFile.field.MIME, aocUiTplRef('mime')],
        size: '5rem',
        align: 'center'
      },
      {
        header: '',
        headerTooltip: 'Click to download file...',
        display: aocUiTplRef('download'),
        sortable: false,
        size: '5rem',
        align: 'center'
      }
    ];
  }

  protected clickProcess(event: FileList) {
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
        appFile.ref_class = this.aocModelManager.tableName(this.fileParentClass);
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

  protected async preview(file: AppFile) {
    const files: AppFile[] = this.ngControl.control.value;
    this.previewFileIndex = files.findIndex(f => f.id === file.id);
    this.aocUiWindowDynService.open(this.previewWindowTemplateRef, {
      header: `Previsualización de ficheros`,
      // modal: true,
      height: 800,
      width: 1024
    });
  }

  protected downloadFile(appFile: AppFile) {
    this.filesService.download(appFile)
  }
}

import { NgIf } from '@angular/common';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { AocPdfViewerModule } from '@atlantis-of-code/aoc-client/components/aoc-pdf-viewer';
import { AocConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { AocUiWindowDynRef } from "@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window";
import { File as AppFile } from '../../../models/files/file';
import { QuestFilesService } from '../../../services/quest-files.service';

@Component({
  selector: 'app-file-preview',
  standalone: true,
  imports: [
    NgIf,
    AocPdfViewerModule,
    AocUiButtonModule,
  ],
  styles: [`
    .container {
      height: 100%;
      display: flex;
      flex-direction: column;

      .content {
        background-color: white; // variables.$aocSecondaryLightColor;
        border-radius: 3px;
        border: 1px solid #99b8df; //variables.$aocWidgetBorderColor;

        &.content-img {
          flex: 1;
          display: flex;
          padding: 1rem;

          > img {
            object-fit: scale-down;
            max-width: 100%;
            max-height: 100%;
          }
        }

        &.content-pdf {
          flex: 1;
        }
      }

      .footer {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;

        > .footer-left {
          flex: 1;
        }

        > .footer-center {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        > .footer-right {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          gap: .5rem;
        }
      }
    }
  `],
  template: `
    <div class="container aoc-ui-window-content-body">
      <div *ngIf="isImage" class="content content-img">
        <img [src]="url" crossorigin="use-credentials" alt="test">
      </div>
      <div *ngIf="isPdf" class="content content-pdf">
        <aoc-pdf-viewer [src]="url"></aoc-pdf-viewer>
      </div>
      <div class="footer" *ngIf="isImage || isPdf">
        <div class="footer-left">
          <span>{{isImage || isPdf ? fileName : 'No files to show'}}</span>
        </div>
        <div class="footer-center">
          <button aocUiButton icon="arrow_left" (click)="previous()"></button>
          <span>{{index + 1}}/{{files.length}}</span>
          <button aocUiButton icon="arrow_right" (click)="next()"></button>
        </div>
        <div class="footer-right">
          <button aocUiButton label="Download" icon="file_download" (click)="download()"></button>
          <button aocUiButton i18n-label="@@AOC_FORM_CLOSE_BUTTON" label="Close" icon="close" (click)="close()"></button>
        </div>
      </div>
    </div>
  `
})
export class FilePreviewComponent implements OnInit {
  @Input() set files(_files: AppFile[]) {
    this._files = _files;
    this.handleFile();
  }
  get files() {
    return this._files ?? [];
  }

  @Input() set index(_index: number) {
    this._index = _index;
  }
  get index() {
    return this._index;
  }

  private _files: AppFile[];
  private _index: number;

  protected isImage = false;
  protected isPdf = false;

  protected url: string;

  protected fileName: string;

  constructor(
    private aocConfig: AocConfig,
    private questFilesService: QuestFilesService,
    @Optional() protected aocUiWindowDynRef: AocUiWindowDynRef,
  ) {}

  ngOnInit() {
    this.handleFile();
  }

  protected download() {
    this.questFilesService.download(this.files[this.index]);
  }

  protected next() {
    this.index++;
    if (this.index === this.files.length) {
      this.index = 0;
    }
    this.handleFile();
  }

  protected previous() {
    this.index--;
    if (this.index == -1) {
      this.index = this.files.length - 1;
    }
    this.handleFile();
  }

  private handleFile() {
    if (this.index == null || this.index === -1 || !this.files?.length) {
      this.isImage = false;
      this.isPdf = false;
      return;
    }
    const appFile = this.files[this.index];
    this.fileName = appFile.name;
    this.aocUiWindowDynRef.header(`Preview for '${this.fileName}'`);
    if (appFile.mime.startsWith('image/')) {
      this.isImage = true;
      this.isPdf = false;
      this.url = `${this.aocConfig.SERVER_URL}file/get/${appFile.id}`;
    } else if (appFile.mime === 'application/pdf') {
      this.isPdf = true;
      this.isImage = false;
      this.url = `file/get/${appFile.id}`;
    } else {
      // TODO! convert using libreoffice?
      // this.isPdf = true;
      // this.isImage = false;
      // this.url = `file/transform/${appFile.id}`;
    }
  }

  protected close() {
    if (this.aocUiWindowDynRef) {
      this.aocUiWindowDynRef.close();
    }
  }
}

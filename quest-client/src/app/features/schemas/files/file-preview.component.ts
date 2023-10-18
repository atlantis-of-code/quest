import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AocPdfViewerModule } from '@atlantis-of-code/aoc-client/components/aoc-pdf-viewer';
import { AocConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { File as AppFile } from '../../../models/files/file';
import { FilesService } from '../../../services/files.service';

@Component({
  selector: 'app-file-preview',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    AocPdfViewerModule,
    AocUiButtonModule,
  ],
  styles: [`
    .container {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;

      .header {
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          margin-left: 0.5rem;
          font-weight: bold;
        }
        button {
          margin-right: 0.5rem;
        }
      }

      .content-img {
        flex: 1;
        display: flex;
        justify-content: center;
        img {
          object-fit: scale-down;
          max-width: 100%;
          max-height: 100%;
        }
      }

      .content-pdf {
        flex: 1;
      }

      .footer {
        height: 4rem;
        gap: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  `],
  template: `
    <div class="container">
      <div class="header">
        <span>'{{isImage || isPdf ? files[index].name : 'No files to show'}}'</span>
        <button *ngIf="isImage || isPdf" aocUiButton label="Download" icon="file_download" (click)="download()"></button>
      </div>
      <div *ngIf="isImage" class="content-img">
        <img [src]="url" crossorigin="use-credentials" alt="test">
      </div>
      <div *ngIf="isPdf" class="content-pdf">
        <aoc-pdf-viewer [src]="url"></aoc-pdf-viewer>
      </div>
      <div class="footer" *ngIf="isImage || isPdf">
        <button aocUiButton icon="arrow_left" (click)="previous()"></button>
        <span>{{index + 1}}/{{files.length}}</span>
        <button aocUiButton icon="arrow_right" (click)="next()"></button>
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

  constructor(
    private aocConfig: AocConfig,
    private fileService: FilesService
  ) {}

  ngOnInit() {
    this.handleFile();
  }

  protected download() {
    this.fileService.download(this.files[this.index]);
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
}

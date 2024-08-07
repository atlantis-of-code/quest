import { NgClass, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, forwardRef, inject, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AocConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocModel, AocModelManager } from '@atlantis-of-code/aoc-client/core/models';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { AocUiDropModule } from '@atlantis-of-code/aoc-client/ui/common/directives/aoc-ui-drop';
import { AocUiFileSelectModule } from '@atlantis-of-code/aoc-client/ui/common/directives/aoc-ui-file-select';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { AocUiToastMessageService } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-toast';
import { AocUiTooltipModule } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-tooltip';
import { AocUiWindowDynRef, AocUiWindowDynService } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { firstValueFrom } from 'rxjs';
import { File as AppFile } from '../../../models/files/file';
import { QuestFilesService } from '../../../services/quest-files.service';

@Component({
  selector: 'app-file-photo-field',
  standalone: true,
  imports: [
    AocUiDropModule,
    AocUiFileSelectModule,
    NgIf,
    AocUiInputTextModule,
    AocUiButtonModule,
    NgClass,
    AocUiTooltipModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilePhotoFieldComponent),
      multi: true
    }
  ],
  styles: [`
    .container {
      position: relative;
      background-color: #ffffff;
      border: 1px solid #a6a6a6;
      cursor: pointer;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    button {
      position: absolute;
      bottom: 0.5rem;
      &.delete {
        left: 0.5rem;
      }
      &.red {
        color: white;
        background-color: red;
      }
      &.paste {
        right: 0.5rem;
      }
    }

    .hint {
      text-align: center;
    }

    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    .deleted-image {
      position: absolute;
      content: '';
      background: crimson;
      display: block;
      width: 50%;
      height: 0.15rem;
      transform: rotate(-45deg);
      animation: fadeIn 0.3s;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }

    .deleted-image-rotate {
      transform: rotate(45deg);
    }

    img {
      &.blur {
        filter: blur(4px);
        background-color: #ffffff;
      }
    }
  `],
  template: `
    <div
      class="container"
      aocUiDrop
      (filesDrop)="processFiles($event)"
      (aocUiFileSelect)="processFiles(Array.from($event))"
      (mouseenter)="showButtons = true"
      (mouseleave)="showButtons = false"
    >
      <img
        *ngIf="src"
        style="position: absolute; width: 100%; height: 100%; object-fit: contain"
        [src]="src"
        [alt]="appFile?.name"
        crossorigin="use-credentials"
        [ngClass]="{ blur: appFile && appFile.isMarkedForDeletion() }"
      >

      <div *ngIf="!src" class="hint">Click here or drop an image...</div>

      <div *ngIf="appFile && appFile.isMarkedForDeletion()" class="deleted-image"></div>
      <div *ngIf="appFile && appFile.isMarkedForDeletion()" class="deleted-image deleted-image-rotate"></div>

      <button
        *ngIf="appFile && showButtons"
        [ngClass]="{ delete: true, red: !appFile.isMarkedForDeletion() }"
        aocUiButton
        [icon]="appFile.isMarkedForDeletion() ? 'refresh' : 'delete'"
        [label]="appFile.isMarkedForDeletion() ? 'Undo delete' : 'Delete'"
        (click)="handleDeletion($event)"
      ></button>
      <button
        *ngIf="showButtons"
        class="paste"

        aocUiButton
        icon="content_paste"
        label="Paste"
        (click)="paste($event)"
        aocUiTooltip="Paste an image, base64 string or url"
      ></button>
    </div>
  `
})
export class FilePhotoFieldComponent implements ControlValueAccessor {
  @Input() public fileParentClass: new() => AocModel;
  @Input() public fileDirectory: string;
  @Input() public fileSubdirectory: string;
  @Input() public showButtons = false;

  protected src: string;
  protected appFile: AppFile;
  protected readonly Array = Array;

  changeFn: (appFile: AppFile) => void = () => {};
  touchedFn: () => void = () => {};

  private filesService = inject(QuestFilesService);
  private aocUiToastMessageService = inject(AocUiToastMessageService);
  private aocModelManager = inject(AocModelManager);
  private aocUiWindowDynService = inject(AocUiWindowDynService);
  private aocUiWindowDynRef = inject(AocUiWindowDynRef);
  private httpClient = inject(HttpClient);
  private aocConfig = inject(AocConfig);

  registerOnChange(fn: any): void {
    this.changeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.touchedFn = fn;
  }

  writeValue(appFile: AppFile): void {
    this.appFile = appFile;
    if (this.appFile?.id) {
      this.src = this.filesService.getDownloadLink(appFile, true);
    }
  }

  protected async processFiles(files: File[]) {
    if (files.length !== 1) {
      return;
    }
    const file = files[0];
    if (['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp'].includes(file.type)) {
      if (!this.appFile) {
        this.appFile = new AppFile();
      }
      this.appFile.name = file.name;
      this.appFile.raw = await this.filesService.getRawDataFromFile(file);
      this.appFile.mime = file.type;
      this.appFile.ref_class = this.aocModelManager.tableName(this.fileParentClass);
      this.appFile.directory = this.fileDirectory;
      this.appFile.subdirectory = this.fileSubdirectory;
      this.src = this.appFile.raw;
      this.changeFn(this.appFile);
    } else {
      this.aocUiToastMessageService.showError('File must be an image');
    }
  }

  protected async paste(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    const items = await navigator.clipboard.read();
    const item = items[0];
    const typeImage = item?.types.find(t => t.startsWith('image/'));
    if (typeImage) {
      const blob = await item.getType(typeImage);
      const file = new File([blob], crypto.randomUUID(), { type: blob.type });
      await this.processFiles([file]);
      return;
    }
    const typeText = item?.types.find(t => t.startsWith('text'));
    if (typeText) {
      const candidate = await navigator.clipboard.readText();
      if (candidate.startsWith('http')) {
        await this.processRemoteImage(candidate);
        return;
      } else if (candidate.startsWith('data')) {
        await this.processFiles([this.dataURLtoFile(candidate)]);
        return;
      }
    }
    this.aocUiToastMessageService.showWarning('Not a valid image or URL...');

  }

  protected async processRemoteImage(url: string) {
    try {
      const blob = await this.corsAnywhere(url);
      const nameSplit = url.split('/');
      const file = new File([blob], nameSplit[nameSplit.length - 1] ?? `${crypto.randomUUID()}`, {type: blob.type ?? 'image/jpeg'});
      await this.processFiles([file]);
    } catch (e) {
      this.aocUiToastMessageService.showError(e.message);
    }
  }


  protected async handleDeletion(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    if (!this.appFile.id || +this.appFile.id < 0) {
      this.appFile = null;
      this.src = null;
      this.changeFn(null);
      return;
    }
    if (this.appFile.isMarkedForDeletion()) {
      this.appFile.unmarkForDeletion();
    } else {
      this.appFile.markForDeletion();
    }
  }

  private corsAnywhere(url: string): Promise<Blob> {
    return firstValueFrom(
      this.httpClient.get<Blob>(`${this.aocConfig.SERVER_URL}cors-anywhere?url=${url}`, {
        responseType: 'blob' as 'json',
        withCredentials: true
      })
    );
  }

  private dataURLtoFile(dataurl: string) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], crypto.randomUUID(), {type:mime});
  }
}

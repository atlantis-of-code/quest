import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { QuestUtilsService } from '../../../services/quest-utils.service';
import { AocUiShareService } from '@atlantis-of-code/aoc-client/ui/common/services';
import { Router } from '@angular/router';
import { AocUiWindowDynRef } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocUiToastMessageService } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-toast';
import { AocModel, AocModelManager } from '@atlantis-of-code/aoc-client/core/models';
import { FilesService } from '../../../services/files.service';
import { AocUiDropModule } from '@atlantis-of-code/aoc-client/ui/common/directives/aoc-ui-drop';
import { AocUiFileSelectModule } from '@atlantis-of-code/aoc-client/ui/common/directives/aoc-ui-file-select';
import { Fichero } from '../../../models/ficheros/fichero';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-foto-field',
  standalone: true,
  template: `
    <!-- TODO: move css when integrating with aoc -->
    <div
      style="position: relative; background-color: #ffffff; border: 1px solid #a6a6a6; cursor: pointer; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"
      aocUiDrop (itemsDrop)="procesarDrop($event)"
      (aocUiFileSelect)="procesarClick($event)"
    >
      <img *ngIf="src" style="position: absolute; width: 100%; height: 100%; object-fit: contain" [src]="src"
           crossorigin="use-credentials">
      <div *ngIf="!src">Arrastre una imagen o haga clic</div>
    </div>
  `,
  imports: [
    AocUiDropModule,
    AocUiFileSelectModule,
    NgIf
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FotoFieldComponent),
      multi: true
    }
  ]
})
export class FotoFieldComponent implements ControlValueAccessor {
  @Input()
  claseReferencia: new() => AocModel;

  @Input()
  directorio: string;

  @Input()
  subdirectorio: string;

  src: string;
  fichero: Fichero;

  changeFn: (fichero: Fichero) => void = () => {};
  touchedFn: () => void = () => {};

  constructor(
    private aocUiShareService: AocUiShareService,
    private router: Router,
    private aocUiWindowDynRef: AocUiWindowDynRef,
    private aocUiToastMessageService: AocUiToastMessageService,
    private ficheroUtilsService: FilesService,
    private mavermaUtils: QuestUtilsService
  ) { }

  registerOnChange(fn: any): void {
    this.changeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.touchedFn = fn;
  }

  writeValue(fichero: Fichero): void {
    this.fichero = fichero;
    if (this.fichero?.id) {
      this.src = this.ficheroUtilsService.getEnlaceDescarga(fichero, true);
    }
  }

  async procesarDrop(items: DataTransferItem[]) {
    if (items.length !== 1) {
      return;
    }
    const item = items[0];
    const file = item.getAsFile();
    this.procesarFichero(file).then();
  }

  procesarClick(event: FileList) {
    this.procesarFichero(event[0]).then();
    /*
    const file = await this.ficheroUtilsService.seleccionarFichero(false, this.aocUiWindowDynRef, 'image/*');
    if (file) {
      this.procesarFichero(file).then();
    }
    */
  }

  private async procesarFichero(file: File) {
    const raw = await this.mavermaUtils.getRawDataFromFile(file);
    if (['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp'].includes(file.type)) {
      if (!this.fichero) {
        this.fichero = new Fichero();
      }
      this.fichero.nombre = file.name;
      this.fichero.raw = raw;
      this.fichero.mime = file.type;
      this.fichero.referencia_classe = AocModelManager.tableName(this.claseReferencia as any);
      this.fichero.directorio = this.directorio;
      this.fichero.subdirectorio = this.subdirectorio;
      this.src = raw;
      this.changeFn(this.fichero);
    } else {
      this.aocUiToastMessageService.showError('El tipo de fichero debe ser una imagen', 'Atención');
    }
  }
}

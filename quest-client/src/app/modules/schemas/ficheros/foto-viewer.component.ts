import { Component, Input } from '@angular/core';
import { Fichero } from '../../../models/ficheros/fichero';
import { AocRestService } from '@atlantis-of-code/aoc-client/core/services';
import { FicheroUtilsService } from '../../../services/fichero-utils.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-foto-viewer',
  standalone: true,
  imports: [
    NgIf
  ],
  template: `
    <div
      style="position: relative; background-color: #ffffff; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"
    >
      <img *ngIf="src" style="position: absolute; width: 100%; height: 100%; object-fit: contain" [src]="src"
           crossorigin="use-credentials">
    </div>
  `
})
export class FotoViewerComponent {

  @Input()
  set fichero(f: Fichero) {
    this.src = undefined;
    if (f) {
      this.procesarFichero(f).then();
    }
  }

  src: string;

  constructor(
    private aocRestService: AocRestService,
    private ficheroUtilsService: FicheroUtilsService
  ) { }

  async procesarFichero(fichero: Fichero) {
    if(fichero.isMarkedAsRef()) {
      fichero = await this.aocRestService.findOne(Fichero, {id: fichero.id});
    }
    this.src = this.ficheroUtilsService.getEnlaceDescarga(fichero, true);
  }
}

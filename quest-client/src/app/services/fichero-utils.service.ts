import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fichero } from '../models/ficheros/fichero';
import { AocConfig } from '@atlantis-of-code/aoc-client/core/configs';


@Injectable({
  providedIn: 'root'
})
export class FicheroUtilsService {
  constructor(
    private httpClient: HttpClient,
    private aocConfig: AocConfig
  ) {
  }

  getEnlaceDescarga(fichero: Fichero, addModificationTime = false) {
    return `${this.aocConfig.SERVER_URL}ficheros/download/${fichero.id}${addModificationTime ? '?' + fichero.modification_time : ''}`;
  }

  descargar(fichero: Fichero) {
    const src = this.getEnlaceDescarga(fichero);
    this.httpClient.get(src, {
      responseType: 'blob' as 'json',
      withCredentials: true
    }).subscribe((response: any) => {
      const dataType = response.type;
      const binaryData = [];
      binaryData.push(response);
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
      downloadLink.setAttribute('download', fichero.nombre);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  }

  /*
  async seleccionarFichero<B extends boolean>(
    multiple: B,
    aocUiWindowDynRef?: AocUiWindowDynRef,
    accept?: string
  ): Promise<(B extends true ? File[] : File) | null> {
    return new Promise<(B extends true ? File[] : File) | null>((resolve) => {
      const aocUiShareId = this.aocUiShareService.register();
      this.aocUiShareService.getResponseObservable(aocUiShareId).pipe(first()).subscribe((response: 'close' | (B extends true ? File[] : File | null)) => {
        if (response === 'close') {
          resolve(null); // reject with try catch?
        } else {
          resolve(response);
        }
      });
      this.router.navigate(
        ['ficheros', 'fichero-select-form', {
          parentWindowNumber: aocUiWindowDynRef?.windowNumber,
          aocUiShareId,
          multiple,
          accept
        } as AocUiWindowDynConfig]
      ).then();
    });
  }
  */
}

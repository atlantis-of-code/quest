import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AocConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { File as QuestFile } from '../models/files/file';


@Injectable({
  providedIn: 'root'
})
export class QuestFilesService {
  constructor(
    private httpClient: HttpClient,
    private aocConfig: AocConfig
  ) {}

  getRawDataFromFile(file: File) {
    return new Promise<string>(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
    });
  }

  getDownloadLink(file: QuestFile, addModificationTime = false) {
    return `${this.aocConfig.SERVER_URL}file/download/${file.id}${addModificationTime ? '?' + file.modification_time : ''}`;
  }

  download(file: QuestFile) {
    const src = this.getDownloadLink(file);
    this.httpClient.get(src, {
      responseType: 'blob' as 'json',
      withCredentials: true
    }).subscribe((response: any) => {
      const dataType = response.type;
      const binaryData = [];
      binaryData.push(response);
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
      downloadLink.setAttribute('download', file.name);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  }
}

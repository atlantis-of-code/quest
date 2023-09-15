import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { EmbInfoContacto } from '../models/abstract/emb-info-contacto';

@Injectable({providedIn: 'root'})
@Pipe({
  name: 'telefonos',
  pure: true,
  standalone: true
})
export class TelefonosPipe implements PipeTransform {
  transform(embInfo: EmbInfoContacto): any {
    const telefonos = [];
    if (embInfo.telefono1) {
      telefonos.push(embInfo.telefono1);
    }
    if (embInfo.telefono2) {
      telefonos.push(embInfo.telefono2);
    }
    if (embInfo.telefono3) {
      telefonos.push(embInfo.telefono3);
    }
    return telefonos.join(' - ');
  }
}

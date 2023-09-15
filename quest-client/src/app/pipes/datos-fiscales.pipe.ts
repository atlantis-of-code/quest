import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { EmbDatosFiscales } from '../models/abstract/emb-datos-fiscales';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'datosFiscalesPipe',
  pure: true,
  standalone: true,
})
export class DatosFiscalesPipe implements PipeTransform {
  transform(emb: EmbDatosFiscales): any {
    const full = [emb.nombre_fiscal];
    if (emb.apellido_1) {
      full.push(emb.apellido_1);
    }
    if (emb.apellido_2) {
      full.push(emb.apellido_2);
    }
    return full.join(' ');
  }
}

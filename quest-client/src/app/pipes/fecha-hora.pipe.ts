import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Injectable({providedIn: 'root'})
@Pipe({
  name: 'fechaHora',
  pure: true,
  standalone: true
})
export class FechaHoraPipe implements PipeTransform {
  transform(fecha: Date): string {
    if (!fecha) {
      return null;
    }
    return format(fecha, 'dd/MM/yyyy HH:mm:ss');
  }
}

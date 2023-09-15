import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'fechaPipe',
  pure: true,
  standalone: true
})
export class FechaPipe implements PipeTransform {
  transform(value: any): any {
    if (!value) {
      return null;
    }
    return formatDate(value, 'dd/MM/yyyy', 'es');
  }
}

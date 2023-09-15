import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { formatCurrency } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'precio',
  pure: true,
  standalone: true
})
export class PrecioPipe implements PipeTransform {

  transform(precio: string) {
    return formatCurrency(+precio, 'es', '€', 'EUR');
  }

}

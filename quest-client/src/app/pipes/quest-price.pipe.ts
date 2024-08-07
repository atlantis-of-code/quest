import { formatCurrency } from '@angular/common';
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'questPrice',
  pure: true,
  standalone: true
})
export class QuestPricePipe implements PipeTransform {

  transform(precio: string) {
    return formatCurrency(+precio, 'en', '$', 'USD');
  }

}

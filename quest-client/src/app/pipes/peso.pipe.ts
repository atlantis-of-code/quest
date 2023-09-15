import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { formatNumber } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'peso',
  pure: true,
  standalone: true
})
export class PesoPipe implements PipeTransform {
  transform(peso: string) {
    return `${formatNumber(+peso, 'es', '1.2-2')} Kg.`;
  }
}

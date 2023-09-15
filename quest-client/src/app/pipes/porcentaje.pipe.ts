import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { formatNumber } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'porcentaje',
  pure: true,
  standalone: true
})
export class PorcentajePipe implements PipeTransform {

  transform(porcentaje: string) {
    return `${formatNumber(+porcentaje, 'es', '1.2-2')} %`;
  }

}

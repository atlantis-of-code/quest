import { formatNumber } from '@angular/common';
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'questPercent',
  pure: true,
  standalone: true
})
export class QuestPercentPipe implements PipeTransform {

  transform(value: string) {
    return `${formatNumber(+value, 'en', '1.2-2')} %`;
  }

}

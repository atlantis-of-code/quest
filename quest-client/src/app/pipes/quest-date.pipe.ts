import { inject, Injectable, Pipe, PipeTransform } from '@angular/core';
import { AocUiDatetimePickerFormatsToken } from '@atlantis-of-code/aoc-client/ui/common/tokens';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'questDate',
  pure: true,
  standalone: true
})
export class QuestDatePipe implements PipeTransform {
  private formats = inject(AocUiDatetimePickerFormatsToken);

  transform(value: any): any {
    if (!value) {
      return '';
    }
    return format(value, this.formats.date)
  }
}

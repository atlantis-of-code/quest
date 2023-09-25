import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Budget } from '../models/invoicing/budget';
import { DeliveryNote } from '../models/invoicing/delivery-note';
import { Invoice } from '../models/invoicing/invoice';
import { Ticket } from '../models/invoicing/ticket';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'documentoPipe',
  pure: true,
  standalone: true
})
export class DocumentPipe implements PipeTransform {
  transform(document: Invoice | DeliveryNote | Budget | Ticket): string {
    return `${document.fiscalYear.year}/${document.series.name ?? ''}${document.number.toString().padStart(4, '0')}`;
  }
}

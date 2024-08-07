import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { DocumentTemplate } from '../models/templates/document-template';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'questDocumentPipe',
  pure: true,
  standalone: true
})
export class QuestDocumentPipe implements PipeTransform {
  transform(document: DocumentTemplate, addFiscalYear = true): string {
    if (!document) {
      return ;
    }
    return `${addFiscalYear && document.fiscalYear? document.fiscalYear?.year + '/' : '' }${document.series?.name ?? ''}${document.number?.toString().padStart(5, '0') ?? '#####'}`;
  }
}

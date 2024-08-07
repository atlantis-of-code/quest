import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'questMimeToIcon',
  pure: true,
  standalone: true
})
export class QuestMimeToIconPipe implements PipeTransform {
  transform(mime: string): string {
    if (mime.startsWith('video')) {
      return 'movie';
    } else if (mime.startsWith('image')) {
      return 'image';
    } else if (mime === 'application/pdf') {
      return 'picture_as_pdf';
    } else if (mime.startsWith('audio')) {
      return 'music_note';
    } else if (
      [
        'application/vnd.oasis.opendocument.text',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'application/rtf'
      ].includes(mime)
    ) {
      return 'article';
    } else if (
      [
        'application/vnd.oasis.opendocument.spreadsheet',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ].includes(mime)
    ) {
      return 'functions';
    } else if (
      [
        'application/vnd.oasis.opendocument.presentation',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ].includes(mime)
    ) {
      return 'slideshow';
    }
    return 'draft';
  }
}

import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Factura } from '../models/facturacion/factura';
import { Albaran } from '../models/facturacion/albaran';
import { Presupuesto } from '../models/facturacion/presupuesto';
import { Ticket } from '../models/facturacion/ticket';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'documentoPipe',
  pure: true,
  standalone: true
})
export class DocumentoPipe implements PipeTransform {

  transform<T>(documento: Albaran | Factura | Presupuesto | Ticket/*Pick<EmbDocumento, 'anyoFiscal' | 'serie' | 'numero'>*/): string {
    return `${documento.anyoFiscal?.anyo}/${documento.serie ?? ''}${documento.numero?.toString().padStart(4, '0')}`;
  }

}

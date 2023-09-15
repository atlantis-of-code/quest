// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Albaran } from '../facturacion/albaran';
import { Factura } from '../facturacion/factura';
import { Presupuesto } from '../facturacion/presupuesto';
import { Ticket } from '../facturacion/ticket';

export class AnyoFiscal extends MavermaModel {

  static field = {
    ACTUAL: 'actual',
    ANYO: 'anyo',
  };


  static collection = {
    ALBARAN: 'albaranCollection',
    FACTURA: 'facturaCollection',
    PRESUPUESTO: 'presupuestoCollection',
    TICKET: 'ticketCollection',
  };


  // Fields

  actual?: boolean;
  anyo!: number;

  // Mapped collections and inversed models

  albaranCollection: Albaran[];
  facturaCollection: Factura[];
  presupuestoCollection: Presupuesto[];
  ticketCollection: Ticket[];

}

import { EntityName, EventArgs, EventSubscriber, FindOneOptions, Subscriber, Utils } from '@mikro-orm/core';
import { Factura } from '../../entities/facturacion/factura';
import { Albaran } from '../../entities/facturacion/albaran';
import { Presupuesto } from '../../entities/facturacion/presupuesto';
import { Ticket } from '../../entities/facturacion/ticket';

@Subscriber()
export class FacturacionSubscriber implements EventSubscriber<Factura | Albaran | Presupuesto | Ticket> {

  getSubscribedEntities(): EntityName<Factura | Albaran | Presupuesto | Ticket>[] {
    return [Factura, Albaran, Presupuesto, Ticket];
  }

  async beforeCreate(args: EventArgs<Factura | Albaran | Presupuesto | Ticket>) {
    await this.asignarNumeroYFecha(args);
  }

  async beforeUpdate(args: EventArgs<Factura | Albaran | Presupuesto | Ticket>) {
    await this.asignarNumeroYFecha(args);
  }

  async asignarNumeroYFecha(args: EventArgs<Factura | Albaran | Presupuesto | Ticket>) {
    const documento = args.entity;
    if (!documento.fecha) {
      documento.fecha = new Date();
    }
    if (!documento.numero) {
      const anyoFiscalId = documento.anyoFiscal.id;
      const serie = documento.serie;
      const latest = await args.em.findOne(
        Utils.className(documento.constructor.name),
        {
          'anyoFiscal': anyoFiscalId,
          serie
        },
        {
          orderBy: {
            fecha: 'desc'
          }
        } as FindOneOptions<any>
      )
      if (!latest) {
        documento.numero = 1;
      } else {
        documento.numero = latest.numero + 1;
      }
    }
  }

}

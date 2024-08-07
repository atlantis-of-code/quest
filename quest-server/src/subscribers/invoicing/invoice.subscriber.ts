import { AocSubscriber } from '@atlantis-of-code/aoc-server';
import { EntityName, EventArgs, EventSubscriber, raw } from '@mikro-orm/core';
import { SqlEntityManager } from '@mikro-orm/postgresql';
import { Payment } from '../../entities/accounting/payment';
import { Invoice } from '../../entities/invoicing/invoice';

@AocSubscriber
export class InvoiceSubscriber implements EventSubscriber<Invoice> {
  getSubscribedEntities(): EntityName<Invoice>[] {
    return [ Invoice ];
  }

  async onLoad(args: EventArgs<Invoice>) {
    const invoice = args.entity;
    const em = args.em as SqlEntityManager;
    const sum = await em.qb(Payment)
        .select(raw(`sum(${Payment.field.QUANTITY}) total`))
        .where({invoiceCollection: invoice.id})
        .execute('run');
    invoice.total_payment = sum.row.total ?? '0';
  }
}

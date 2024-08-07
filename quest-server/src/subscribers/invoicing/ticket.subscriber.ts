import { AocSubscriber } from '@atlantis-of-code/aoc-server';
import { EntityName, EventArgs, EventSubscriber, raw } from '@mikro-orm/core';
import { SqlEntityManager } from '@mikro-orm/postgresql';
import { Payment } from '../../entities/accounting/payment';
import { Ticket } from '../../entities/invoicing/ticket';

@AocSubscriber
export class TicketSubscriber implements EventSubscriber<Ticket> {
  getSubscribedEntities(): EntityName<Ticket>[] {
    return [ Ticket ];
  }

  async onLoad(args: EventArgs<Ticket>) {
    const ticket = args.entity;
    const em = args.em as SqlEntityManager;
    const sum = await em.qb(Payment)
        .select(raw(`sum(${Payment.field.QUANTITY}) total`))
        .where({ticketCollection: ticket.id})
        .execute('run');
    ticket.total_payment = sum.row.total ?? '0';
  }
}

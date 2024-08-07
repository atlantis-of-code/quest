import { AocSubscriber } from "@atlantis-of-code/aoc-server";
import { EntityName, EventArgs, EventSubscriber, helper } from '@mikro-orm/core';
import { Budget } from '../../entities/invoicing/budget';
import { DeliveryNote } from '../../entities/invoicing/delivery-note';
import { Invoice } from '../../entities/invoicing/invoice';
import { Ticket } from '../../entities/invoicing/ticket';
import { DocumentTemplate } from '../../entities/templates/document-template';

@AocSubscriber
export class DocumentSubscriber implements EventSubscriber<DocumentTemplate> {
  getSubscribedEntities(): EntityName<DocumentTemplate>[] {
    return [ Invoice, DeliveryNote, Budget, Ticket as never ];
  }

  async beforeCreate(args: EventArgs<DocumentTemplate>) {
    // Get the generic document, can be any of invoice, delivery note, budget or ticket
    const documentTemplate = args.entity;
    // Assign a new date from the transaction context (to be the same among all documents persisted at the same time)
    documentTemplate.date = args.em.getTransactionContext().date;
    // Try to find the latest of this class in the database, observe Mikro helper getting the class via the meta
    // information. The same class could be found with `documentTemplate.constructor`
    const latestInDatabase = await args.em.findOne<DocumentTemplate>(helper(documentTemplate).__meta.class, {
      series: documentTemplate.series,
    }, {
      orderBy: {
        number: 'desc'
      }
    });
    // Gent next number or 1 if any document exists in the database
    documentTemplate.number = latestInDatabase ? latestInDatabase.number + 1 : 1;
  }
}

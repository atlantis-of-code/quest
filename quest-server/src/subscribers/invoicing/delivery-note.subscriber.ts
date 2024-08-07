import { AocSubscriber } from "@atlantis-of-code/aoc-server";
import { EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';
import { DeliveryNote } from '../../entities/invoicing/delivery-note';

@AocSubscriber
export class DeliveryNoteSubscriber implements EventSubscriber<DeliveryNote> {
  getSubscribedEntities(): EntityName<DeliveryNote>[] {
    return [DeliveryNote];
  }

  beforeDelete(args: EventArgs<DeliveryNote>): void | Promise<void> {
    const deliveryNote = args.entity;
    if (deliveryNote.invoice) {
      throw new Error(`The delivery note cannot be deleted because it is currently assigned to an invoice. To delete it,
      you must first unassign it from the related invoice to recalculate totals and maintain data consistency. After that, deletion will be allowed.`);
    }
  }
}

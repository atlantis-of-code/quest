import {EntityManager, EntityName, EventArgs, EventSubscriber} from "@mikro-orm/core";
import {Tax} from "../../entities/common/tax";
import { IdentityDocumentType } from "../../entities/common/identity-document-type";
import { AocSubscriber } from "@atlantis-of-code/aoc-server";

@AocSubscriber
export class TaxSubscriber implements EventSubscriber<Tax> {
  getSubscribedEntities(): EntityName<Tax>[] {
    return [ Tax ];
  }

  async afterCreate(args: EventArgs<Tax>) {
    const tax = args.entity;
    if (tax.is_default) {
      await this.updateOthersToNotDefault(tax, args.em);
    }
  }

  async afterUpdate(args: EventArgs<Tax>) {
    const tax = args.entity;
    const originalTax = args.changeSet.originalEntity;
    if (!originalTax.is_default && tax.is_default) {
      await this.updateOthersToNotDefault(tax, args.em);
    }
  }

  private async updateOthersToNotDefault(tax: Tax, em: EntityManager) {
    await em.nativeUpdate(Tax, { id: { $ne: tax.id }}, { is_default: false });
  }
}

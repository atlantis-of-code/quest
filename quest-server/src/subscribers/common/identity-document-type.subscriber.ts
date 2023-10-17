import { EntityManager, EntityName, EventArgs, EventSubscriber, Subscriber } from '@mikro-orm/core';
import { IdentityDocumentType } from '../../entities/common/identity-document-type';

@Subscriber()
export class IdentityDocumentTypeSubscriber implements EventSubscriber<IdentityDocumentType> {
  getSubscribedEntities(): EntityName<IdentityDocumentType>[] {
    return [ IdentityDocumentType ]
  }

  async afterCreate(args: EventArgs<IdentityDocumentType>) {
    const identityDocumentType = args.entity;
    if (identityDocumentType.is_default) {
      await this.updateOthersToNotDefault(identityDocumentType, args.em);
    }
  }

  async afterUpdate(args: EventArgs<IdentityDocumentType>) {
    const oldWasDefault = args.changeSet.originalEntity.is_default;
    const identityDocumentType = args.entity;
    if (!oldWasDefault && identityDocumentType.is_default) {
      await this.updateOthersToNotDefault(identityDocumentType, args.em);
    }
  }

  private async updateOthersToNotDefault(identityDocumentType: IdentityDocumentType, em: EntityManager) {
    await em.nativeUpdate(IdentityDocumentType, { id: { $ne: identityDocumentType.id }}, { is_default: false });
  }
}

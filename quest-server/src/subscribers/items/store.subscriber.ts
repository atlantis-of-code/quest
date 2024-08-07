import { AocSubscriber } from "@atlantis-of-code/aoc-server";
import { EntityManager, EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';
import { Store } from '../../entities/items/store';

@AocSubscriber
export class StoreSubscriber implements EventSubscriber<Store> {
  getSubscribedEntities(): EntityName<Store>[] {
    return [ Store ];
  }

  async afterCreate(args: EventArgs<Store>) {
    const store = args.entity;
    if (store.is_default) {
      await this.updateOthersToNotDefault(store, args.em);
    }
  }

  async afterUpdate(args: EventArgs<Store>) {
    const store = args.entity;
    const originalStore = args.changeSet.originalEntity;
    if (!originalStore.is_default && store.is_default) {
      await this.updateOthersToNotDefault(store, args.em);
    }
  }

  private async updateOthersToNotDefault(store: Store, em: EntityManager) {
    await em.nativeUpdate(
      Store,
      { id: { $ne: store.id }},
      { is_default: false }
    )
  }
}

import { AocSubscriber } from "@atlantis-of-code/aoc-server";
import { EntityManager, EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';
import { Gender } from '../../entities/common/gender';

@AocSubscriber
export class GenderSubscriber implements EventSubscriber<Gender> {
  getSubscribedEntities(): EntityName<Gender>[] {
    return [ Gender ];
  }

  async afterCreate(args: EventArgs<Gender>) {
    const gender = args.entity;
    if (gender.is_default) {
      await this.updateOthersToNotDefault(gender, args.em);
    }
  }

  async afterUpdate(args: EventArgs<Gender>) {
    const gender = args.entity;
    const originalGender = args.changeSet.originalEntity;
    if (!originalGender.is_default && gender.is_default) {
      await this.updateOthersToNotDefault(gender, args.em);
    }
  }

  private async updateOthersToNotDefault(gender: Gender, em: EntityManager) {
    await em.nativeUpdate(
      Gender,
      { id: { $ne: gender.id }},
      { is_default: false }
    )
  }
}

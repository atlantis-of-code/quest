import { AocSubscriber } from '@atlantis-of-code/aoc-server';
import { EventArgs, EventSubscriber } from '@mikro-orm/core';
import { QuestEntity } from '../entities/quest-entity';

@AocSubscriber
export class QuestSubscriber implements EventSubscriber<QuestEntity> {
  async beforeCreate(args: EventArgs<QuestEntity>): Promise<void> {
    const { entity, em } = args;
    entity.creation_user = em.getTransactionContext()?.user?.email;
    entity.creation_time = em.getTransactionContext()?.date?.getTime();
  }

  async beforeUpdate(args: EventArgs<QuestEntity>): Promise<void> {
    const { entity, em } = args;
    entity.modification_user = em.getTransactionContext()?.user?.email;
    entity.modification_time = em.getTransactionContext()?.date?.getTime();
  }
}

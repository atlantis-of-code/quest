import { EventArgs, EventSubscriber, Subscriber } from '@mikro-orm/core';
import { QuestEntity } from '../entities/quest-entity';

@Subscriber()
export class QuestSubscriber implements EventSubscriber<QuestEntity> {
  async beforeCreate(args: EventArgs<QuestEntity>): Promise<void> {
    const { entity, em } = args;
    entity.creation_user = em.getTransactionContext()?.user?.full_name;
    entity.creation_time = em.getTransactionContext()?.date?.getTime();
  }

  async beforeUpdate(args: EventArgs<QuestEntity>): Promise<void> {
    const { entity, em } = args;
    entity.modification_user = em.getTransactionContext()?.user?.full_name;
    entity.modification_time = em.getTransactionContext()?.date?.getTime();
  }
}

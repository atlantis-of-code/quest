// Mikro-ORM imports
import { Entity } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';

@Entity({ tableName: 'public.meta' })
export class Meta extends QuestEntity {
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Meta_${this.id}`;
  }
  //endregion
}

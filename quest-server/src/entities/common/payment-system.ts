// Mikro-ORM imports
import {
  Entity,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';

@Entity({ tableName: 'common.payment_system' })
export class PaymentSystem extends QuestEntity {
  //region Field names
  static readonly field = {
    IS_DEFAULT: 'is_default',
    NAME: 'name',
  };
  //endregion

  //region Fields
  @Property()
  is_default?: boolean;
  @Property()
  name!: string;
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `PaymentSystem_${this.id}`;
  }
  //endregion
}

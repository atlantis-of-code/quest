// Mikro-ORM imports
import {
  Entity,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';

@Entity({ tableName: 'users.aoc_user' })
export class AocUser extends QuestEntity {
  //region Field names
  static readonly field = {
    EMAIL: 'email',
    FULL_NAME: 'full_name',
    PASS: 'pass',
    USERNAME: 'username',
  };
  //endregion

  //region Fields
  @Property()
  email!: string;
  @Property({ nullable: true })
  full_name?: string;
  @Property()
  pass!: string;
  @Property()
  username!: string;
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `AocUser_${this.id}`;
  }
  //endregion
}

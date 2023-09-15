import { AocEntity } from '@atlantis-of-code/aoc-server';
import { PrimaryKey, Property, t } from '@mikro-orm/core';


export class QuestEntity extends AocEntity {

  @PrimaryKey({ type: t.bigint, nullable: true }) // Si no pos nullable no me tira TODO
  id?: string;

  @Property({ nullable: true, type: 'text' })
  creation_user: string;

  @Property({ nullable: true, type: 'text' })
  creation_time: string;

  @Property({ nullable: true, type: 'text' })
  modification_user: string;

  @Property({ nullable: true, type: 'text' })
  modification_time: string;

}

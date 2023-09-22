import { AocModel } from '@atlantis-of-code/aoc-client/core/models';


export class QuestModel extends AocModel<string> {
  creation_user: string;

  creation_time: string;

  modification_user: string;

  modification_time: string;
}

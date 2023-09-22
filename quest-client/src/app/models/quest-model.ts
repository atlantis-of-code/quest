import { AocModel } from '@atlantis-of-code/aoc-client/core/models';


export class QuestModel extends AocModel<string> {
  creation_user: string;

  creation_time: string;

  // modification_user: string; already in AocModel, is a mistake, should be here, the same for time

  // modification_time: string;
}

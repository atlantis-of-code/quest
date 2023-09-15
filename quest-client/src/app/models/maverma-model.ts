import { AocModel } from '@atlantis-of-code/aoc-client/core/models';


export class MavermaModel extends AocModel<string> {

  creation_user?: string;
  creation_time?: string;
  /*
  TODO: When removing the following attributes from AOC, should manually add them to this class
   */
  // modification_user?: string;
  // modification_time?: string;

}

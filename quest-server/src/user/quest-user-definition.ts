import {AocUserDefinition} from '@atlantis-of-code/aoc-server';
import {AocUserConfig} from '@atlantis-of-code/aoc-server/aoc-common';
import {AocUser} from "../entities/users/aoc-user";

@AocUserDefinition(new AocUserConfig(AocUser, {
  fieldMap: {
    username: 'username',
    password: 'pass'
  },
  populate: {}
}))
class QuestUserDefinition {}

// QuestModel import
import { QuestModel } from '../quest-model';

export class Meta extends QuestModel {
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `Meta_${this.id}`;
  }
  //endregion
}

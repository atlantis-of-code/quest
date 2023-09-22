// AocEmbeddedModel import
import { AocEmbeddedModel } from '@atlantis-of-code/aoc-client/core/models';

export class ContactTemplate extends AocEmbeddedModel {
  //region Field names
  static readonly field = {
    EMAIL: 'email',
    FAX: 'fax',
    PHONE1: 'phone1',
    PHONE2: 'phone2',
  };
  //endregion

  //region Fields
  email?: string;
  fax?: string;
  phone1?: string;
  phone2?: string;
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return 'ContactTemplate';
  }
  //endregion
}

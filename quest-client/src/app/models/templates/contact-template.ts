import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
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

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'contact template',
    p: 'contact templates',
    g: 'm',
    //region Fields for i18n (1 field per line)
    EMAIL: 'Email',
    FAX: 'Fax',
    PHONE1: 'Phone1',
    PHONE2: 'Phone2',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return 'ContactTemplate';
  }
  //endregion
}

import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
// AocEmbeddedModel import
import { AocEmbeddedModel } from '@atlantis-of-code/aoc-client/core/models';
// Model imports
import { Country } from '../common/country';
import { StreetSuffix } from '../common/street-suffix';

export class AddressTemplate extends AocEmbeddedModel {
  //region Field names
  static readonly field = {
    ADDITIONAL_DATA: 'additional_data',
    AREA: 'area',
    BLOCK: 'block',
    CITY: 'city',
    COORDINATES: 'coordinates',
    DOOR: 'door',
    FLOOR: 'floor',
    STATE: 'state',
    STREET_NAME: 'street_name',
    STREET_NUMBER: 'street_number',
    ZIP_CODE: 'zip_code',
  };
  //endregion

  //region Entity names
  static entity = {
    COUNTRY: 'country',
    STREET_SUFFIX: 'streetSuffix',
  };
  //endregion

  //region Fields
  additional_data?: string;
  area?: string;
  block?: string;
  city?: string;
  coordinates?: string;
  door?: string;
  floor?: string;
  state?: string;
  street_name?: string;
  street_number?: string;
  zip_code?: string;
  //endregion

  //region Models
  country!: Country;
  streetSuffix!: StreetSuffix;
  //endregion

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'address template',
    p: 'address templates',
    g: 'm',
    //region Fields for i18n (1 field per line)
    ADDITIONAL_DATA: 'Additional data',
    AREA: 'Area',
    BLOCK: 'Block',
    CITY: 'City',
    COORDINATES: 'Coordinates',
    DOOR: 'Door',
    FLOOR: 'Floor',
    STATE: 'State',
    STREET_NAME: 'Street name',
    STREET_NUMBER: 'Street number',
    ZIP_CODE: 'Zip code',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return 'AddressTemplate';
  }
  //endregion
}

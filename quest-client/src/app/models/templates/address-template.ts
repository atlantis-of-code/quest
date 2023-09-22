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

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return 'AddressTemplate';
  }
  //endregion
}

// Mikro-ORM imports
import {
  Embeddable,
  ManyToOne,
  Property } from '@mikro-orm/core';
// Entities imports
import { Country } from '../common/country';
import { StreetSuffix } from '../common/street-suffix';

@Embeddable()
export class AddressTemplate {
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
  @Property({ nullable: true })
  additional_data?: string;
  @Property({ nullable: true })
  area?: string;
  @Property({ nullable: true })
  block?: string;
  @Property({ nullable: true })
  city?: string;
  @Property({ nullable: true })
  coordinates?: string;
  @Property({ nullable: true })
  door?: string;
  @Property({ nullable: true })
  floor?: string;
  @Property({ nullable: true })
  state?: string;
  @Property({ nullable: true })
  street_name?: string;
  @Property({ nullable: true })
  street_number?: string;
  @Property({ nullable: true })
  zip_code?: string;
  //endregion

  //region Entities
  @ManyToOne({ entity: () => 'Country', fieldName: 'country_id', eager: true })
  country!: Country;
  @ManyToOne({ entity: () => 'StreetSuffix', fieldName: 'street_suffix_id', eager: true })
  streetSuffix!: StreetSuffix;
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return 'AddressTemplate';
  }
  //endregion
}

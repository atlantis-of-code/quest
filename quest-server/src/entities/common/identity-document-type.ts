// Mikro-ORM imports
import {
  Collection,
  Entity,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { LegalData } from './legal-data';

@Entity({ tableName: 'common.identity_document_type' })
export class IdentityDocumentType extends QuestEntity {
  //region Field names
  static readonly field = {
    IS_DEFAULT: 'is_default',
    NAME: 'name',
  };
  //endregion

  //region Collection names
  static collection = {
    LEGAL_DATA: 'legalDataCollection',
  };
  //endregion

  //region Fields
  @Property({ defaultRaw: 'default' })
  is_default!: boolean;
  @Property()
  name!: string;
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'LegalData', mappedBy: (e: LegalData) => e.identityDocumentType, orphanRemoval: false })
  legalDataCollection: Collection<LegalData> = new Collection<LegalData>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `IdentityDocumentType_${this.id}`;
  }
  //endregion
}

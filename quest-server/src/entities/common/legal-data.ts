// Mikro-ORM imports
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { IdentityDocumentType } from './identity-document-type';
import { Invoice } from '../invoicing/invoice';
import { Ticket } from '../invoicing/ticket';

@Entity({ tableName: 'common.legal_data' })
export class LegalData extends QuestEntity {
  //region Field names
  static readonly field = {
    DOCUMENT_NUMBER: 'document_number',
    LEGAL_NAME: 'legal_name',
  };
  //endregion

  //region Entity names
  static entity = {
    IDENTITY_DOCUMENT_TYPE: 'identityDocumentType',
  };
  //endregion

  //region Collection names
  static collection = {
    INVOICE_LEGAL_DATA_COMPANY: 'invoiceLegalDataCompanyCollection',
    INVOICE_LEGAL_DATA_CUSTOMER: 'invoiceLegalDataCustomerCollection',
    TICKET_LEGAL_DATA_COMPANY: 'ticketLegalDataCompanyCollection',
    TICKET_LEGAL_DATA_CUSTOMER: 'ticketLegalDataCustomerCollection',
  };
  //endregion

  //region Fields
  @Property({ nullable: true })
  document_number?: string;
  @Property({ nullable: true })
  legal_name?: string;
  //endregion

  //region Entities
  @ManyToOne({ entity: () => 'IdentityDocumentType', fieldName: 'identity_document_type_id', eager: true, nullable: true })
  identityDocumentType?: IdentityDocumentType;
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'Invoice', mappedBy: (e: Invoice) => e.companyLegalData, orphanRemoval: false })
  invoiceLegalDataCompanyCollection: Collection<Invoice> = new Collection<Invoice>(this);
  @OneToMany({ entity: () => 'Invoice', mappedBy: (e: Invoice) => e.customerLegalData, orphanRemoval: false })
  invoiceLegalDataCustomerCollection: Collection<Invoice> = new Collection<Invoice>(this);
  @OneToMany({ entity: () => 'Ticket', mappedBy: (e: Ticket) => e.companyLegalData, orphanRemoval: false })
  ticketLegalDataCompanyCollection: Collection<Ticket> = new Collection<Ticket>(this);
  @OneToMany({ entity: () => 'Ticket', mappedBy: (e: Ticket) => e.customerLegalData, orphanRemoval: false })
  ticketLegalDataCustomerCollection: Collection<Ticket> = new Collection<Ticket>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `LegalData_${this.id}`;
  }
  //endregion
}

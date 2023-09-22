// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { IdentityDocumentType } from './identity-document-type';
import { Invoice } from '../invoicing/invoice';
import { Ticket } from '../invoicing/ticket';

export class LegalData extends QuestModel {
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
  document_number?: string;
  legal_name?: string;
  //endregion

  //region Models
  identityDocumentType?: IdentityDocumentType;
  //endregion

  //region Mapped collections and inversed models
  invoiceLegalDataCompanyCollection: Invoice[];
  invoiceLegalDataCustomerCollection: Invoice[];
  ticketLegalDataCompanyCollection: Ticket[];
  ticketLegalDataCustomerCollection: Ticket[];
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `LegalData_${this.id}`;
  }
  //endregion
}

import { AocModelI18n } from '@atlantis-of-code/aoc-client/core/models';
// QuestModel import
import { QuestModel } from '../quest-model';
// Model imports
import { Budget } from '../invoicing/budget';
import { Customer } from '../customers/customer';
import { DeliveryNote } from '../invoicing/delivery-note';
import { Invoice } from '../invoicing/invoice';
import { Item } from '../items/item';
import { Ticket } from '../invoicing/ticket';

export class File extends QuestModel {
  //region Field names
  static readonly field = {
    DIRECTORY: 'directory',
    MIME: 'mime',
    NAME: 'name',
    REF_CLASS: 'ref_class',
    REF_ID: 'ref_id',
    SUBDIRECTORY: 'subdirectory',
  };
  //endregion

  //region Collection names
  static collection = {
    BUDGET: 'budgetCollection',
    CUSTOMER: 'customerCollection',
    DELIVERY_NOTE: 'deliveryNoteCollection',
    INVOICE: 'invoiceCollection',
    ITEM: 'itemCollection',
    ITEM_FILE_PHOTO: 'itemFilePhotoCollection',
    TICKET: 'ticketCollection',
  };
  //endregion

  //region Virtual names
  static virtual = {
    RAW: 'raw',
  };
  //endregion

  //region Fields
  directory!: string;
  mime!: string;
  name!: string;
  ref_class!: string;
  ref_id?: string;
  subdirectory?: string;
  //endregion

  //region Mapped collections and inversed models
  budgetCollection: Budget[];
  customerCollection: Customer[];
  deliveryNoteCollection: DeliveryNote[];
  invoiceCollection: Invoice[];
  itemCollection: Item[];
  itemFilePhotoCollection: Item[];
  ticketCollection: Ticket[];
  //endregion

  //region Virtual
  raw?: string;
  //endregion

  //region I18N
  static readonly i18n: AocModelI18n<typeof this['field']> = {
    s: 'file',
    p: 'files',
    g: 'm',
    //region Fields for i18n (1 field per line)
    DIRECTORY: 'Directory',
    MIME: 'Mime',
    NAME: 'Name',
    REF_CLASS: 'Ref class',
    REF_ID: 'Ref id',
    SUBDIRECTORY: 'Subdirectory',
    //endregion Fields for i18n
  }
  //endregion I18N

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `File_${this.id}`;
  }
  //endregion
}

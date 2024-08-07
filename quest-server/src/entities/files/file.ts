// Mikro-ORM imports
import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Budget } from '../invoicing/budget';
import { Customer } from '../customers/customer';
import { DeliveryNote } from '../invoicing/delivery-note';
import { Invoice } from '../invoicing/invoice';
import { Item } from '../items/item';
import { StockCount } from '../items/stock-count';
import { Ticket } from '../invoicing/ticket';

@Entity({ tableName: 'files.file' })
export class File extends QuestEntity {
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
    STOCK_COUNT: 'stockCountCollection',
    TICKET: 'ticketCollection',
  };
  //endregion

  //region Virtual names
  static virtual = {
    RAW: 'raw',
  };
  //endregion

  //region Fields
  @Property()
  directory!: string;
  @Property()
  mime!: string;
  @Property()
  name!: string;
  @Property()
  ref_class!: string;
  @Property({ nullable: true })
  ref_id?: string;
  @Property({ nullable: true })
  subdirectory?: string;
  //endregion

  //region Mapped collections and inversed entities
  @ManyToMany({ entity: () => Budget, mappedBy: (e: Budget) => e.fileCollection })
  budgetCollection: Collection<Budget> = new Collection<Budget>(this);
  @ManyToMany({ entity: () => Customer, mappedBy: (e: Customer) => e.fileCollection })
  customerCollection: Collection<Customer> = new Collection<Customer>(this);
  @ManyToMany({ entity: () => DeliveryNote, mappedBy: (e: DeliveryNote) => e.fileCollection })
  deliveryNoteCollection: Collection<DeliveryNote> = new Collection<DeliveryNote>(this);
  @ManyToMany({ entity: () => Invoice, mappedBy: (e: Invoice) => e.fileCollection })
  invoiceCollection: Collection<Invoice> = new Collection<Invoice>(this);
  @ManyToMany({ entity: () => Item, mappedBy: (e: Item) => e.fileCollection })
  itemCollection: Collection<Item> = new Collection<Item>(this);
  @OneToMany({ entity: () => 'Item', mappedBy: (e: Item) => e.photo, orphanRemoval: false })
  itemFilePhotoCollection: Collection<Item> = new Collection<Item>(this);
  @OneToMany({ entity: () => 'StockCount', mappedBy: (e: StockCount) => e.file, orphanRemoval: false })
  stockCountCollection: Collection<StockCount> = new Collection<StockCount>(this);
  @ManyToMany({ entity: () => Ticket, mappedBy: (e: Ticket) => e.fileCollection })
  ticketCollection: Collection<Ticket> = new Collection<Ticket>(this);
  //endregion

  //region Virtual
  @Property({ persist: false })
  raw?: string;
  //endregion

  //region CUSTOM
  toString(): string {
    return this.name;
  }
  //endregion
}

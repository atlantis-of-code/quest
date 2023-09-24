import { AocModelMetaMap } from '@atlantis-of-code/aoc-client/core/models';

import { Address } from './common/address';
import { Country } from './common/country';
import { StreetSuffix } from './common/street-suffix';
import { Invoice } from './invoicing/invoice';
import { Ticket } from './invoicing/ticket';
import { FiscalYear } from './common/fiscal-year';
import { Budget } from './invoicing/budget';
import { DeliveryNote } from './invoicing/delivery-note';
import { Gender } from './common/gender';
import { Customer } from './customers/customer';
import { IdentityDocumentType } from './common/identity-document-type';
import { LegalData } from './common/legal-data';
import { Language } from './common/language';
import { PaymentSystem } from './common/payment-system';
import { Series } from './common/series';
import { Tax } from './common/tax';
import { Item } from './items/item';
import { Company } from './configuration/company';
import { AddressTemplate } from './templates/address-template';
import { ContactTemplate } from './templates/contact-template';
import { LegalDataTemplate } from './templates/legal-data-template';
import { Contact } from './contacts/contact';
import { File } from './files/file';
import { BudgetLine } from './invoicing/budget-line';
import { Store } from './items/store';
import { StockLine } from './invoicing/stock-line';
import { StockTransfer } from './items/stock-transfer';
import { Category } from './items/category';
import { ManualStockTransferLine } from './items/manual-stock-transfer-line';
import { Stock } from './items/stock';
import { ManualStockTransfer } from './items/manual-stock-transfer';
import { Meta } from './public/meta';
import { DocumentLineTemplate } from './templates/document-line-template';
import { DocumentTemplate } from './templates/document-template';
import { AocUser } from './users/aoc-user';

export const meta: AocModelMetaMap = new Map();

meta.set(Address, {
  tableName: 'common.address',
  fields: {
    additional_data: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    area: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    block: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    city: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    coordinates: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    door: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    floor: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    state: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    street_name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    street_number: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    zip_code: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    country: { type: Country, isEntity: true, isCollection: false, isEmbedded: false, },
    streetSuffix: { type: StreetSuffix, isEntity: true, isCollection: false, isEmbedded: false, },
    invoiceAddressCompanyCollection: { type: Invoice, isEntity: false, isCollection: true, isEmbedded: false, },
    invoiceAddressCustomerCollection: { type: Invoice, isEntity: false, isCollection: true, isEmbedded: false, },
    ticketAddressCompanyCollection: { type: Ticket, isEntity: false, isCollection: true, isEmbedded: false, },
    ticketAddressCustomerCollection: { type: Ticket, isEntity: false, isCollection: true, isEmbedded: false, },
  }
});

meta.set(Country, {
  tableName: 'common.country',
  fields: {
    is_default: { type: 'boolean', isEntity: false, isCollection: false, isEmbedded: false, },
    iso_code2: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    iso_code3: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    addressCollection: { type: Address, isEntity: false, isCollection: true, isEmbedded: false, },
  }
});

meta.set(FiscalYear, {
  tableName: 'common.fiscal_year',
  fields: {
    is_current: { type: 'boolean', isEntity: false, isCollection: false, isEmbedded: false, },
    year: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false, },
    budgetCollection: { type: Budget, isEntity: false, isCollection: true, isEmbedded: false, },
    deliveryNoteCollection: { type: DeliveryNote, isEntity: false, isCollection: true, isEmbedded: false, },
    invoiceCollection: { type: Invoice, isEntity: false, isCollection: true, isEmbedded: false, },
    ticketCollection: { type: Ticket, isEntity: false, isCollection: true, isEmbedded: false, },
  }
});

meta.set(Gender, {
  tableName: 'common.gender',
  fields: {
    is_default: { type: 'boolean', isEntity: false, isCollection: false, isEmbedded: false, },
    name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    customerCollection: { type: Customer, isEntity: false, isCollection: true, isEmbedded: false, },
  }
});

meta.set(IdentityDocumentType, {
  tableName: 'common.identity_document_type',
  fields: {
    is_default: { type: 'boolean', isEntity: false, isCollection: false, isEmbedded: false, },
    name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    legalDataCollection: { type: LegalData, isEntity: false, isCollection: true, isEmbedded: false, },
  }
});

meta.set(Language, {
  tableName: 'common.language',
  fields: {
    is_default: { type: 'boolean', isEntity: false, isCollection: false, isEmbedded: false, },
    iso_code2: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    iso_code3: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    customerCollection: { type: Customer, isEntity: false, isCollection: true, isEmbedded: false, },
  }
});

meta.set(LegalData, {
  tableName: 'common.legal_data',
  fields: {
    document_number: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    legal_name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    identityDocumentType: { type: IdentityDocumentType, isEntity: true, isCollection: false, isEmbedded: false, },
    invoiceLegalDataCompanyCollection: { type: Invoice, isEntity: false, isCollection: true, isEmbedded: false, },
    invoiceLegalDataCustomerCollection: { type: Invoice, isEntity: false, isCollection: true, isEmbedded: false, },
    ticketLegalDataCompanyCollection: { type: Ticket, isEntity: false, isCollection: true, isEmbedded: false, },
    ticketLegalDataCustomerCollection: { type: Ticket, isEntity: false, isCollection: true, isEmbedded: false, },
  }
});

meta.set(PaymentSystem, {
  tableName: 'common.payment_system',
  fields: {
    is_default: { type: 'boolean', isEntity: false, isCollection: false, isEmbedded: false, },
    name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
  }
});

meta.set(Series, {
  tableName: 'common.series',
  fields: {
    is_default: { type: 'boolean', isEntity: false, isCollection: false, isEmbedded: false, },
    name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    type: { type: 'string', enum: 'SeriesTypeType', isEntity: false, isCollection: false, isEmbedded: false, },
    budgetCollection: { type: Budget, isEntity: false, isCollection: true, isEmbedded: false, },
    deliveryNoteCollection: { type: DeliveryNote, isEntity: false, isCollection: true, isEmbedded: false, },
    invoiceCollection: { type: Invoice, isEntity: false, isCollection: true, isEmbedded: false, },
    ticketCollection: { type: Ticket, isEntity: false, isCollection: true, isEmbedded: false, },
  }
});

meta.set(StreetSuffix, {
  tableName: 'common.street_suffix',
  fields: {
    abbrv: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    is_default: { type: 'boolean', isEntity: false, isCollection: false, isEmbedded: false, },
    name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    addressCollection: { type: Address, isEntity: false, isCollection: true, isEmbedded: false, },
  }
});

meta.set(Tax, {
  tableName: 'common.tax',
  fields: {
    name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    percent: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    itemCollection: { type: Item, isEntity: false, isCollection: true, isEmbedded: false, },
  }
});

meta.set(Company, {
  tableName: 'configuration.company',
  fields: {
    trade_name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    addressTemplate: { type: AddressTemplate, isEntity: false, isCollection: false, isEmbedded: true, },
    contactTemplate: { type: ContactTemplate, isEntity: false, isCollection: false, isEmbedded: true, },
    legalDataTemplate: { type: LegalDataTemplate, isEntity: false, isCollection: false, isEmbedded: true, },
  }
});

meta.set(Contact, {
  tableName: 'contacts.contact',
  fields: {
    email: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    fax: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    phone1: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    phone2: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    customerCollection: { type: Customer, isEntity: false, isCollection: true, isEmbedded: false, },
  }
});

meta.set(Customer, {
  tableName: 'customers.customer',
  fields: {
    birthdate: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    code: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false, },
    email: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    fax: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    phone1: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    phone2: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    trade_name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    gender: { type: Gender, isEntity: true, isCollection: false, isEmbedded: false, },
    language: { type: Language, isEntity: true, isCollection: false, isEmbedded: false, },
    budgetCollection: { type: Budget, isEntity: false, isCollection: true, isEmbedded: false, },
    contactCollection: { type: Contact, isEntity: false, isCollection: true, isEmbedded: false, },
    deliveryNoteCollection: { type: DeliveryNote, isEntity: false, isCollection: true, isEmbedded: false, },
    fileCollection: { type: File, isEntity: false, isCollection: true, isEmbedded: false, },
    invoiceCollection: { type: Invoice, isEntity: false, isCollection: true, isEmbedded: false, },
    ticketCollection: { type: Ticket, isEntity: false, isCollection: true, isEmbedded: false, },
    addressTemplate: { type: AddressTemplate, isEntity: false, isCollection: false, isEmbedded: true, },
    legalDataTemplate: { type: LegalDataTemplate, isEntity: false, isCollection: false, isEmbedded: true, },
  }
});

meta.set(File, {
  tableName: 'files.file',
  fields: {
    directory: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    mime: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    ref_class: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    ref_id: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    subdirectory: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    budgetCollection: { type: Budget, isEntity: false, isCollection: true, isEmbedded: false, },
    customerCollection: { type: Customer, isEntity: false, isCollection: true, isEmbedded: false, },
    deliveryNoteCollection: { type: DeliveryNote, isEntity: false, isCollection: true, isEmbedded: false, },
    invoiceCollection: { type: Invoice, isEntity: false, isCollection: true, isEmbedded: false, },
    itemCollection: { type: Item, isEntity: false, isCollection: true, isEmbedded: false, },
    itemFilePhotoCollection: { type: Item, isEntity: false, isCollection: true, isEmbedded: false, },
    ticketCollection: { type: Ticket, isEntity: false, isCollection: true, isEmbedded: false, },
    raw: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
  }
});

meta.set(Budget, {
  tableName: 'invoicing.budget',
  fields: {
    date: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    number: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false, },
    observations: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    total: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    total_base: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    total_taxes: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    customer: { type: Customer, isEntity: true, isCollection: false, isEmbedded: false, },
    fiscalYear: { type: FiscalYear, isEntity: true, isCollection: false, isEmbedded: false, },
    series: { type: Series, isEntity: true, isCollection: false, isEmbedded: false, },
    budgetLineCollection: { type: BudgetLine, isEntity: false, isCollection: true, isEmbedded: false, },
    fileCollection: { type: File, isEntity: false, isCollection: true, isEmbedded: false, },
  }
});

meta.set(BudgetLine, {
  tableName: 'invoicing.budget_line',
  fields: {
    base_price: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    discount: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    item_code: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    item_name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    order: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false, },
    quantity: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    total_base: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    budget: { type: Budget, isEntity: true, isCollection: false, isEmbedded: false, },
    item: { type: Item, isEntity: true, isCollection: false, isEmbedded: false, },
    store: { type: Store, isEntity: true, isCollection: false, isEmbedded: false, },
  }
});

meta.set(DeliveryNote, {
  tableName: 'invoicing.delivery_note',
  fields: {
    date: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    number: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false, },
    observations: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    total: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    total_base: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    total_taxes: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    customer: { type: Customer, isEntity: true, isCollection: false, isEmbedded: false, },
    fiscalYear: { type: FiscalYear, isEntity: true, isCollection: false, isEmbedded: false, },
    invoice: { type: Invoice, isEntity: true, isCollection: false, isEmbedded: false, },
    series: { type: Series, isEntity: true, isCollection: false, isEmbedded: false, },
    fileCollection: { type: File, isEntity: false, isCollection: true, isEmbedded: false, },
    stockLineLineCollection: { type: StockLine, isEntity: false, isCollection: true, isEmbedded: false, },
  }
});

meta.set(Invoice, {
  tableName: 'invoicing.invoice',
  fields: {
    date: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    number: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false, },
    observations: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    total: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    total_base: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    total_taxes: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    companyAddress: { type: Address, isEntity: true, isCollection: false, isEmbedded: false, },
    companyLegalData: { type: LegalData, isEntity: true, isCollection: false, isEmbedded: false, },
    customer: { type: Customer, isEntity: true, isCollection: false, isEmbedded: false, },
    customerAddress: { type: Address, isEntity: true, isCollection: false, isEmbedded: false, },
    customerLegalData: { type: LegalData, isEntity: true, isCollection: false, isEmbedded: false, },
    fiscalYear: { type: FiscalYear, isEntity: true, isCollection: false, isEmbedded: false, },
    series: { type: Series, isEntity: true, isCollection: false, isEmbedded: false, },
    deliveryNoteCollection: { type: DeliveryNote, isEntity: false, isCollection: true, isEmbedded: false, },
    fileCollection: { type: File, isEntity: false, isCollection: true, isEmbedded: false, },
  }
});

meta.set(StockLine, {
  tableName: 'invoicing.stock_line',
  fields: {
    base_price: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    discount: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    item_code: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    item_name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    order: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false, },
    quantity: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    total_base: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    item: { type: Item, isEntity: true, isCollection: false, isEmbedded: false, },
    store: { type: Store, isEntity: true, isCollection: false, isEmbedded: false, },
    deliveryNoteLineCollection: { type: DeliveryNote, isEntity: false, isCollection: true, isEmbedded: false, },
    stockTransferCollection: { type: StockTransfer, isEntity: false, isCollection: true, isEmbedded: false, },
    ticketLineCollection: { type: Ticket, isEntity: false, isCollection: true, isEmbedded: false, },
  }
});

meta.set(Ticket, {
  tableName: 'invoicing.ticket',
  fields: {
    date: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    number: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false, },
    observations: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    total: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    total_base: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    total_taxes: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    companyAddress: { type: Address, isEntity: true, isCollection: false, isEmbedded: false, },
    companyLegalData: { type: LegalData, isEntity: true, isCollection: false, isEmbedded: false, },
    customer: { type: Customer, isEntity: true, isCollection: false, isEmbedded: false, },
    customerAddress: { type: Address, isEntity: true, isCollection: false, isEmbedded: false, },
    customerLegalData: { type: LegalData, isEntity: true, isCollection: false, isEmbedded: false, },
    fiscalYear: { type: FiscalYear, isEntity: true, isCollection: false, isEmbedded: false, },
    series: { type: Series, isEntity: true, isCollection: false, isEmbedded: false, },
    fileCollection: { type: File, isEntity: false, isCollection: true, isEmbedded: false, },
    stockLineLineCollection: { type: StockLine, isEntity: false, isCollection: true, isEmbedded: false, },
  }
});

meta.set(Category, {
  tableName: 'items.category',
  fields: {
    name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    itemCollection: { type: Item, isEntity: false, isCollection: true, isEmbedded: false, },
  }
});

meta.set(Item, {
  tableName: 'items.item',
  fields: {
    base_price: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    code: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false, },
    is_enabled: { type: 'boolean', isEntity: false, isCollection: false, isEmbedded: false, },
    name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    category: { type: Category, isEntity: true, isCollection: false, isEmbedded: false, },
    photo: { type: File, isEntity: true, isCollection: false, isEmbedded: false, },
    tax: { type: Tax, isEntity: true, isCollection: false, isEmbedded: false, },
    budgetLineCollection: { type: BudgetLine, isEntity: false, isCollection: true, isEmbedded: false, },
    fileCollection: { type: File, isEntity: false, isCollection: true, isEmbedded: false, },
    manualStockTransferLineCollection: { type: ManualStockTransferLine, isEntity: false, isCollection: true, isEmbedded: false, },
    stockCollection: { type: Stock, isEntity: false, isCollection: true, isEmbedded: false, },
    stockLineCollection: { type: StockLine, isEntity: false, isCollection: true, isEmbedded: false, },
    stockTransferCollection: { type: StockTransfer, isEntity: false, isCollection: true, isEmbedded: false, },
  }
});

meta.set(ManualStockTransfer, {
  tableName: 'items.manual_stock_transfer',
  fields: {
    date: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    originStore: { type: Store, isEntity: true, isCollection: false, isEmbedded: false, },
    targetStore: { type: Store, isEntity: true, isCollection: false, isEmbedded: false, },
    manualStockTransferLineCollection: { type: ManualStockTransferLine, isEntity: false, isCollection: true, isEmbedded: false, },
  }
});

meta.set(ManualStockTransferLine, {
  tableName: 'items.manual_stock_transfer_line',
  fields: {
    quantity: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    item: { type: Item, isEntity: true, isCollection: false, isEmbedded: false, },
    manualStockTransfer: { type: ManualStockTransfer, isEntity: true, isCollection: false, isEmbedded: false, },
    stockTransferCollection: { type: StockTransfer, isEntity: false, isCollection: true, isEmbedded: false, },
  }
});

meta.set(Stock, {
  tableName: 'items.stock',
  fields: {
    quantity: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    item: { type: Item, isEntity: true, isCollection: false, isEmbedded: false, },
    store: { type: Store, isEntity: true, isCollection: false, isEmbedded: false, },
  }
});

meta.set(StockTransfer, {
  tableName: 'items.stock_transfer',
  fields: {
    customer_name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    date: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    description: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    document_name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    document_operation: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    previous_stock: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    quantity: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    type: { type: 'string', enum: 'StockTransferTypeType', isEntity: false, isCollection: false, isEmbedded: false, },
    auxStore: { type: Store, isEntity: true, isCollection: false, isEmbedded: false, },
    item: { type: Item, isEntity: true, isCollection: false, isEmbedded: false, },
    manualStockTransferLine: { type: ManualStockTransferLine, isEntity: true, isCollection: false, isEmbedded: false, },
    stockLine: { type: StockLine, isEntity: true, isCollection: false, isEmbedded: false, },
    store: { type: Store, isEntity: true, isCollection: false, isEmbedded: false, },
  }
});

meta.set(Store, {
  tableName: 'items.store',
  fields: {
    name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    budgetLineCollection: { type: BudgetLine, isEntity: false, isCollection: true, isEmbedded: false, },
    manualStockTransferStoreOriginCollection: { type: ManualStockTransfer, isEntity: false, isCollection: true, isEmbedded: false, },
    manualStockTransferStoreTargetCollection: { type: ManualStockTransfer, isEntity: false, isCollection: true, isEmbedded: false, },
    stockCollection: { type: Stock, isEntity: false, isCollection: true, isEmbedded: false, },
    stockLineCollection: { type: StockLine, isEntity: false, isCollection: true, isEmbedded: false, },
    stockTransferCollection: { type: StockTransfer, isEntity: false, isCollection: true, isEmbedded: false, },
    stockTransferStoreAuxCollection: { type: StockTransfer, isEntity: false, isCollection: true, isEmbedded: false, },
  }
});

meta.set(Meta, {
  tableName: 'public.meta',
  fields: {
  }
});

meta.set(AddressTemplate, {
  tableName: 'templates.address_template',
  fields: {
    additional_data: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    area: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    block: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    city: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    coordinates: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    door: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    floor: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    state: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    street_name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    street_number: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    zip_code: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    country: { type: Country, isEntity: true, isCollection: false, isEmbedded: false, },
    streetSuffix: { type: StreetSuffix, isEntity: true, isCollection: false, isEmbedded: false, },
  }
});

meta.set(ContactTemplate, {
  tableName: 'templates.contact_template',
  fields: {
    email: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    fax: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    phone1: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    phone2: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
  }
});

meta.set(DocumentLineTemplate, {
  tableName: 'templates.document_line_template',
  fields: {
    base_price: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    discount: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    item_code: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    item_name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    order: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false, },
    quantity: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    total_base: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    item: { type: Item, isEntity: true, isCollection: false, isEmbedded: false, },
    store: { type: Store, isEntity: true, isCollection: false, isEmbedded: false, },
  }
});

meta.set(DocumentTemplate, {
  tableName: 'templates.document_template',
  fields: {
    date: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    number: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false, },
    observations: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    total: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    total_base: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    total_taxes: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false, },
    customer: { type: Customer, isEntity: true, isCollection: false, isEmbedded: false, },
    fiscalYear: { type: FiscalYear, isEntity: true, isCollection: false, isEmbedded: false, },
    series: { type: Series, isEntity: true, isCollection: false, isEmbedded: false, },
  }
});

meta.set(LegalDataTemplate, {
  tableName: 'templates.legal_data_template',
  fields: {
    document_number: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    legal_name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    identityDocumentType: { type: IdentityDocumentType, isEntity: true, isCollection: false, isEmbedded: false, },
  }
});

meta.set(AocUser, {
  tableName: 'users.aoc_user',
  fields: {
    email: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    full_name: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    pass: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
    username: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false, },
  }
});


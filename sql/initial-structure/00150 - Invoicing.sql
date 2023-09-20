create schema invoicing;

create table invoicing.budget
(
    id bigserial primary key
) inherits (public.meta, templates.document_template);
-- Bind inherited foreign keys
alter table invoicing.budget
    add foreign key (customer_id) references customers.customer on update cascade on delete restrict;
alter table invoicing.budget
    add foreign key (series_id) references common.series on update cascade on delete restrict;
alter table invoicing.budget
    add foreign key (fiscal_year_id) references common.fiscal_year on update cascade on delete restrict;

create table invoicing.budget_line
(
    id             bigserial primary key,
    budget_id bigint not null references invoicing.budget on update cascade on delete cascade
) inherits (public.meta, templates.document_line_template);
-- Bind inherited foreign keys
alter table invoicing.budget_line
    add foreign key (item_id) references items.item on update cascade on delete set null;
alter table invoicing.budget_line
    add foreign key (store_id) references items.store on update cascade on delete set null;

-- Pivot table for files
create table invoicing.budget_file
(
    id             bigserial primary key,
    budget_id bigint references invoicing.budget on update cascade on delete cascade,
    file_id     bigint references files.file on update cascade on delete cascade
) inherits (public.meta);


create table invoicing.invoice
(
    id                     bigserial primary key,
    customer_legal_data_id bigint references common.legal_data on update cascade on delete restrict , -- copy of customer fiscal data
    customer_address_id bigint references common.address on update cascade on delete restrict , -- copy of customer address
    company_legal_data_id bigint references common.legal_data on update cascade on delete restrict, -- copy of company fiscal data
    company_address_id bigint references common.address on update cascade on delete restrict -- copy of company address
) inherits (public.meta, templates.document_template);
alter table invoicing.invoice
    add foreign key (customer_id) references customers.customer on update cascade on delete restrict;
alter table invoicing.invoice
    add foreign key (series_id) references common.series on update cascade on delete restrict;
alter table invoicing.invoice
    add foreign key (fiscal_year_id) references common.fiscal_year on update cascade on delete restrict;


-- pivot table for invoice files
create table invoicing.invoice_file
(
    id         bigserial primary key,
    invoice_id bigint references invoicing.invoice on update cascade on delete cascade,
    file_id bigint references files.file on update cascade on delete cascade
) inherits (public.meta);


create table invoicing.ticket
(
    id                     bigserial primary key,
    customer_legal_data_id bigint references common.legal_data on update cascade on delete restrict , -- copy of customer fiscal data
    customer_address_id bigint references common.address on update cascade on delete restrict , -- copy of customer address
    company_legal_data_id bigint references common.legal_data on update cascade on delete restrict, -- copy of company fiscal data
    company_address_id bigint references common.address on update cascade on delete restrict -- copy of company address
) inherits (public.meta, templates.document_template);
alter table invoicing.ticket
    add foreign key (customer_id) references customers.customer on update cascade on delete restrict;
alter table invoicing.ticket
    add foreign key (series_id) references common.series on update cascade on delete restrict;
alter table invoicing.ticket
    add foreign key (fiscal_year_id) references common.fiscal_year on update cascade on delete restrict;

-- pivot table for ticket files
create table invoicing.ticket_file
(
    id         bigserial primary key,
    ticket_id  bigint references invoicing.ticket on update cascade on delete cascade,
    file_id bigint references files.file on update cascade on delete cascade
) inherits (public.meta);

create table invoicing.delivery_note
(
    id         bigserial primary key,
    invoice_id bigint references invoicing.invoice on update cascade on delete set null
) inherits (public.meta, templates.document_template);
alter table invoicing.delivery_note
    add foreign key (customer_id) references customers.customer on update cascade on delete restrict;
alter table invoicing.delivery_note
    add foreign key (series_id) references common.series on update cascade on delete restrict;
alter table invoicing.delivery_note
    add foreign key (fiscal_year_id) references common.fiscal_year on update cascade on delete restrict;

-- pivot table for delivery note files
create table invoicing.delivery_note_file
(
    id         bigserial primary key,
    delivery_note_id bigint references invoicing.delivery_note on update cascade on delete cascade,
    file_id bigint references files.file on update cascade on delete cascade
) inherits (public.meta);

-- Stockable rows: will be used by tickets and delivery notes as they both handle stock
create table invoicing.stock_line
(
    id         bigserial primary key
) inherits (public.meta, templates.document_line_template);
alter table invoicing.stock_line
    add foreign key (item_id) references items.item on update cascade on delete set null;
alter table invoicing.stock_line
    add foreign key (store_id) references items.store on update cascade on delete restrict;

-- pivot tables for stock lines with delivery notes and tickets

create table invoicing.delivery_note_line (
    id bigserial primary key ,
    delivery_note_id bigint references invoicing.delivery_note on update cascade on delete cascade,
    stock_line_id bigint references invoicing.stock_line on update cascade on delete cascade
) inherits (public.meta);

create table invoicing.ticket_line (
    id bigserial primary key ,
    ticket_id bigint references invoicing.ticket on update cascade on delete cascade,
    stock_line_id bigint references invoicing.stock_line on update cascade on delete cascade
) inherits (public.meta);


/*
    stock transfer for documents. Done here because we need the ref to stock_line
 */
create table items.stock_transfer (
    id bigserial primary key ,
    date timestamp with time zone not null default now(),
    type text not null check ( type in ('Delivery note', 'Re-count', 'Transfer', 'Ticket') ),
    document_name text,
    document_operation text, -- document state
    customer_name text,
    description text,
    quantity numeric(20, 0) not null default '0.00',
    previous_stock numeric(20, 0) not null default '0.00',
    item_id bigint not null references items.item on update cascade on delete cascade ,
    store_id bigint not null references items.store on update cascade on delete cascade ,
    aux_store_id bigint references items.store on update cascade on delete set null,
    stock_line_id bigint references invoicing.stock_line on update cascade on delete set null,
    manual_stock_transfer_line_id bigint references items.manual_stock_transfer_line on update cascade on delete set null
    -- recuento_estoc_id bigint references articulos.recuento_estoc on update cascade on delete cascade
) inherits (public.meta);

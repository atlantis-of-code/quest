\c quest;

create schema items;

create table items.category (
    id bigserial primary key ,
    name text not null
) inherits (public.meta);

create table items.item (
    id bigserial primary key ,
    code integer not null,
    name text not null,
    description text,
    base_price numeric not null default 0.00,
    is_enabled boolean not null default true,
    tax_id bigint references common.tax on update cascade on delete restrict,
    category_id bigint references items.category on update cascade on delete restrict,
    photo_id bigint references files.file on update cascade on delete set null
) inherits (public.meta);

-- Pivot table for files
create table items.item_file (
    id bigserial primary key ,
    item_id bigint references items.item on update cascade on delete cascade,
    file_id bigint references files.file on update cascade on delete cascade
) inherits (public.meta);


create table items.store (
    id bigserial primary key ,
    name text not null,
    is_default boolean not null default false
) inherits (public.meta);

create table items.stock (
    id bigserial primary key ,
    quantity numeric not null default '0.00',
    item_id bigint references items.item on update cascade on delete cascade,
    store_id bigint references items.store on update cascade on delete cascade
) inherits (public.meta);


create table items.stock_count (
    id bigserial primary key,
    date timestamp with time zone not null default now(),
    file_id bigint references files.file on update cascade on delete restrict
) inherits (public.meta);

create table items.store_transfer (
    id bigserial primary key ,
    date timestamp with time zone not null default now(),
    source_store_id bigint not null references items.store on update cascade on delete restrict,
    target_store_id bigint not null references items.store on update cascade on delete restrict
) inherits (public.meta);

create table items.store_transfer_line (
    id bigserial primary key ,
    quantity numeric not null,
    item_id bigint references items.item on update cascade on delete restrict,
    store_transfer_id bigint references items.store_transfer on update cascade on delete cascade
) inherits (public.meta);

-- stock transfer in Invoicing script as some deps are needed


create schema articles;

create table articles.category (
    id bigserial primary key ,
    name text not null
) inherits (public.meta);

create table articles.article (
    id bigserial primary key ,
    code integer not null,
    name text not null,
    base_price numeric not null default 0.00,
    is_enabled boolean not null default true,
    tax_id bigint references common.tax on update cascade on delete restrict,
    category_id bigint references articles.category on update cascade on delete restrict,
    photo_id bigint references files.file on update cascade on delete set null
) inherits (public.meta);

-- Pivot table for files
create table articles.article_file (
    id bigserial primary key ,
    article_id bigint references articles.article on update cascade on delete cascade ,
    file_id bigint references files.file on update cascade on delete cascade
) inherits (public.meta);


create table articles.store (
    id bigserial primary key ,
    name text not null
) inherits (public.meta);

create table articles.stock (
    id bigserial primary key ,
    quantity numeric not null default '0.00',
    article_id bigint references articles.article on update cascade on delete cascade ,
    store_id bigint references articles.store on update cascade on delete cascade
) inherits (public.meta);

/* Ja vorem si fa falta
create table articulos.recuento_estoc (
    id bigserial primary key ,
    fecha timestamp with time zone not null default now(),
    fichero_id bigint references ficheros.fichero on update cascade on delete restrict
) inherits (public.meta);
 */

create table articles.manual_stock_transfer (
    id bigserial primary key ,
    date timestamp with time zone not null default now(),
    origin_store_id bigint not null references articles.store on update cascade on delete restrict ,
    target_store_id bigint not null references articles.store on update cascade on delete restrict
) inherits (public.meta);

create table articles.manual_stock_transfer_line (
    id bigserial primary key ,
    quantity numeric not null,
    article_id bigint references articles.article on update cascade on delete restrict ,
    manual_stock_transfer_id bigint references articles.manual_stock_transfer on update cascade on delete cascade
) inherits (public.meta);






create table templates.document_template (
    number integer,
    date timestamp with time zone,
    observations text,
    total_base numeric(20,2),
    total_taxes numeric(20, 2),
    total numeric(20, 2),
    customer_id bigint not null references customers.customer on update cascade on delete restrict ,
    series_id bigint references common.series on update cascade on delete restrict ,
    fiscal_year_id bigint references common.fiscal_year on update cascade on delete restrict
);

create table templates.document_line_template (
    "order" integer,
    item_code text, -- copy of item code
    item_name text, -- copy of item name
    base_price numeric not null,
    quantity numeric not null,
    discount numeric not null default 0.00,
    total_base numeric not null,
    item_id bigint references items.item on update cascade on delete set null,
    store_id bigint references items.store on update cascade on delete restrict
);

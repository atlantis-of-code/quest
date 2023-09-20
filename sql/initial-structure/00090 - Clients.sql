CREATE SCHEMA customers;

CREATE TABLE customers.customer (
    id bigserial primary key,
    code integer unique not null,
    trade_name text, --optional trade_name ? està bé també tradename, trade name i commercial name
    birthdate timestamp with time zone,
    gender_id bigint references common.gender on update cascade on delete restrict ,
    language_id bigint references common.language on update cascade on delete restrict
) INHERITS (public.meta, templates.address_template, templates.legal_data_template, templates.contact_template);

alter table customers.customer add foreign key (street_suffix_id) references common.street_suffix on update cascade on delete restrict;
alter table customers.customer add foreign key (country_id) references common.country on update cascade on delete restrict;
alter table customers.customer add foreign key (identity_document_type_id) references common.identity_document_type on update cascade on delete restrict;

-- Pivot table for customer files
create table customers.customer_file (
    id bigserial primary key ,
    customer_id bigint references customers.customer on update cascade on delete cascade,
    file_id bigint references files.file on update cascade on delete cascade
) inherits(public.meta);

-- Pivot table for customer contact
CREATE TABLE customers.customer_contact (
    id bigserial primary key ,
    customer_id bigint references customers.customer on update cascade on delete cascade ,
    contact_id bigint references contacts.contact on update cascade on delete cascade
) inherits (public.meta);

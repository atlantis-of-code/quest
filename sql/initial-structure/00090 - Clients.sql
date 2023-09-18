CREATE SCHEMA clients;

CREATE TABLE clients.client (
    id bigserial primary key,
    code integer unique not null,
    tradename text, --optional trade_name ? està bé també tradename, trade name i commercial name
    birthdate timestamp with time zone,
    gender_id bigint references common.gender on update cascade on delete restrict ,
    language_id bigint references common.language on update cascade on delete restrict
) INHERITS (public.meta, templates.address_template, templates.fiscal_data_template, templates.contact_template);

alter table clients.client add foreign key (road_name_id) references common.road_name on update cascade on delete restrict;
alter table clients.client add foreign key (country_id) references common.country on update cascade on delete restrict;
alter table clients.client add foreign key (document_type_id) references common.document_type on update cascade on delete restrict;

-- Pivot table for client files
create table clients.client_file(
    id bigserial primary key ,
    client_id bigint references clients.client on update cascade on delete cascade,
    file_id bigint references files.file on update cascade on delete cascade
) inherits(public.meta);

-- Pivot table for client contact
CREATE TABLE clients.client_contact (
    id bigserial primary key ,
    client_id bigint references clients.client on update cascade on delete cascade ,
    contact_id bigint references contacts.contact on update cascade on delete cascade
) inherits (public.meta);

create schema configuration;

create table configuration.company
(
    id bigint primary key,
    trade_name text
) inherits (public.meta, templates.legal_data_template, templates.address_template, templates.contact_template);

alter table configuration.company add foreign key (street_suffix_id) references common.street_suffix on update cascade on delete restrict;
alter table configuration.company add foreign key (country_id) references common.country on update cascade on delete restrict;
alter table configuration.company add foreign key (identity_document_type_id) references common.identity_document_type on update cascade on delete restrict;

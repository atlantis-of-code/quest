
-- Separamos este fichero porque depende de campos abstractos

create table common.address ( id bigserial primary key  ) inherits (public.meta, templates.address_template);
alter table common.address add foreign key (street_suffix_id) references common.street_suffix on update cascade on delete restrict;
alter table common.address add foreign key (country_id) references common.country on update cascade on delete restrict;

create table common.legal_data ( id bigserial primary key ) inherits (public.meta, templates.legal_data_template);
alter table common.legal_data add foreign key (identity_document_type_id) references common.identity_document_type on update cascade on delete restrict;

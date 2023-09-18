
-- Separamos este fichero porque depende de campos abstractos

create table common.address ( id bigserial primary key  ) inherits (public.meta, templates.address_template);
alter table common.address add foreign key (street_name_id) references common.street_name on update cascade on delete restrict;
alter table common.address add foreign key (country_id) references common.country on update cascade on delete restrict;

create table common.fiscal_data ( id bigserial primary key ) inherits (public.meta, templates.fiscal_data_template);
alter table common.fiscal_data add foreign key (document_type_id) references common.document_type on update cascade on delete restrict;

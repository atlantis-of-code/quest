create schema configuration;

create table configuration.company
(
    id bigint primary key,
    tradename text
) inherits (public.meta, templates.fiscal_data_template, templates.address_template, templates.contact_template);

alter table configuration.company add foreign key (road_name_id) references common.road_name on update cascade on delete restrict;
alter table configuration.company add foreign key (country_id) references common.country on update cascade on delete restrict;
alter table configuration.company add foreign key (document_type_id) references common.document_type on update cascade on delete restrict;

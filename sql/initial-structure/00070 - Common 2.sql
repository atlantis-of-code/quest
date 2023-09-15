
-- Separamos este fichero porque depende de campos abstractos

create table common.direccion ( id bigserial primary key  ) inherits (public.meta, abstract.emb_direccion);
alter table common.direccion add foreign key (denominacion_via_id) references common.denominacion_via on update cascade on delete restrict;
alter table common.direccion add foreign key (pais_id) references common.pais on update cascade on delete restrict;

create table common.datos_fiscales ( id bigserial primary key ) inherits (public.meta, abstract.emb_datos_fiscales);
alter table common.datos_fiscales add foreign key (tipo_documento_id) references common.tipo_documento on update cascade on delete restrict;

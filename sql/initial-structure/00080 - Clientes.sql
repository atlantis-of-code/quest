CREATE SCHEMA clientes;

CREATE TABLE clientes.cliente (
    id bigserial primary key,
    codigo integer unique not null,
    nombre_comercial text,
    idioma text check ( idioma in (null, 'Español', 'Inglés') ),
    sexo text check ( sexo in (null, 'Mujer', 'Hombre') ),
    fecha_nacimiento timestamp with time zone,
    sector_id bigint references common.sector on update cascade on delete set null ,
    subsector_id bigint references common.subsector on update cascade on delete set null
) INHERITS (public.meta, abstract.emb_direccion, abstract.emb_datos_fiscales, abstract.emb_info_contacto);

alter table clientes.cliente add foreign key (denominacion_via_id) references common.denominacion_via on update cascade on delete restrict;
alter table clientes.cliente add foreign key (pais_id) references common.pais on update cascade on delete restrict;
alter table clientes.cliente add foreign key (tipo_documento_id) references common.tipo_documento on update cascade on delete restrict;

create table clientes.cliente_fichero(
    id bigserial primary key ,
    cliente_id bigint references clientes.cliente on update cascade on delete cascade,
    fichero_id bigint references ficheros.fichero on update cascade on delete cascade
) inherits(public.meta);



create schema ficheros;

create table ficheros.fichero (
    id bigserial primary key,
    nombre text not null,
    mime text not null,
    directorio text not null,
    subdirectorio text,
    referencia_id bigint,
    referencia_classe text not null
) inherits (public.meta);

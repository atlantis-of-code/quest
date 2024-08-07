\c quest;

create schema files;

create table files.file (
    id bigserial primary key,
    name text not null,
    mime text not null,
    directory text not null,
    subdirectory text,
    ref_id bigint,
    ref_class text not null
) inherits (public.meta);

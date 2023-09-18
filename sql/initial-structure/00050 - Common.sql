CREATE SCHEMA common;

CREATE TABLE common.country(
    id bigserial primary key ,
    name text not null,
    iso_code2 text,
    iso_code3 text,
    is_default boolean not null default false -- overridden by client default
) INHERITS (public.meta);

CREATE TABLE common.road_name ( -- TODO: mirar nom correcte -> road_type?
    id bigserial primary key ,
    name text not null,
    is_default boolean not null default false
) INHERITS (public.meta);

CREATE TABLE common.document_type (
    id bigserial primary key ,
    name text not null,
    is_default boolean not null default false
) INHERITS (public.meta);

CREATE TABLE common.pay_mode (
    id bigserial primary key ,
    name text not null,
    is_default boolean not null default false
) inherits (public.meta);

CREATE TABLE common.fiscal_year (
    id bigserial primary key ,
    year integer not null ,
    is_current boolean default false
) inherits (public.meta);

CREATE TABLE common.language (
    id bigserial primary key ,
    name text not null,
    iso_code2 text,
    iso_code3 text,
    is_default boolean not null default false
) inherits (public.meta);

CREATE TABLE common.gender (
    id bigserial primary key ,
    name text not null,
    is_default boolean not null default false
) inherits (public.meta);

CREATE TABLE common.tax (
    id bigserial primary key ,
    name text not null,
    percent numeric not null
) inherits (public.meta);

CREATE TABLE common.series (
    id bigserial primary key ,
    name text not null unique ,
    type text not null check (type in ('Invoice', 'Delivery note', 'Budget', 'Ticket'))
) inherits (public.meta);


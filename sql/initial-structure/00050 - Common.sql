CREATE SCHEMA common;

CREATE TABLE common.country (
    id bigserial primary key ,
    name text not null,
    is_default boolean not null default false,
    iso_code2 text,
    iso_code3 text,
    is_default boolean not null default false -- overridden by customer default
) INHERITS (public.meta);

CREATE TABLE common.street_suffix (
    id bigserial primary key ,
    name text not null,
    abbrv text,
    is_default boolean not null default false
) INHERITS (public.meta);

CREATE TABLE common.identity_document_type (
    id bigserial primary key ,
    name text not null,
    is_default boolean not null default false
) INHERITS (public.meta);

CREATE TABLE common.payment_system ( -- payment_system
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
    percent numeric not null -- rate
) inherits (public.meta);

CREATE TABLE common.series (
    id bigserial primary key ,
    name text not null unique ,
    type text not null check (type in ('Invoice', 'Delivery note', 'Budget', 'Ticket')),
    is_default boolean not null default false
) inherits (public.meta);


CREATE SCHEMA common;

CREATE TABLE common.pais(
    id bigserial primary key ,
    nombre text not null
) INHERITS (public.meta);
INSERT INTO common.pais(nombre) values ('España');

CREATE TABLE common.denominacion_via (
    id bigserial primary key ,
    nombre text not null
) INHERITS (public.meta);
INSERT INTO common.denominacion_via(nombre) values ('Calle');

CREATE TABLE common.tipo_documento (
    id bigserial primary key ,
    nombre text not null
) INHERITS (public.meta);
INSERT INTO common.tipo_documento(nombre) VALUES ('NIF');

CREATE TABLE common.modo_de_pago (
    id bigserial primary key ,
    codigo_nace integer,
    nombre text not null
) inherits (public.meta);
INSERT INTO common.modo_de_pago (codigo_nace, nombre)
VALUES
    (1, 'Tarjeta'),
    (2, 'Efectivo'),
    (3, 'Aplazado'),
    (4, 'Móvil'),
    (5, 'Docimiliado por Repsol'),
    (6, 'Adelantado'),
    (7, 'Domiciliado'),
    (8, 'Transferencia'),
    (9, 'Cheque bancario'),
    (11, 'Waylet');


CREATE TABLE common.sector(
    id bigserial primary key ,
    nombre text not null
) inherits (public.meta);

CREATE TABLE common.subsector(
    id bigserial primary key ,
    nombre text not null,
    sector_id bigint references common.sector on update cascade on delete cascade
) inherits (public.meta);

DO LANGUAGE plpgsql $$
    DECLARE
        sid bigint;
    BEGIN
        --DELETE FROM common.subsector;
        --DELETE FROM common.sector;

        INSERT INTO common.sector(nombre) VALUES ('RESIDENCIAL') RETURNING id INTO sid;
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('GRAN LUJO', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('INST.CENTR.AJENAS', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('VIVIENDA HORIZONTAL', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('VIVIENDA VERTICAL', sid);

        INSERT INTO common.sector(nombre) VALUES ('SERVICIOS') RETURNING id INTO sid;
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('RESIDENCIAS', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('CREMATORIOS', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('AAPP Y OTROS', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('SERVICIOS', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('EJÉRCITO/ARMADA', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('INSTALACIONES DEPOR', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('COLEGIOS', sid);

        INSERT INTO common.sector(nombre) VALUES ('AGRICULTURA Y GANADERÍA') RETURNING id INTO sid;
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('BODEGAS', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('RIEGO', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('MATADEROS', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('INVERNADEROS', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('GRANJAS', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('SECADEROS', sid);

        INSERT INTO common.sector(nombre) VALUES ('INDUSTRIA') RETURNING id INTO sid;
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('ALIMENTARIO', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('ENVASADOR POPULAR', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('FÁBRICA DE GAS', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('CABINAS DE PINTURA', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('TEXTIL', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('INDUSTRIA', sid);

        INSERT INTO common.sector(nombre) VALUES ('HORECA') RETURNING id INTO sid;
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('HOTEL DE CADENA', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('HOTEL INDIVIDUAL', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('RTE.DE CADENA', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('RTE.DE INDIVUDUAL', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('RESTAURACIÓN URBANA', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('CAMPING', sid);
        INSERT INTO common.subsector(nombre, sector_id) VALUES ('ALOJAMIENTO RURAL', sid);

    END
$$;

CREATE TABLE common.anyo_fiscal (
    id bigserial primary key ,
    anyo integer not null ,
    actual boolean default false
) inherits (public.meta);

insert into common.anyo_fiscal (anyo, actual) values (2022, true);




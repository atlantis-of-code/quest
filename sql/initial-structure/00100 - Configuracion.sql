create schema configuracion;

create table configuracion.almacen_gas
(
    id     bigserial primary key,
    codigo text not null,
    nombre text not null
) inherits (public.meta);

insert into configuracion.almacen_gas (codigo, nombre)
values ('0080107085', 'COMARCAL 715'),
       ('0080207085', 'PORRERES');

create table configuracion.empresa
(
    id                    bigint primary key,
    iva                   numeric(20, 2) not null,
    serie_actual_facturas text,
    maximo_cliente_anonimo numeric(20, 2) not null default 400
) inherits (public.meta, abstract.emb_datos_fiscales, abstract.emb_direccion, abstract.emb_info_contacto);
alter table configuracion.empresa
    add foreign key (denominacion_via_id) references common.denominacion_via on update cascade on delete restrict;
alter table configuracion.empresa
    add foreign key (pais_id) references common.pais on update cascade on delete restrict;
alter table configuracion.empresa
    add foreign key (tipo_documento_id) references common.tipo_documento on update cascade on delete restrict;

insert into configuracion.empresa (id,
                                   iva,
                                   nombre_fiscal,
                                   denominacion_via_id,
                                   pais_id)
values (1,
        '21.00',
        'Maversa Marimon',
        1,
        1);

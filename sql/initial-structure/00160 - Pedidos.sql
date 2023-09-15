create schema pedidos;

create table pedidos.ruta (
    id bigserial primary key ,
    nombre text not null
) inherits (public.meta);

create table pedidos.repartidor(
    id bigserial primary key
) inherits (public.meta, abstract.emb_info_contacto, abstract.emb_datos_fiscales);
alter table pedidos.repartidor
    add foreign key (tipo_documento_id) references common.tipo_documento on update cascade on delete set null;

create table pedidos.repartidor_fichero(
    id bigserial primary key ,
    repartidor_id bigint references pedidos.repartidor on update cascade on delete cascade ,
    fichero_id bigint references ficheros.fichero on update cascade on delete cascade
) inherits (public.meta);



create table pedidos.pedido (
    id bigserial primary key ,
    fecha_creacion timestamp with time zone not null,
    fecha_entrega timestamp with time zone,
    alta_en_nace boolean not null default false,
    suministro_express boolean not null default false,
    total numeric(20, 2) not null,
    total_iva numeric(20, 2) not null,
    urgente boolean not null default false,
    ruta_de_guardia boolean not null default false,
    peticion_factura boolean not null default false,
    envio_inmediato_movilidad boolean not null default false,
    entregado boolean not null default false,
    observaciones_pedido text,
    observaciones_cliente text,
    contrato_id bigint references contratos.contrato on update cascade on delete cascade ,
    repartidor_id bigint references pedidos.repartidor on update cascade  on delete restrict ,
    ruta_id bigint references pedidos.ruta on update cascade on delete set null,
    modo_de_pago_id bigint references common.modo_de_pago on update cascade on delete set null
) inherits (public.meta);

create table pedidos.linea_pedido (
    id bigserial primary key ,
    orden integer not null,
    bombona_id bigint references articulos.bombona on update cascade on delete restrict ,
    cantidad integer not null,
    precio_unitario numeric(20,2) not null,
    iva numeric(20, 2) not null,
    pvp numeric(20, 2) not null,
    descuento numeric(20, 2) not null,
    suplemento numeric(20, 2) not null,
    total_linea numeric(20, 2) not null,
    pedido_id bigint references pedidos.pedido on update cascade on delete cascade
) inherits (public.meta);

create table pedidos.pedido_fichero (
    id bigserial primary key ,
    pedido_id bigint references pedidos.pedido on update cascade on delete cascade ,
    fichero_id bigint references ficheros.fichero on update cascade on delete cascade
) inherits (public.meta);

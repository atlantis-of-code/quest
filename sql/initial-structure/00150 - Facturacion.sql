create schema facturacion;

create table facturacion.presupuesto
(
    id bigserial primary key
) inherits (public.meta, abstract.emb_documento);
alter table facturacion.presupuesto
    add foreign key (cliente_id) references clientes.cliente on update cascade on delete restrict;
alter table facturacion.presupuesto
    add foreign key (direccion_fiscal_id) references common.direccion on update cascade on delete restrict;
alter table facturacion.presupuesto
    add foreign key (direccion_obra_id) references common.direccion on update cascade on delete restrict;
alter table facturacion.presupuesto
    add foreign key (anyo_fiscal_id) references common.anyo_fiscal on update cascade on delete restrict;

create table facturacion.linea_presupuesto
(
    id             bigserial primary key,
    presupuesto_id bigint references facturacion.presupuesto on update cascade on delete cascade
) inherits (public.meta, abstract.emb_linea_documento);
alter table facturacion.linea_presupuesto
    add foreign key (articulo_id) references articulos.articulo on update cascade on delete set null;
alter table facturacion.linea_presupuesto
    add foreign key (almacen_id) references articulos.almacen on update cascade on delete set null;

create table facturacion.presupuesto_fichero
(
    id             bigserial primary key,
    presupuesto_id bigint references facturacion.presupuesto on update cascade on delete cascade,
    fichero_id     bigint references ficheros.fichero on update cascade on delete cascade
) inherits (public.meta);

create table facturacion.factura
(
    id                     bigserial primary key,
    copia_datos_cliente_id bigint references common.datos_fiscales on update cascade on delete restrict,
    copia_datos_empresa_id bigint references common.datos_fiscales on update cascade on delete restrict,
    tecnico_id             bigint references tecnicos.tecnico on update cascade on delete restrict
) inherits (public.meta, abstract.emb_documento);
alter table facturacion.factura
    add foreign key (cliente_id) references clientes.cliente on update cascade on delete restrict;
alter table facturacion.factura
    add foreign key (direccion_fiscal_id) references common.direccion on update cascade on delete restrict;
alter table facturacion.factura
    add foreign key (direccion_obra_id) references common.direccion on update cascade on delete restrict;
alter table facturacion.factura
    add foreign key (anyo_fiscal_id) references common.anyo_fiscal on update cascade on delete restrict;

/*
create table facturacion.linea_factura (
   id bigserial primary key,
   factura_id bigint references facturacion.factura on update cascade on delete cascade
) inherits (public.meta, abstract.emb_linea_documento);
alter table facturacion.linea_factura add foreign key (articulo_id) references articulos.articulo on update cascade on delete set null;
 */

create table facturacion.factura_fichero
(
    id         bigserial primary key,
    factura_id bigint references facturacion.factura on update cascade on delete cascade,
    fichero_id bigint references ficheros.fichero on update cascade on delete cascade
) inherits (public.meta);

create table facturacion.ticket
(
    id                     bigserial primary key,
    copia_datos_cliente_id bigint references common.datos_fiscales on update cascade on delete restrict,
    copia_datos_empresa_id bigint references common.datos_fiscales on update cascade on delete restrict
) inherits (public.meta, abstract.emb_documento);
alter table facturacion.ticket
    add foreign key (cliente_id) references clientes.cliente on update cascade on delete restrict;
alter table facturacion.ticket
    alter column cliente_id drop not null;
alter table facturacion.ticket
    add foreign key (direccion_fiscal_id) references common.direccion on update cascade on delete restrict;
alter table facturacion.ticket
    add foreign key (direccion_obra_id) references common.direccion on update cascade on delete restrict;
alter table facturacion.ticket
    add foreign key (anyo_fiscal_id) references common.anyo_fiscal on update cascade on delete restrict;

create table facturacion.ticket_fichero
(
    id         bigserial primary key,
    ticket_id  bigint references facturacion.ticket on update cascade on delete cascade,
    fichero_id bigint references ficheros.fichero on update cascade on delete cascade
) inherits (public.meta);

create table facturacion.albaran
(
    id         bigserial primary key,
    tecnico_id bigint references tecnicos.tecnico on update cascade on delete restrict,
    factura_id bigint references facturacion.factura on update cascade on delete set null
) inherits (public.meta, abstract.emb_documento);
alter table facturacion.albaran
    add foreign key (cliente_id) references clientes.cliente on update cascade on delete restrict;
alter table facturacion.albaran
    add foreign key (direccion_fiscal_id) references common.direccion on update cascade on delete restrict;
alter table facturacion.albaran
    add foreign key (direccion_obra_id) references common.direccion on update cascade on delete restrict;
alter table facturacion.albaran
    add foreign key (anyo_fiscal_id) references common.anyo_fiscal on update cascade on delete restrict;

create table facturacion.linea_albaran
(
    id         bigserial primary key
    -- albaran_id bigint references facturacion.albaran on update cascade on delete cascade
) inherits (public.meta, abstract.emb_linea_documento);
alter table facturacion.linea_albaran
    add foreign key (articulo_id) references articulos.articulo on update cascade on delete set null;
alter table facturacion.linea_albaran
    add foreign key (almacen_id) references articulos.almacen on update cascade on delete restrict;

create table facturacion.albaran_fichero
(
    id         bigserial primary key,
    albaran_id bigint references facturacion.albaran on update cascade on delete cascade,
    fichero_id bigint references ficheros.fichero on update cascade on delete cascade
) inherits (public.meta);

create table facturacion.albaran_linea_albaran(
    id bigserial primary key ,
    albaran_id bigint references facturacion.albaran on update cascade on delete cascade,
    linea_albaran_id bigint references facturacion.linea_albaran on update cascade on delete cascade
) inherits (public.meta);

create table facturacion.ticket_linea_albaran(
    id bigserial primary key ,
    ticket_id bigint references facturacion.ticket on update cascade on delete cascade,
    linea_albaran_id bigint references facturacion.linea_albaran on update cascade on delete cascade
) inherits (public.meta);


/*
 Needed facturacion for movimiento estoc
 */
create table articulos.movimiento_estoc (
    id bigserial primary key ,
    fecha timestamp with time zone not null default now(),
    tipo text not null check ( tipo in ('Albarán', 'Recuento', 'Traspaso', 'Ticket') ),
    nombre_documento text,
    operacion_documento text, -- estado_documento
    nombre_cliente text,
    descripcion text,
    cantidad numeric(20, 0) not null default '0.00',
    estoc_anterior numeric(20, 0) not null default '0.00',
    articulo_id bigint not null references articulos.articulo on update cascade on delete cascade ,
    almacen_id bigint not null references articulos.almacen on update cascade on delete cascade ,
    almacen_aux_id bigint references articulos.almacen on update cascade on delete set null,
    linea_albaran_id bigint references facturacion.linea_albaran on update cascade on delete set null,
    linea_traspaso_estoc_id bigint references articulos.linea_traspaso_estoc on update cascade on delete set null,
    recuento_estoc_id bigint references articulos.recuento_estoc on update cascade on delete cascade
) inherits (public.meta);


create schema articulos;

create table articulos.bombona (
    id bigserial primary key ,
    codigo_maverma text not null,
    codigo_nace text ,
    peso numeric not null ,
    fianza numeric not null default 0.00
) inherits (public.meta);

create table articulos.categoria (
    id bigserial primary key ,
    nombre text not null
) inherits (public.meta);

create table articulos.articulo (
    id bigserial primary key ,
    codigo integer not null,
    nombre text not null,
    precio_base numeric not null default 0.00,
    de_alta boolean not null default true,
    categoria_id bigint references articulos.categoria(id) on update cascade on delete restrict,
    foto_id bigint references ficheros.fichero(id) on update cascade on delete set null
) inherits (public.meta);

create table articulos.articulo_fichero (
    id bigserial primary key ,
    articulo_id bigint references articulos.articulo on update cascade on delete cascade ,
    fichero_id bigint references ficheros.fichero on update cascade on delete cascade
) inherits (public.meta);


create table articulos.almacen (
    id bigserial primary key ,
    nombre text not null
) inherits (public.meta);

create table articulos.estoc (
    id bigserial primary key ,
    cantidad numeric(20, 2) not null default '0.00',
    articulo_id bigint references articulos.articulo on update cascade on delete cascade ,
    almacen_id bigint references articulos.almacen on update cascade on delete cascade
) inherits (public.meta);

create table articulos.recuento_estoc (
    id bigserial primary key ,
    fecha timestamp with time zone not null default now(),
    fichero_id bigint references ficheros.fichero on update cascade on delete restrict
) inherits (public.meta);

create table articulos.traspaso_estoc (
    id bigserial primary key ,
    fecha timestamp with time zone not null default now(),
    almacen_origen_id bigint not null references articulos.almacen on update cascade on delete restrict ,
    almacen_destino_id bigint not null references articulos.almacen on update cascade on delete restrict
) inherits (public.meta);

create table articulos.linea_traspaso_estoc (
    id bigserial primary key ,
    articulo_id bigint references articulos.articulo,
    cantidad numeric not null,
    traspaso_estoc_id bigint references articulos.traspaso_estoc on update cascade on delete cascade
) inherits (public.meta);





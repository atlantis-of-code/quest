

create schema tecnicos;

create table tecnicos.tecnico (
    id bigserial primary key,
    serie_en_facturas text unique
) inherits (public.meta, abstract.emb_info_contacto, abstract.emb_datos_fiscales);

alter table tecnicos.tecnico
    add foreign key (tipo_documento_id) references common.tipo_documento on update cascade on delete set null;


create table tecnicos.tecnico_fichero (
    id bigserial primary key ,
    tecnico_id bigint references tecnicos.tecnico on update cascade on delete cascade,
    fichero_id bigint references ficheros.fichero on update cascade on delete cascade
) inherits(public.meta);

create table tecnicos.vehiculo (
   id bigserial primary key,
   nombre text not null,
   matricula text,
   habilitado boolean default true,
   tecnico_id bigint references tecnicos.tecnico on update cascade on delete set null,
   almacen_id bigint references articulos.estoc on update cascade on delete restrict
) inherits (public.meta);

create table tecnicos.vehiculo_fichero_inspeccion_tecnica (
    id bigserial primary key ,
    vehiculo_id bigint references tecnicos.vehiculo on update cascade on delete cascade ,
    fichero_id bigint references ficheros.fichero on update cascade on delete cascade
) inherits(public.meta);

create table tecnicos.vehiculo_fichero_facturas (
      id bigserial primary key ,
      vehiculo_id bigint references tecnicos.vehiculo on update cascade on delete cascade ,
      fichero_id bigint references ficheros.fichero on update cascade on delete cascade
) inherits(public.meta);

create table tecnicos.vehiculo_fichero_otros (
      id bigserial primary key ,
      vehiculo_id bigint references tecnicos.vehiculo on update cascade on delete cascade ,
      fichero_id bigint references ficheros.fichero on update cascade on delete cascade
) inherits(public.meta);

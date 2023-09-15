
create table abstract.emb_documento (
    serie text,
    numero integer,
    fecha timestamp with time zone,
    observaciones text,
    cliente_id bigint not null references clientes.cliente on update cascade on delete restrict ,
    direccion_fiscal_id bigint references common.direccion on update cascade on delete restrict ,
    direccion_obra_id bigint references common.direccion on update cascade on delete restrict ,
    iva numeric (20, 2),
    total_base numeric(20,2),
    total_impuestos numeric(20, 2),
    total numeric(20, 2),
    anyo_fiscal_id bigint references common.anyo_fiscal on update cascade on delete restrict
);

create table abstract.emb_linea_documento (
    orden integer,
    codigo_articulo text,
    nombre_articulo text,
    precio_base numeric,
    cantidad numeric,
    descuento numeric,
    total_base numeric,
    articulo_id bigint references articulos.articulo on update cascade on delete set null,
    almacen_id bigint references articulos.almacen on update cascade on delete restrict
);


create schema abstract;

create table abstract.emb_direccion (
    codigo_postal text,
    provincia text,
    municipio text,
    localidad text,
    nombre_via text,
    numero text,
    piso text,
    puerta text,
    bloque text,
    portal text,
    escalera text,
    edificio_o_urbanizacion text,
    geoposicion text,
    datos_adicionales text,
    denominacion_via_id bigint not null references common.denominacion_via on update cascade on delete restrict,
    pais_id bigint not null references common.pais on update cascade on delete restrict
);

create table abstract.emb_datos_fiscales (
    nombre_fiscal text,
    apellido_1 text,
    apellido_2 text,
    numero_documento text,
    tipo_documento_id bigint references common.tipo_documento on update cascade on delete restrict
);

create table abstract.emb_info_contacto (
    telefono1 text,
    telefono2 text,
    telefono3 text,
    email text
);




CREATE SCHEMA contactos;

CREATE TABLE contactos.contacto (
    id bigserial primary key ,
    nombre text
) inherits (public.meta, abstract.emb_info_contacto);

-- Append to contactos to cliente

CREATE TABLE contactos.contacto_cliente (
    id bigserial primary key ,
    cliente_id bigint references clientes.cliente on update cascade on delete cascade ,
    contacto_id bigint references contactos.contacto on update cascade on delete cascade
) inherits (public.meta);

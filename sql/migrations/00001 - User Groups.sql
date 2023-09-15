create schema usuarios;

alter table public.user set schema usuarios;
alter table usuarios.user rename to usuario;
alter table usuarios.usuario rename name TO nombre;
alter table usuarios.usuario add column tecnico_id bigint unique nulls distinct references tecnicos.tecnico on update cascade on delete restrict;
alter table usuarios.usuario add column repartidor_id bigint unique nulls distinct references pedidos.repartidor on update cascade on delete restrict;

ALTER TABLE IF EXISTS usuarios.usuario
    RENAME password TO contrasenya;

ALTER TABLE IF EXISTS usuarios.usuario
    RENAME full_name TO nombre_completo;

create table usuarios.grupo (
    id bigserial primary key ,
    nombre text not null
) inherits (public.meta);

create table usuarios.usuario_grupo (
    id bigserial primary key ,
    usuario_id bigint references usuarios.usuario(id) on update cascade on delete cascade ,
    grupo_id bigint references usuarios.grupo(id) on update cascade on delete cascade
) inherits (public.meta);

do language plpgsql $$
declare
    userId bigint;
    groupId bigint;
begin
    insert into usuarios.grupo(nombre) values ('admin') returning id into groupId;
    for userId in select * from usuarios.usuario where nombre in ('jeroni', 'josep') loop
        insert into usuarios.usuario_grupo(usuario_id, grupo_id) values (userId, groupId);
    end loop;
end
$$;

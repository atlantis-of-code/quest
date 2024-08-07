\c quest;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- creates users schema
create schema users;

-- create table users.user
CREATE TABLE users."aoc_user" (
    id bigserial PRIMARY KEY ,
    username text not null,
    email text not null,
    pass text not null,
    full_name text
) INHERITS (public.meta);

-- add a user named "dev" with password "dev"
insert into users."aoc_user" (username, email, pass)
values ('dev', 'dev@mail.to', crypt('dev', gen_salt('bf')));

\c quest;

CREATE SCHEMA contacts;

CREATE TABLE contacts.contact (
    id bigserial primary key ,
    name text
) inherits (public.meta, templates.contact_template); -- phone1, phone2... from templates


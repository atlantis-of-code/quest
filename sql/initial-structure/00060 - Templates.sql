
create schema templates;

create table templates.address_template (
    zip_code text,
    state text,
    city text, -- municipio
    area text, -- localidad
    street_name text, -- nom de sa via, mirar que empleen ells, seria address supòs, però és es nom de sa taula, address_name?
    street_number text,
    floor text, -- pis
    door text,
    block text,
    -- portal text, -- Aquest crec que ho llevaria
    -- staircase text, -- escalera: Crec que també el podem llevar
    -- building_or_complex text, -- edificio o urbanización
    coordinates text, -- el lleva,?
    additional_data text, -- ??? info random supòs tipo "ses claus estan damunt es cossiol XD
    street_suffix_id bigint not null references common.street_suffix on update cascade on delete restrict,
    country_id bigint not null references common.country on update cascade on delete restrict
);

create table templates.legal_data_template (
    legal_name text,
    -- first_surname text,
    -- second_surname text,
    document_number text,
    identity_document_type_id bigint references common.identity_document_type on update cascade on delete restrict
);

create table templates.contact_template (
    phone1 text,
    phone2 text,
    email text,
    fax text
);


create schema templates;

create table templates.address_template (
    zip_code text,
    province text, -- county === condado
    township text, -- municipio
    locality text, -- localidad
    name text, -- nom de sa via, mirar que empleen ells, seria address supòs, però és es nom de sa taula, address_name?
    number text,
    floor text, -- pis
    door text,
    block text,
    portal text, -- Aquest crec que ho llevaria
    staircase text, -- escalera: Crec que també el podem llevar
    building_or_complex text, -- edificio o urbanización
    geoposition text, -- el lleva,?
    additional_data text, -- ??? info random supòs tipo "ses claus estan damunt es cossiol XD
    road_name_id bigint not null references common.road_name on update cascade on delete restrict,
    country_id bigint not null references common.country on update cascade on delete restrict
);

create table templates.fiscal_data_template (
    fiscal_name text,
    first_surname text,
    second_surname text,
    document_number text,
    document_type_id bigint references common.document_type on update cascade on delete restrict
);

create table templates.contact_template (
    phone1 text,
    phone2 text,
    email text,
    fax text
);


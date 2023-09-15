
CREATE SCHEMA contratos;

CREATE TABLE contratos.estacion_de_servicio (
    id bigserial primary key ,
    codigo text,
    nombre text not null,
    telefono text,
    localidad text,
    direccion text
) INHERITS (public.meta);

INSERT INTO contratos.estacion_de_servicio (codigo, nombre, telefono, localidad, direccion)
VALUES
    ('0210000113',  'LLUCHMAYOR (E.S. CAMPSARED)',  '971440447',        'LLUCMAJOR',                'CARRETERA CTR.PALMA-LLUCHMAYOR(PM-602),KM 16.45'),
    ('0210000118',  'E.S. AVENIDAS',                '971551031',        'MANACOR',                  'CARRETERA CTRA. PM-402, KM. 1,6'),
    ('0210000120',  'E.S ALGAIDA',                  '971665147',        'ALGAIDA',                  'CALLE C-715 KM 21'),
    ('0210000121',  'E.S CAMPOS',                   '971650153',        'CAMPOS',                   'CARRETERA MA-19, S-N'),
    ('0210000122',  'E.S MANACOR',                  '971844965',        'MANACOR',                  'CARRETERA CTRA C-715 KM 48'),
    ('0210000124',  'E.S. SANTANYI',                '971654229',        'SANTANYI',                 'CARRETERA CTRA. PALMA PORTO PETRO KM. 49,7'),
    ('0210000135',  'E.S CANTO DE''N MASANA',       '655554782',        'FELANITX',                 'CARRETERA CTRA PM-401 KM 0,4'),
    ('0210000140',  'HOSPITAL MANACOR',             '971843470',        'MANACOR',                  'CALLE VIA PALMA, 87'),
    ('0210000141',  'E.S. SAN JOAN',                '971560153',        'SANT JOAN',                'CARRETERA CR. C-715, 36.6'),
    ('0210000151',  'E.S. PINARO',                  '971822083',        'PORTO CRISTO',             'RONDA DE L''OEST, 123'),
    ('0210000153',  'E.S. FONTANET',                '971580499',        'FELANITX',                 'CARRETERA CTRA. CAMPOS, 85'),
    ('0210000159',  'E.S.GASAUTO MANACOR (MAVERSA)','971551995',        'MANACOR',                  'PASEO FERROCARRIL, 60'),
    ('0210000668',  'SON ANTEM',                    '971427736',        'LLUCMAJOR',                'CARRETERA CTRA. PM - 602 LLUCMAJOR - ARENA, KM. 5'),
    ('0210000669',  'E.S. COLONIA DE SANT JORDI',   '971655066',        'COLÒNIA DE SANT JORDI',    'AVENIDA MARQUÉS DEL PALMER, 86'),
    ('0210001697',  'DISGASOIL, S.L.',              '971163320',        'SANTANYÍ',                 'CARRETERA MA-19, S-N'),
    ('0210005045',  'FEBRER 05',                    '971552831',        'MANACOR',                  'AVENIDA D''EN JOAN MIRO, S-N'),
    ('0210005171',  'ISB PORTO COLOM',              null,               'PORTOCOLOM',               'CALLE CRISTÒFOR COLOM, 3'),
    ('0210005540',  'ES EL BOSQUE',                 '971824272/658152', 'PORTOCOLOM',               'CARRETERA CR FELANITX-PORTO COLOM (CAN MONAL), km 8,2'),
    ('0210006737',  'ES MANACOR II',                '971844119',        'MANACOR',                  'CALLE VIA MAJORICA, SN')
;

CREATE TABLE contratos.contrato (
    id bigserial primary key,
    numero_poliza integer,
    tipo_suministro text check ( tipo_suministro in ('Domiciliario', 'No domiciliario') ),
    firmado boolean default false,
    fecha_alta timestamp with time zone,
    fecha_baja timestamp with time zone,
    fecha_proximo_envio timestamp with time zone,
    fecha_vencimiento_revision timestamp with time zone,
    vehiculo text check (vehiculo in (null, 'Autocaravana', 'Itinerante')),
    matricula text,
    persona_contacto text,
    cliente_id bigint references clientes.cliente on update cascade on delete restrict,
    estacion_de_servicio_id bigint references contratos.estacion_de_servicio on update cascade on delete restrict ,
    datos_fiscales_id bigint references common.datos_fiscales on update cascade on delete set null ,
    direccion_fiscal_id bigint references common.direccion on update cascade on delete set null ,
    direccion_suministro_id bigint references common.direccion on update cascade on delete set null ,
    direccion_correspondencia_id bigint references common.direccion on update cascade on delete set null,
    pagador_alternativo_datos_fiscales_id bigint references common.datos_fiscales on update cascade on delete set null,
    pagador_alternativo_direccion_id bigint references common.direccion on update cascade on delete set null,
    sector_id bigint references common.sector on update cascade on delete set null ,
    subsector_id bigint references common.subsector on update cascade on delete set null,
    almacen_gas_id bigint not null references configuracion.almacen_gas on update cascade on delete restrict
) INHERITS (public.meta, abstract.emb_info_contacto);

CREATE TABLE contratos.descuento (
    id bigserial primary key ,
    bombona_id bigint references articulos.bombona(id) on update cascade on delete restrict ,
    contrato_id bigint references contratos.contrato(id) on update cascade on delete cascade ,
    descuento_euros numeric,
    descuento_porcentaje numeric,
    fecha_inicio timestamp with time zone,
    fecha_fin timestamp with time zone,
    porcentaje_agencia numeric,
    porcentaje_repsol numeric,
    descuento_maximo boolean default false
) INHERITS (public.meta);

CREATE TABLE contratos.revision (
    id bigserial primary key ,
    contrato_id bigint references contratos.contrato on update cascade on delete cascade ,
    fecha timestamp with time zone,
    resultado text,
    numero integer,
    tipo text
) INHERITS (public.meta);

/*
    {
        "anyo": "0",
        "marca": "SMEG",
        "modelo": "",
        "potencia": "12,00",
        "producto": "",
        "tipo": "COCINA CON INSTALACIÓN RÍGIDA"
    }
 */
CREATE TABLE contratos.aparato (
    id bigserial primary key ,
    anyo integer,
    marca text,
    modelo text,
    potencia numeric(20, 2) default '0.00',
    tipo text,
    contrato_id bigint references contratos.contrato on update cascade on delete cascade
) inherits (public.meta);

create table contratos.visita (
    id bigserial primary key ,
    fecha timestamp with time zone,
    descripcion text not null,
    contrato_id bigint references contratos.contrato on update cascade on delete cascade
) inherits (public.meta);

create table contratos.contrato_fichero (
    id bigserial primary key ,
    contrato_id bigint references contratos.contrato on update cascade on delete cascade,
    fichero_id bigint references ficheros.fichero on update cascade on delete cascade
) inherits (public.meta);

create table contratos.contrato_bombona (
    id bigserial primary key ,
    bombona_id bigint not null references articulos.bombona(id) on update cascade on delete restrict ,
    contrato_id bigint not null references contratos.contrato(id) on update cascade on delete cascade ,
    cantidad_contratada integer not null default 0,
    cantidad_entregada integer not null default 0,
    fianza numeric not null default 0.00
) inherits (public.meta);

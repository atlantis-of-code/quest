--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.3

-- Started on 2024-08-07 09:24:18 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3958 (class 1262 OID 16384)
-- Name: quest; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE quest WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE quest OWNER TO postgres;

\connect quest

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 7 (class 2615 OID 16385)
-- Name: accounting; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA accounting;


ALTER SCHEMA accounting OWNER TO postgres;

--
-- TOC entry 8 (class 2615 OID 16386)
-- Name: common; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA common;


ALTER SCHEMA common OWNER TO postgres;

--
-- TOC entry 9 (class 2615 OID 16387)
-- Name: configuration; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA configuration;


ALTER SCHEMA configuration OWNER TO postgres;

--
-- TOC entry 10 (class 2615 OID 16388)
-- Name: contacts; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA contacts;


ALTER SCHEMA contacts OWNER TO postgres;

--
-- TOC entry 11 (class 2615 OID 16389)
-- Name: customers; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA customers;


ALTER SCHEMA customers OWNER TO postgres;

--
-- TOC entry 12 (class 2615 OID 16390)
-- Name: files; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA files;


ALTER SCHEMA files OWNER TO postgres;

--
-- TOC entry 13 (class 2615 OID 16391)
-- Name: invoicing; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA invoicing;


ALTER SCHEMA invoicing OWNER TO postgres;

--
-- TOC entry 14 (class 2615 OID 16392)
-- Name: items; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA items;


ALTER SCHEMA items OWNER TO postgres;

--
-- TOC entry 15 (class 2615 OID 16393)
-- Name: templates; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA templates;


ALTER SCHEMA templates OWNER TO postgres;

--
-- TOC entry 16 (class 2615 OID 16394)
-- Name: users; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA users;


ALTER SCHEMA users OWNER TO postgres;

--
-- TOC entry 2 (class 3079 OID 16395)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 3959 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 16432)
-- Name: meta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.meta (
    creation_user text,
    creation_time bigint,
    modification_user text,
    modification_time bigint
);


ALTER TABLE public.meta OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16437)
-- Name: invoice_payment; Type: TABLE; Schema: accounting; Owner: postgres
--

CREATE TABLE accounting.invoice_payment (
    id bigint NOT NULL,
    invoice_id bigint,
    payment_id bigint
)
INHERITS (public.meta);


ALTER TABLE accounting.invoice_payment OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16442)
-- Name: invoice_payment_id_seq; Type: SEQUENCE; Schema: accounting; Owner: postgres
--

CREATE SEQUENCE accounting.invoice_payment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE accounting.invoice_payment_id_seq OWNER TO postgres;

--
-- TOC entry 3960 (class 0 OID 0)
-- Dependencies: 228
-- Name: invoice_payment_id_seq; Type: SEQUENCE OWNED BY; Schema: accounting; Owner: postgres
--

ALTER SEQUENCE accounting.invoice_payment_id_seq OWNED BY accounting.invoice_payment.id;


--
-- TOC entry 229 (class 1259 OID 16443)
-- Name: payment; Type: TABLE; Schema: accounting; Owner: postgres
--

CREATE TABLE accounting.payment (
    id bigint NOT NULL,
    date timestamp with time zone DEFAULT now() NOT NULL,
    quantity numeric NOT NULL,
    payment_system_id bigint
)
INHERITS (public.meta);


ALTER TABLE accounting.payment OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16449)
-- Name: payment_id_seq; Type: SEQUENCE; Schema: accounting; Owner: postgres
--

CREATE SEQUENCE accounting.payment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE accounting.payment_id_seq OWNER TO postgres;

--
-- TOC entry 3961 (class 0 OID 0)
-- Dependencies: 230
-- Name: payment_id_seq; Type: SEQUENCE OWNED BY; Schema: accounting; Owner: postgres
--

ALTER SEQUENCE accounting.payment_id_seq OWNED BY accounting.payment.id;


--
-- TOC entry 231 (class 1259 OID 16450)
-- Name: ticket_payment; Type: TABLE; Schema: accounting; Owner: postgres
--

CREATE TABLE accounting.ticket_payment (
    id bigint NOT NULL,
    ticket_id bigint,
    payment_id bigint
)
INHERITS (public.meta);


ALTER TABLE accounting.ticket_payment OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16455)
-- Name: ticket_payment_id_seq; Type: SEQUENCE; Schema: accounting; Owner: postgres
--

CREATE SEQUENCE accounting.ticket_payment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE accounting.ticket_payment_id_seq OWNER TO postgres;

--
-- TOC entry 3962 (class 0 OID 0)
-- Dependencies: 232
-- Name: ticket_payment_id_seq; Type: SEQUENCE OWNED BY; Schema: accounting; Owner: postgres
--

ALTER SEQUENCE accounting.ticket_payment_id_seq OWNED BY accounting.ticket_payment.id;


--
-- TOC entry 233 (class 1259 OID 16456)
-- Name: address_template; Type: TABLE; Schema: templates; Owner: postgres
--

CREATE TABLE templates.address_template (
    zip_code text,
    state text,
    city text,
    area text,
    street_name text,
    street_number text,
    floor text,
    door text,
    block text,
    coordinates text,
    additional_data text,
    street_suffix_id bigint NOT NULL,
    country_id bigint NOT NULL
);


ALTER TABLE templates.address_template OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 16461)
-- Name: address; Type: TABLE; Schema: common; Owner: postgres
--

CREATE TABLE common.address (
    id bigint NOT NULL
)
INHERITS (public.meta, templates.address_template);


ALTER TABLE common.address OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16466)
-- Name: address_id_seq; Type: SEQUENCE; Schema: common; Owner: postgres
--

CREATE SEQUENCE common.address_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE common.address_id_seq OWNER TO postgres;

--
-- TOC entry 3963 (class 0 OID 0)
-- Dependencies: 235
-- Name: address_id_seq; Type: SEQUENCE OWNED BY; Schema: common; Owner: postgres
--

ALTER SEQUENCE common.address_id_seq OWNED BY common.address.id;


--
-- TOC entry 236 (class 1259 OID 16467)
-- Name: country; Type: TABLE; Schema: common; Owner: postgres
--

CREATE TABLE common.country (
    id bigint NOT NULL,
    name text NOT NULL,
    is_default boolean DEFAULT false NOT NULL,
    iso_code2 text,
    iso_code3 text
)
INHERITS (public.meta);


ALTER TABLE common.country OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16473)
-- Name: country_id_seq; Type: SEQUENCE; Schema: common; Owner: postgres
--

CREATE SEQUENCE common.country_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE common.country_id_seq OWNER TO postgres;

--
-- TOC entry 3964 (class 0 OID 0)
-- Dependencies: 237
-- Name: country_id_seq; Type: SEQUENCE OWNED BY; Schema: common; Owner: postgres
--

ALTER SEQUENCE common.country_id_seq OWNED BY common.country.id;


--
-- TOC entry 238 (class 1259 OID 16474)
-- Name: fiscal_year; Type: TABLE; Schema: common; Owner: postgres
--

CREATE TABLE common.fiscal_year (
    id bigint NOT NULL,
    year integer NOT NULL,
    is_current boolean DEFAULT false
)
INHERITS (public.meta);


ALTER TABLE common.fiscal_year OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 16480)
-- Name: fiscal_year_id_seq; Type: SEQUENCE; Schema: common; Owner: postgres
--

CREATE SEQUENCE common.fiscal_year_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE common.fiscal_year_id_seq OWNER TO postgres;

--
-- TOC entry 3965 (class 0 OID 0)
-- Dependencies: 239
-- Name: fiscal_year_id_seq; Type: SEQUENCE OWNED BY; Schema: common; Owner: postgres
--

ALTER SEQUENCE common.fiscal_year_id_seq OWNED BY common.fiscal_year.id;


--
-- TOC entry 240 (class 1259 OID 16481)
-- Name: gender; Type: TABLE; Schema: common; Owner: postgres
--

CREATE TABLE common.gender (
    id bigint NOT NULL,
    name text NOT NULL,
    is_default boolean DEFAULT false NOT NULL
)
INHERITS (public.meta);


ALTER TABLE common.gender OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 16487)
-- Name: gender_id_seq; Type: SEQUENCE; Schema: common; Owner: postgres
--

CREATE SEQUENCE common.gender_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE common.gender_id_seq OWNER TO postgres;

--
-- TOC entry 3966 (class 0 OID 0)
-- Dependencies: 241
-- Name: gender_id_seq; Type: SEQUENCE OWNED BY; Schema: common; Owner: postgres
--

ALTER SEQUENCE common.gender_id_seq OWNED BY common.gender.id;


--
-- TOC entry 242 (class 1259 OID 16488)
-- Name: identity_document_type; Type: TABLE; Schema: common; Owner: postgres
--

CREATE TABLE common.identity_document_type (
    id bigint NOT NULL,
    name text NOT NULL,
    is_default boolean DEFAULT false NOT NULL
)
INHERITS (public.meta);


ALTER TABLE common.identity_document_type OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 16494)
-- Name: identity_document_type_id_seq; Type: SEQUENCE; Schema: common; Owner: postgres
--

CREATE SEQUENCE common.identity_document_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE common.identity_document_type_id_seq OWNER TO postgres;

--
-- TOC entry 3967 (class 0 OID 0)
-- Dependencies: 243
-- Name: identity_document_type_id_seq; Type: SEQUENCE OWNED BY; Schema: common; Owner: postgres
--

ALTER SEQUENCE common.identity_document_type_id_seq OWNED BY common.identity_document_type.id;


--
-- TOC entry 244 (class 1259 OID 16495)
-- Name: language; Type: TABLE; Schema: common; Owner: postgres
--

CREATE TABLE common.language (
    id bigint NOT NULL,
    name text NOT NULL,
    iso_code2 text,
    iso_code3 text,
    is_default boolean DEFAULT false NOT NULL
)
INHERITS (public.meta);


ALTER TABLE common.language OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 16501)
-- Name: language_id_seq; Type: SEQUENCE; Schema: common; Owner: postgres
--

CREATE SEQUENCE common.language_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE common.language_id_seq OWNER TO postgres;

--
-- TOC entry 3968 (class 0 OID 0)
-- Dependencies: 245
-- Name: language_id_seq; Type: SEQUENCE OWNED BY; Schema: common; Owner: postgres
--

ALTER SEQUENCE common.language_id_seq OWNED BY common.language.id;


--
-- TOC entry 246 (class 1259 OID 16502)
-- Name: legal_data_template; Type: TABLE; Schema: templates; Owner: postgres
--

CREATE TABLE templates.legal_data_template (
    legal_name text,
    document_number text,
    identity_document_type_id bigint
);


ALTER TABLE templates.legal_data_template OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 16507)
-- Name: legal_data; Type: TABLE; Schema: common; Owner: postgres
--

CREATE TABLE common.legal_data (
    id bigint NOT NULL
)
INHERITS (public.meta, templates.legal_data_template);


ALTER TABLE common.legal_data OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 16512)
-- Name: legal_data_id_seq; Type: SEQUENCE; Schema: common; Owner: postgres
--

CREATE SEQUENCE common.legal_data_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE common.legal_data_id_seq OWNER TO postgres;

--
-- TOC entry 3969 (class 0 OID 0)
-- Dependencies: 248
-- Name: legal_data_id_seq; Type: SEQUENCE OWNED BY; Schema: common; Owner: postgres
--

ALTER SEQUENCE common.legal_data_id_seq OWNED BY common.legal_data.id;


--
-- TOC entry 249 (class 1259 OID 16513)
-- Name: payment_system; Type: TABLE; Schema: common; Owner: postgres
--

CREATE TABLE common.payment_system (
    id bigint NOT NULL,
    name text NOT NULL,
    is_default boolean DEFAULT false NOT NULL
)
INHERITS (public.meta);


ALTER TABLE common.payment_system OWNER TO postgres;

--
-- TOC entry 250 (class 1259 OID 16519)
-- Name: payment_system_id_seq; Type: SEQUENCE; Schema: common; Owner: postgres
--

CREATE SEQUENCE common.payment_system_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE common.payment_system_id_seq OWNER TO postgres;

--
-- TOC entry 3970 (class 0 OID 0)
-- Dependencies: 250
-- Name: payment_system_id_seq; Type: SEQUENCE OWNED BY; Schema: common; Owner: postgres
--

ALTER SEQUENCE common.payment_system_id_seq OWNED BY common.payment_system.id;


--
-- TOC entry 251 (class 1259 OID 16520)
-- Name: series; Type: TABLE; Schema: common; Owner: postgres
--

CREATE TABLE common.series (
    id bigint NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    is_default boolean DEFAULT false NOT NULL,
    CONSTRAINT series_type_check CHECK ((type = ANY (ARRAY['Invoice'::text, 'Delivery note'::text, 'Budget'::text, 'Ticket'::text])))
)
INHERITS (public.meta);


ALTER TABLE common.series OWNER TO postgres;

--
-- TOC entry 252 (class 1259 OID 16527)
-- Name: series_id_seq; Type: SEQUENCE; Schema: common; Owner: postgres
--

CREATE SEQUENCE common.series_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE common.series_id_seq OWNER TO postgres;

--
-- TOC entry 3971 (class 0 OID 0)
-- Dependencies: 252
-- Name: series_id_seq; Type: SEQUENCE OWNED BY; Schema: common; Owner: postgres
--

ALTER SEQUENCE common.series_id_seq OWNED BY common.series.id;


--
-- TOC entry 253 (class 1259 OID 16528)
-- Name: street_suffix; Type: TABLE; Schema: common; Owner: postgres
--

CREATE TABLE common.street_suffix (
    id bigint NOT NULL,
    name text NOT NULL,
    abbrv text,
    is_default boolean DEFAULT false NOT NULL
)
INHERITS (public.meta);


ALTER TABLE common.street_suffix OWNER TO postgres;

--
-- TOC entry 254 (class 1259 OID 16534)
-- Name: street_suffix_id_seq; Type: SEQUENCE; Schema: common; Owner: postgres
--

CREATE SEQUENCE common.street_suffix_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE common.street_suffix_id_seq OWNER TO postgres;

--
-- TOC entry 3972 (class 0 OID 0)
-- Dependencies: 254
-- Name: street_suffix_id_seq; Type: SEQUENCE OWNED BY; Schema: common; Owner: postgres
--

ALTER SEQUENCE common.street_suffix_id_seq OWNED BY common.street_suffix.id;


--
-- TOC entry 255 (class 1259 OID 16535)
-- Name: tax; Type: TABLE; Schema: common; Owner: postgres
--

CREATE TABLE common.tax (
    id bigint NOT NULL,
    name text NOT NULL,
    percent numeric NOT NULL,
    is_default boolean DEFAULT false NOT NULL
)
INHERITS (public.meta);


ALTER TABLE common.tax OWNER TO postgres;

--
-- TOC entry 256 (class 1259 OID 16541)
-- Name: tax_id_seq; Type: SEQUENCE; Schema: common; Owner: postgres
--

CREATE SEQUENCE common.tax_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE common.tax_id_seq OWNER TO postgres;

--
-- TOC entry 3973 (class 0 OID 0)
-- Dependencies: 256
-- Name: tax_id_seq; Type: SEQUENCE OWNED BY; Schema: common; Owner: postgres
--

ALTER SEQUENCE common.tax_id_seq OWNED BY common.tax.id;


--
-- TOC entry 257 (class 1259 OID 16542)
-- Name: contact_template; Type: TABLE; Schema: templates; Owner: postgres
--

CREATE TABLE templates.contact_template (
    phone1 text,
    phone2 text,
    email text,
    fax text
);


ALTER TABLE templates.contact_template OWNER TO postgres;

--
-- TOC entry 258 (class 1259 OID 16547)
-- Name: company; Type: TABLE; Schema: configuration; Owner: postgres
--

CREATE TABLE configuration.company (
    id bigint NOT NULL,
    trade_name text
)
INHERITS (public.meta, templates.legal_data_template, templates.address_template, templates.contact_template);


ALTER TABLE configuration.company OWNER TO postgres;

--
-- TOC entry 259 (class 1259 OID 16552)
-- Name: company_id_seq; Type: SEQUENCE; Schema: configuration; Owner: postgres
--

CREATE SEQUENCE configuration.company_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE configuration.company_id_seq OWNER TO postgres;

--
-- TOC entry 3974 (class 0 OID 0)
-- Dependencies: 259
-- Name: company_id_seq; Type: SEQUENCE OWNED BY; Schema: configuration; Owner: postgres
--

ALTER SEQUENCE configuration.company_id_seq OWNED BY configuration.company.id;


--
-- TOC entry 260 (class 1259 OID 16553)
-- Name: contact; Type: TABLE; Schema: contacts; Owner: postgres
--

CREATE TABLE contacts.contact (
    id bigint NOT NULL,
    name text
)
INHERITS (public.meta, templates.contact_template);


ALTER TABLE contacts.contact OWNER TO postgres;

--
-- TOC entry 261 (class 1259 OID 16558)
-- Name: contact_id_seq; Type: SEQUENCE; Schema: contacts; Owner: postgres
--

CREATE SEQUENCE contacts.contact_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE contacts.contact_id_seq OWNER TO postgres;

--
-- TOC entry 3975 (class 0 OID 0)
-- Dependencies: 261
-- Name: contact_id_seq; Type: SEQUENCE OWNED BY; Schema: contacts; Owner: postgres
--

ALTER SEQUENCE contacts.contact_id_seq OWNED BY contacts.contact.id;


--
-- TOC entry 262 (class 1259 OID 16559)
-- Name: customer; Type: TABLE; Schema: customers; Owner: postgres
--

CREATE TABLE customers.customer (
    id bigint NOT NULL,
    code integer NOT NULL,
    trade_name text,
    birthdate timestamp with time zone,
    gender_id bigint,
    language_id bigint
)
INHERITS (public.meta, templates.address_template, templates.legal_data_template, templates.contact_template);


ALTER TABLE customers.customer OWNER TO postgres;

--
-- TOC entry 263 (class 1259 OID 16564)
-- Name: customer_contact; Type: TABLE; Schema: customers; Owner: postgres
--

CREATE TABLE customers.customer_contact (
    id bigint NOT NULL,
    customer_id bigint,
    contact_id bigint
)
INHERITS (public.meta);


ALTER TABLE customers.customer_contact OWNER TO postgres;

--
-- TOC entry 264 (class 1259 OID 16569)
-- Name: customer_contact_id_seq; Type: SEQUENCE; Schema: customers; Owner: postgres
--

CREATE SEQUENCE customers.customer_contact_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE customers.customer_contact_id_seq OWNER TO postgres;

--
-- TOC entry 3976 (class 0 OID 0)
-- Dependencies: 264
-- Name: customer_contact_id_seq; Type: SEQUENCE OWNED BY; Schema: customers; Owner: postgres
--

ALTER SEQUENCE customers.customer_contact_id_seq OWNED BY customers.customer_contact.id;


--
-- TOC entry 265 (class 1259 OID 16570)
-- Name: customer_file; Type: TABLE; Schema: customers; Owner: postgres
--

CREATE TABLE customers.customer_file (
    id bigint NOT NULL,
    customer_id bigint,
    file_id bigint
)
INHERITS (public.meta);


ALTER TABLE customers.customer_file OWNER TO postgres;

--
-- TOC entry 266 (class 1259 OID 16575)
-- Name: customer_file_id_seq; Type: SEQUENCE; Schema: customers; Owner: postgres
--

CREATE SEQUENCE customers.customer_file_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE customers.customer_file_id_seq OWNER TO postgres;

--
-- TOC entry 3977 (class 0 OID 0)
-- Dependencies: 266
-- Name: customer_file_id_seq; Type: SEQUENCE OWNED BY; Schema: customers; Owner: postgres
--

ALTER SEQUENCE customers.customer_file_id_seq OWNED BY customers.customer_file.id;


--
-- TOC entry 267 (class 1259 OID 16576)
-- Name: customer_id_seq; Type: SEQUENCE; Schema: customers; Owner: postgres
--

CREATE SEQUENCE customers.customer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE customers.customer_id_seq OWNER TO postgres;

--
-- TOC entry 3978 (class 0 OID 0)
-- Dependencies: 267
-- Name: customer_id_seq; Type: SEQUENCE OWNED BY; Schema: customers; Owner: postgres
--

ALTER SEQUENCE customers.customer_id_seq OWNED BY customers.customer.id;


--
-- TOC entry 268 (class 1259 OID 16577)
-- Name: file; Type: TABLE; Schema: files; Owner: postgres
--

CREATE TABLE files.file (
    id bigint NOT NULL,
    name text NOT NULL,
    mime text NOT NULL,
    directory text NOT NULL,
    subdirectory text,
    ref_id bigint,
    ref_class text NOT NULL
)
INHERITS (public.meta);


ALTER TABLE files.file OWNER TO postgres;

--
-- TOC entry 269 (class 1259 OID 16582)
-- Name: file_id_seq; Type: SEQUENCE; Schema: files; Owner: postgres
--

CREATE SEQUENCE files.file_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE files.file_id_seq OWNER TO postgres;

--
-- TOC entry 3979 (class 0 OID 0)
-- Dependencies: 269
-- Name: file_id_seq; Type: SEQUENCE OWNED BY; Schema: files; Owner: postgres
--

ALTER SEQUENCE files.file_id_seq OWNED BY files.file.id;


--
-- TOC entry 270 (class 1259 OID 16583)
-- Name: document_template; Type: TABLE; Schema: templates; Owner: postgres
--

CREATE TABLE templates.document_template (
    number integer,
    date timestamp with time zone,
    observations text,
    total_base numeric(20,2),
    total_taxes numeric(20,2),
    total numeric(20,2),
    customer_id bigint NOT NULL,
    series_id bigint,
    fiscal_year_id bigint
);


ALTER TABLE templates.document_template OWNER TO postgres;

--
-- TOC entry 271 (class 1259 OID 16588)
-- Name: budget; Type: TABLE; Schema: invoicing; Owner: postgres
--

CREATE TABLE invoicing.budget (
    id bigint NOT NULL
)
INHERITS (public.meta, templates.document_template);


ALTER TABLE invoicing.budget OWNER TO postgres;

--
-- TOC entry 272 (class 1259 OID 16593)
-- Name: budget_file; Type: TABLE; Schema: invoicing; Owner: postgres
--

CREATE TABLE invoicing.budget_file (
    id bigint NOT NULL,
    budget_id bigint,
    file_id bigint
)
INHERITS (public.meta);


ALTER TABLE invoicing.budget_file OWNER TO postgres;

--
-- TOC entry 273 (class 1259 OID 16598)
-- Name: budget_file_id_seq; Type: SEQUENCE; Schema: invoicing; Owner: postgres
--

CREATE SEQUENCE invoicing.budget_file_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE invoicing.budget_file_id_seq OWNER TO postgres;

--
-- TOC entry 3980 (class 0 OID 0)
-- Dependencies: 273
-- Name: budget_file_id_seq; Type: SEQUENCE OWNED BY; Schema: invoicing; Owner: postgres
--

ALTER SEQUENCE invoicing.budget_file_id_seq OWNED BY invoicing.budget_file.id;


--
-- TOC entry 274 (class 1259 OID 16599)
-- Name: budget_id_seq; Type: SEQUENCE; Schema: invoicing; Owner: postgres
--

CREATE SEQUENCE invoicing.budget_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE invoicing.budget_id_seq OWNER TO postgres;

--
-- TOC entry 3981 (class 0 OID 0)
-- Dependencies: 274
-- Name: budget_id_seq; Type: SEQUENCE OWNED BY; Schema: invoicing; Owner: postgres
--

ALTER SEQUENCE invoicing.budget_id_seq OWNED BY invoicing.budget.id;


--
-- TOC entry 275 (class 1259 OID 16600)
-- Name: document_line_template; Type: TABLE; Schema: templates; Owner: postgres
--

CREATE TABLE templates.document_line_template (
    "order" integer,
    item_code text,
    item_name text,
    base_price numeric NOT NULL,
    quantity numeric NOT NULL,
    discount numeric DEFAULT 0.00 NOT NULL,
    total_base numeric NOT NULL,
    tax_id bigint NOT NULL,
    item_id bigint,
    store_id bigint
);


ALTER TABLE templates.document_line_template OWNER TO postgres;

--
-- TOC entry 276 (class 1259 OID 16606)
-- Name: budget_line; Type: TABLE; Schema: invoicing; Owner: postgres
--

CREATE TABLE invoicing.budget_line (
    id bigint NOT NULL,
    budget_id bigint NOT NULL
)
INHERITS (public.meta, templates.document_line_template);


ALTER TABLE invoicing.budget_line OWNER TO postgres;

--
-- TOC entry 277 (class 1259 OID 16612)
-- Name: budget_line_id_seq; Type: SEQUENCE; Schema: invoicing; Owner: postgres
--

CREATE SEQUENCE invoicing.budget_line_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE invoicing.budget_line_id_seq OWNER TO postgres;

--
-- TOC entry 3982 (class 0 OID 0)
-- Dependencies: 277
-- Name: budget_line_id_seq; Type: SEQUENCE OWNED BY; Schema: invoicing; Owner: postgres
--

ALTER SEQUENCE invoicing.budget_line_id_seq OWNED BY invoicing.budget_line.id;


--
-- TOC entry 278 (class 1259 OID 16613)
-- Name: delivery_note; Type: TABLE; Schema: invoicing; Owner: postgres
--

CREATE TABLE invoicing.delivery_note (
    id bigint NOT NULL,
    invoice_id bigint
)
INHERITS (public.meta, templates.document_template);


ALTER TABLE invoicing.delivery_note OWNER TO postgres;

--
-- TOC entry 279 (class 1259 OID 16618)
-- Name: delivery_note_file; Type: TABLE; Schema: invoicing; Owner: postgres
--

CREATE TABLE invoicing.delivery_note_file (
    id bigint NOT NULL,
    delivery_note_id bigint,
    file_id bigint
)
INHERITS (public.meta);


ALTER TABLE invoicing.delivery_note_file OWNER TO postgres;

--
-- TOC entry 280 (class 1259 OID 16623)
-- Name: delivery_note_file_id_seq; Type: SEQUENCE; Schema: invoicing; Owner: postgres
--

CREATE SEQUENCE invoicing.delivery_note_file_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE invoicing.delivery_note_file_id_seq OWNER TO postgres;

--
-- TOC entry 3983 (class 0 OID 0)
-- Dependencies: 280
-- Name: delivery_note_file_id_seq; Type: SEQUENCE OWNED BY; Schema: invoicing; Owner: postgres
--

ALTER SEQUENCE invoicing.delivery_note_file_id_seq OWNED BY invoicing.delivery_note_file.id;


--
-- TOC entry 281 (class 1259 OID 16624)
-- Name: delivery_note_id_seq; Type: SEQUENCE; Schema: invoicing; Owner: postgres
--

CREATE SEQUENCE invoicing.delivery_note_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE invoicing.delivery_note_id_seq OWNER TO postgres;

--
-- TOC entry 3984 (class 0 OID 0)
-- Dependencies: 281
-- Name: delivery_note_id_seq; Type: SEQUENCE OWNED BY; Schema: invoicing; Owner: postgres
--

ALTER SEQUENCE invoicing.delivery_note_id_seq OWNED BY invoicing.delivery_note.id;


--
-- TOC entry 282 (class 1259 OID 16625)
-- Name: delivery_note_line; Type: TABLE; Schema: invoicing; Owner: postgres
--

CREATE TABLE invoicing.delivery_note_line (
    id bigint NOT NULL,
    delivery_note_id bigint,
    stock_line_id bigint
)
INHERITS (public.meta);


ALTER TABLE invoicing.delivery_note_line OWNER TO postgres;

--
-- TOC entry 283 (class 1259 OID 16630)
-- Name: delivery_note_line_id_seq; Type: SEQUENCE; Schema: invoicing; Owner: postgres
--

CREATE SEQUENCE invoicing.delivery_note_line_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE invoicing.delivery_note_line_id_seq OWNER TO postgres;

--
-- TOC entry 3985 (class 0 OID 0)
-- Dependencies: 283
-- Name: delivery_note_line_id_seq; Type: SEQUENCE OWNED BY; Schema: invoicing; Owner: postgres
--

ALTER SEQUENCE invoicing.delivery_note_line_id_seq OWNED BY invoicing.delivery_note_line.id;


--
-- TOC entry 284 (class 1259 OID 16631)
-- Name: invoice; Type: TABLE; Schema: invoicing; Owner: postgres
--

CREATE TABLE invoicing.invoice (
    id bigint NOT NULL,
    customer_legal_data_id bigint,
    customer_address_id bigint,
    company_legal_data_id bigint,
    company_address_id bigint
)
INHERITS (public.meta, templates.document_template);


ALTER TABLE invoicing.invoice OWNER TO postgres;

--
-- TOC entry 285 (class 1259 OID 16636)
-- Name: invoice_file; Type: TABLE; Schema: invoicing; Owner: postgres
--

CREATE TABLE invoicing.invoice_file (
    id bigint NOT NULL,
    invoice_id bigint,
    file_id bigint
)
INHERITS (public.meta);


ALTER TABLE invoicing.invoice_file OWNER TO postgres;

--
-- TOC entry 286 (class 1259 OID 16641)
-- Name: invoice_file_id_seq; Type: SEQUENCE; Schema: invoicing; Owner: postgres
--

CREATE SEQUENCE invoicing.invoice_file_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE invoicing.invoice_file_id_seq OWNER TO postgres;

--
-- TOC entry 3986 (class 0 OID 0)
-- Dependencies: 286
-- Name: invoice_file_id_seq; Type: SEQUENCE OWNED BY; Schema: invoicing; Owner: postgres
--

ALTER SEQUENCE invoicing.invoice_file_id_seq OWNED BY invoicing.invoice_file.id;


--
-- TOC entry 287 (class 1259 OID 16642)
-- Name: invoice_id_seq; Type: SEQUENCE; Schema: invoicing; Owner: postgres
--

CREATE SEQUENCE invoicing.invoice_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE invoicing.invoice_id_seq OWNER TO postgres;

--
-- TOC entry 3987 (class 0 OID 0)
-- Dependencies: 287
-- Name: invoice_id_seq; Type: SEQUENCE OWNED BY; Schema: invoicing; Owner: postgres
--

ALTER SEQUENCE invoicing.invoice_id_seq OWNED BY invoicing.invoice.id;


--
-- TOC entry 288 (class 1259 OID 16643)
-- Name: stock_line; Type: TABLE; Schema: invoicing; Owner: postgres
--

CREATE TABLE invoicing.stock_line (
    id bigint NOT NULL
)
INHERITS (public.meta, templates.document_line_template);


ALTER TABLE invoicing.stock_line OWNER TO postgres;

--
-- TOC entry 289 (class 1259 OID 16649)
-- Name: stock_line_id_seq; Type: SEQUENCE; Schema: invoicing; Owner: postgres
--

CREATE SEQUENCE invoicing.stock_line_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE invoicing.stock_line_id_seq OWNER TO postgres;

--
-- TOC entry 3988 (class 0 OID 0)
-- Dependencies: 289
-- Name: stock_line_id_seq; Type: SEQUENCE OWNED BY; Schema: invoicing; Owner: postgres
--

ALTER SEQUENCE invoicing.stock_line_id_seq OWNED BY invoicing.stock_line.id;


--
-- TOC entry 290 (class 1259 OID 16650)
-- Name: ticket; Type: TABLE; Schema: invoicing; Owner: postgres
--

CREATE TABLE invoicing.ticket (
    id bigint NOT NULL,
    customer_legal_data_id bigint,
    customer_address_id bigint,
    company_legal_data_id bigint,
    company_address_id bigint
)
INHERITS (public.meta, templates.document_template);

ALTER TABLE invoicing.ticket ALTER COLUMN customer_id DROP NOT NULL;


ALTER TABLE invoicing.ticket OWNER TO postgres;

--
-- TOC entry 291 (class 1259 OID 16655)
-- Name: ticket_file; Type: TABLE; Schema: invoicing; Owner: postgres
--

CREATE TABLE invoicing.ticket_file (
    id bigint NOT NULL,
    ticket_id bigint,
    file_id bigint
)
INHERITS (public.meta);


ALTER TABLE invoicing.ticket_file OWNER TO postgres;

--
-- TOC entry 292 (class 1259 OID 16660)
-- Name: ticket_file_id_seq; Type: SEQUENCE; Schema: invoicing; Owner: postgres
--

CREATE SEQUENCE invoicing.ticket_file_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE invoicing.ticket_file_id_seq OWNER TO postgres;

--
-- TOC entry 3989 (class 0 OID 0)
-- Dependencies: 292
-- Name: ticket_file_id_seq; Type: SEQUENCE OWNED BY; Schema: invoicing; Owner: postgres
--

ALTER SEQUENCE invoicing.ticket_file_id_seq OWNED BY invoicing.ticket_file.id;


--
-- TOC entry 293 (class 1259 OID 16661)
-- Name: ticket_id_seq; Type: SEQUENCE; Schema: invoicing; Owner: postgres
--

CREATE SEQUENCE invoicing.ticket_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE invoicing.ticket_id_seq OWNER TO postgres;

--
-- TOC entry 3990 (class 0 OID 0)
-- Dependencies: 293
-- Name: ticket_id_seq; Type: SEQUENCE OWNED BY; Schema: invoicing; Owner: postgres
--

ALTER SEQUENCE invoicing.ticket_id_seq OWNED BY invoicing.ticket.id;


--
-- TOC entry 294 (class 1259 OID 16662)
-- Name: ticket_line; Type: TABLE; Schema: invoicing; Owner: postgres
--

CREATE TABLE invoicing.ticket_line (
    id bigint NOT NULL,
    ticket_id bigint,
    stock_line_id bigint
)
INHERITS (public.meta);


ALTER TABLE invoicing.ticket_line OWNER TO postgres;

--
-- TOC entry 295 (class 1259 OID 16667)
-- Name: ticket_line_id_seq; Type: SEQUENCE; Schema: invoicing; Owner: postgres
--

CREATE SEQUENCE invoicing.ticket_line_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE invoicing.ticket_line_id_seq OWNER TO postgres;

--
-- TOC entry 3991 (class 0 OID 0)
-- Dependencies: 295
-- Name: ticket_line_id_seq; Type: SEQUENCE OWNED BY; Schema: invoicing; Owner: postgres
--

ALTER SEQUENCE invoicing.ticket_line_id_seq OWNED BY invoicing.ticket_line.id;


--
-- TOC entry 296 (class 1259 OID 16668)
-- Name: category; Type: TABLE; Schema: items; Owner: postgres
--

CREATE TABLE items.category (
    id bigint NOT NULL,
    name text NOT NULL
)
INHERITS (public.meta);


ALTER TABLE items.category OWNER TO postgres;

--
-- TOC entry 297 (class 1259 OID 16673)
-- Name: category_id_seq; Type: SEQUENCE; Schema: items; Owner: postgres
--

CREATE SEQUENCE items.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE items.category_id_seq OWNER TO postgres;

--
-- TOC entry 3992 (class 0 OID 0)
-- Dependencies: 297
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: items; Owner: postgres
--

ALTER SEQUENCE items.category_id_seq OWNED BY items.category.id;


--
-- TOC entry 298 (class 1259 OID 16674)
-- Name: item; Type: TABLE; Schema: items; Owner: postgres
--

CREATE TABLE items.item (
    id bigint NOT NULL,
    code integer NOT NULL,
    name text NOT NULL,
    description text,
    base_price numeric DEFAULT 0.00 NOT NULL,
    is_enabled boolean DEFAULT true NOT NULL,
    tax_id bigint,
    category_id bigint,
    photo_id bigint
)
INHERITS (public.meta);


ALTER TABLE items.item OWNER TO postgres;

--
-- TOC entry 299 (class 1259 OID 16681)
-- Name: item_file; Type: TABLE; Schema: items; Owner: postgres
--

CREATE TABLE items.item_file (
    id bigint NOT NULL,
    item_id bigint,
    file_id bigint
)
INHERITS (public.meta);


ALTER TABLE items.item_file OWNER TO postgres;

--
-- TOC entry 300 (class 1259 OID 16686)
-- Name: item_file_id_seq; Type: SEQUENCE; Schema: items; Owner: postgres
--

CREATE SEQUENCE items.item_file_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE items.item_file_id_seq OWNER TO postgres;

--
-- TOC entry 3993 (class 0 OID 0)
-- Dependencies: 300
-- Name: item_file_id_seq; Type: SEQUENCE OWNED BY; Schema: items; Owner: postgres
--

ALTER SEQUENCE items.item_file_id_seq OWNED BY items.item_file.id;


--
-- TOC entry 301 (class 1259 OID 16687)
-- Name: item_id_seq; Type: SEQUENCE; Schema: items; Owner: postgres
--

CREATE SEQUENCE items.item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE items.item_id_seq OWNER TO postgres;

--
-- TOC entry 3994 (class 0 OID 0)
-- Dependencies: 301
-- Name: item_id_seq; Type: SEQUENCE OWNED BY; Schema: items; Owner: postgres
--

ALTER SEQUENCE items.item_id_seq OWNED BY items.item.id;


--
-- TOC entry 302 (class 1259 OID 16688)
-- Name: stock; Type: TABLE; Schema: items; Owner: postgres
--

CREATE TABLE items.stock (
    id bigint NOT NULL,
    quantity numeric DEFAULT 0.00 NOT NULL,
    item_id bigint,
    store_id bigint
)
INHERITS (public.meta);


ALTER TABLE items.stock OWNER TO postgres;

--
-- TOC entry 303 (class 1259 OID 16694)
-- Name: stock_count; Type: TABLE; Schema: items; Owner: postgres
--

CREATE TABLE items.stock_count (
    id bigint NOT NULL,
    date timestamp with time zone DEFAULT now() NOT NULL,
    file_id bigint
)
INHERITS (public.meta);


ALTER TABLE items.stock_count OWNER TO postgres;

--
-- TOC entry 304 (class 1259 OID 16700)
-- Name: stock_count_id_seq; Type: SEQUENCE; Schema: items; Owner: postgres
--

CREATE SEQUENCE items.stock_count_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE items.stock_count_id_seq OWNER TO postgres;

--
-- TOC entry 3995 (class 0 OID 0)
-- Dependencies: 304
-- Name: stock_count_id_seq; Type: SEQUENCE OWNED BY; Schema: items; Owner: postgres
--

ALTER SEQUENCE items.stock_count_id_seq OWNED BY items.stock_count.id;


--
-- TOC entry 305 (class 1259 OID 16701)
-- Name: stock_id_seq; Type: SEQUENCE; Schema: items; Owner: postgres
--

CREATE SEQUENCE items.stock_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE items.stock_id_seq OWNER TO postgres;

--
-- TOC entry 3996 (class 0 OID 0)
-- Dependencies: 305
-- Name: stock_id_seq; Type: SEQUENCE OWNED BY; Schema: items; Owner: postgres
--

ALTER SEQUENCE items.stock_id_seq OWNED BY items.stock.id;


--
-- TOC entry 306 (class 1259 OID 16702)
-- Name: stock_log; Type: TABLE; Schema: items; Owner: postgres
--

CREATE TABLE items.stock_log (
    id bigint NOT NULL,
    date timestamp with time zone DEFAULT now() NOT NULL,
    type text NOT NULL,
    document_name text,
    document_operation text,
    customer_name text,
    description text,
    quantity numeric DEFAULT 0.00 NOT NULL,
    previous_stock numeric DEFAULT 0.00 NOT NULL,
    item_id bigint NOT NULL,
    store_id bigint NOT NULL,
    aux_store_id bigint,
    stock_line_id bigint,
    store_transfer_line_id bigint,
    stock_count_id bigint,
    CONSTRAINT stock_log_type_check CHECK ((type = ANY (ARRAY['Delivery note'::text, 'Count'::text, 'Transfer'::text, 'Ticket'::text])))
)
INHERITS (public.meta);


ALTER TABLE items.stock_log OWNER TO postgres;

--
-- TOC entry 307 (class 1259 OID 16711)
-- Name: stock_log_id_seq; Type: SEQUENCE; Schema: items; Owner: postgres
--

CREATE SEQUENCE items.stock_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE items.stock_log_id_seq OWNER TO postgres;

--
-- TOC entry 3997 (class 0 OID 0)
-- Dependencies: 307
-- Name: stock_log_id_seq; Type: SEQUENCE OWNED BY; Schema: items; Owner: postgres
--

ALTER SEQUENCE items.stock_log_id_seq OWNED BY items.stock_log.id;


--
-- TOC entry 308 (class 1259 OID 16712)
-- Name: store; Type: TABLE; Schema: items; Owner: postgres
--

CREATE TABLE items.store (
    id bigint NOT NULL,
    name text NOT NULL,
    is_default boolean DEFAULT false NOT NULL
)
INHERITS (public.meta);


ALTER TABLE items.store OWNER TO postgres;

--
-- TOC entry 309 (class 1259 OID 16718)
-- Name: store_id_seq; Type: SEQUENCE; Schema: items; Owner: postgres
--

CREATE SEQUENCE items.store_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE items.store_id_seq OWNER TO postgres;

--
-- TOC entry 3998 (class 0 OID 0)
-- Dependencies: 309
-- Name: store_id_seq; Type: SEQUENCE OWNED BY; Schema: items; Owner: postgres
--

ALTER SEQUENCE items.store_id_seq OWNED BY items.store.id;


--
-- TOC entry 310 (class 1259 OID 16719)
-- Name: store_transfer; Type: TABLE; Schema: items; Owner: postgres
--

CREATE TABLE items.store_transfer (
    id bigint NOT NULL,
    date timestamp with time zone DEFAULT now() NOT NULL,
    source_store_id bigint NOT NULL,
    target_store_id bigint NOT NULL
)
INHERITS (public.meta);


ALTER TABLE items.store_transfer OWNER TO postgres;

--
-- TOC entry 311 (class 1259 OID 16725)
-- Name: store_transfer_id_seq; Type: SEQUENCE; Schema: items; Owner: postgres
--

CREATE SEQUENCE items.store_transfer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE items.store_transfer_id_seq OWNER TO postgres;

--
-- TOC entry 3999 (class 0 OID 0)
-- Dependencies: 311
-- Name: store_transfer_id_seq; Type: SEQUENCE OWNED BY; Schema: items; Owner: postgres
--

ALTER SEQUENCE items.store_transfer_id_seq OWNED BY items.store_transfer.id;


--
-- TOC entry 312 (class 1259 OID 16726)
-- Name: store_transfer_line; Type: TABLE; Schema: items; Owner: postgres
--

CREATE TABLE items.store_transfer_line (
    id bigint NOT NULL,
    quantity numeric NOT NULL,
    item_id bigint,
    store_transfer_id bigint
)
INHERITS (public.meta);


ALTER TABLE items.store_transfer_line OWNER TO postgres;

--
-- TOC entry 313 (class 1259 OID 16731)
-- Name: store_transfer_line_id_seq; Type: SEQUENCE; Schema: items; Owner: postgres
--

CREATE SEQUENCE items.store_transfer_line_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE items.store_transfer_line_id_seq OWNER TO postgres;

--
-- TOC entry 4000 (class 0 OID 0)
-- Dependencies: 313
-- Name: store_transfer_line_id_seq; Type: SEQUENCE OWNED BY; Schema: items; Owner: postgres
--

ALTER SEQUENCE items.store_transfer_line_id_seq OWNED BY items.store_transfer_line.id;


--
-- TOC entry 314 (class 1259 OID 16732)
-- Name: aoc_user; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.aoc_user (
    id bigint NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    pass text NOT NULL,
    full_name text
)
INHERITS (public.meta);


ALTER TABLE users.aoc_user OWNER TO postgres;

--
-- TOC entry 315 (class 1259 OID 16737)
-- Name: aoc_user_id_seq; Type: SEQUENCE; Schema: users; Owner: postgres
--

CREATE SEQUENCE users.aoc_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE users.aoc_user_id_seq OWNER TO postgres;

--
-- TOC entry 4001 (class 0 OID 0)
-- Dependencies: 315
-- Name: aoc_user_id_seq; Type: SEQUENCE OWNED BY; Schema: users; Owner: postgres
--

ALTER SEQUENCE users.aoc_user_id_seq OWNED BY users.aoc_user.id;


--
-- TOC entry 3479 (class 2604 OID 16738)
-- Name: invoice_payment id; Type: DEFAULT; Schema: accounting; Owner: postgres
--

ALTER TABLE ONLY accounting.invoice_payment ALTER COLUMN id SET DEFAULT nextval('accounting.invoice_payment_id_seq'::regclass);


--
-- TOC entry 3480 (class 2604 OID 16739)
-- Name: payment id; Type: DEFAULT; Schema: accounting; Owner: postgres
--

ALTER TABLE ONLY accounting.payment ALTER COLUMN id SET DEFAULT nextval('accounting.payment_id_seq'::regclass);


--
-- TOC entry 3482 (class 2604 OID 16740)
-- Name: ticket_payment id; Type: DEFAULT; Schema: accounting; Owner: postgres
--

ALTER TABLE ONLY accounting.ticket_payment ALTER COLUMN id SET DEFAULT nextval('accounting.ticket_payment_id_seq'::regclass);


--
-- TOC entry 3483 (class 2604 OID 16741)
-- Name: address id; Type: DEFAULT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.address ALTER COLUMN id SET DEFAULT nextval('common.address_id_seq'::regclass);


--
-- TOC entry 3484 (class 2604 OID 16742)
-- Name: country id; Type: DEFAULT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.country ALTER COLUMN id SET DEFAULT nextval('common.country_id_seq'::regclass);


--
-- TOC entry 3486 (class 2604 OID 16743)
-- Name: fiscal_year id; Type: DEFAULT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.fiscal_year ALTER COLUMN id SET DEFAULT nextval('common.fiscal_year_id_seq'::regclass);


--
-- TOC entry 3488 (class 2604 OID 16744)
-- Name: gender id; Type: DEFAULT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.gender ALTER COLUMN id SET DEFAULT nextval('common.gender_id_seq'::regclass);


--
-- TOC entry 3490 (class 2604 OID 16745)
-- Name: identity_document_type id; Type: DEFAULT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.identity_document_type ALTER COLUMN id SET DEFAULT nextval('common.identity_document_type_id_seq'::regclass);


--
-- TOC entry 3492 (class 2604 OID 16746)
-- Name: language id; Type: DEFAULT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.language ALTER COLUMN id SET DEFAULT nextval('common.language_id_seq'::regclass);


--
-- TOC entry 3494 (class 2604 OID 16747)
-- Name: legal_data id; Type: DEFAULT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.legal_data ALTER COLUMN id SET DEFAULT nextval('common.legal_data_id_seq'::regclass);


--
-- TOC entry 3495 (class 2604 OID 16748)
-- Name: payment_system id; Type: DEFAULT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.payment_system ALTER COLUMN id SET DEFAULT nextval('common.payment_system_id_seq'::regclass);


--
-- TOC entry 3497 (class 2604 OID 16749)
-- Name: series id; Type: DEFAULT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.series ALTER COLUMN id SET DEFAULT nextval('common.series_id_seq'::regclass);


--
-- TOC entry 3499 (class 2604 OID 16750)
-- Name: street_suffix id; Type: DEFAULT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.street_suffix ALTER COLUMN id SET DEFAULT nextval('common.street_suffix_id_seq'::regclass);


--
-- TOC entry 3501 (class 2604 OID 16751)
-- Name: tax id; Type: DEFAULT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.tax ALTER COLUMN id SET DEFAULT nextval('common.tax_id_seq'::regclass);


--
-- TOC entry 3503 (class 2604 OID 16752)
-- Name: company id; Type: DEFAULT; Schema: configuration; Owner: postgres
--

ALTER TABLE ONLY configuration.company ALTER COLUMN id SET DEFAULT nextval('configuration.company_id_seq'::regclass);


--
-- TOC entry 3504 (class 2604 OID 16753)
-- Name: contact id; Type: DEFAULT; Schema: contacts; Owner: postgres
--

ALTER TABLE ONLY contacts.contact ALTER COLUMN id SET DEFAULT nextval('contacts.contact_id_seq'::regclass);


--
-- TOC entry 3505 (class 2604 OID 16754)
-- Name: customer id; Type: DEFAULT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.customer ALTER COLUMN id SET DEFAULT nextval('customers.customer_id_seq'::regclass);


--
-- TOC entry 3506 (class 2604 OID 16755)
-- Name: customer_contact id; Type: DEFAULT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.customer_contact ALTER COLUMN id SET DEFAULT nextval('customers.customer_contact_id_seq'::regclass);


--
-- TOC entry 3507 (class 2604 OID 16756)
-- Name: customer_file id; Type: DEFAULT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.customer_file ALTER COLUMN id SET DEFAULT nextval('customers.customer_file_id_seq'::regclass);


--
-- TOC entry 3508 (class 2604 OID 16757)
-- Name: file id; Type: DEFAULT; Schema: files; Owner: postgres
--

ALTER TABLE ONLY files.file ALTER COLUMN id SET DEFAULT nextval('files.file_id_seq'::regclass);


--
-- TOC entry 3509 (class 2604 OID 16758)
-- Name: budget id; Type: DEFAULT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.budget ALTER COLUMN id SET DEFAULT nextval('invoicing.budget_id_seq'::regclass);


--
-- TOC entry 3510 (class 2604 OID 16759)
-- Name: budget_file id; Type: DEFAULT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.budget_file ALTER COLUMN id SET DEFAULT nextval('invoicing.budget_file_id_seq'::regclass);


--
-- TOC entry 3512 (class 2604 OID 16760)
-- Name: budget_line discount; Type: DEFAULT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.budget_line ALTER COLUMN discount SET DEFAULT 0.00;


--
-- TOC entry 3513 (class 2604 OID 16761)
-- Name: budget_line id; Type: DEFAULT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.budget_line ALTER COLUMN id SET DEFAULT nextval('invoicing.budget_line_id_seq'::regclass);


--
-- TOC entry 3514 (class 2604 OID 16762)
-- Name: delivery_note id; Type: DEFAULT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.delivery_note ALTER COLUMN id SET DEFAULT nextval('invoicing.delivery_note_id_seq'::regclass);


--
-- TOC entry 3515 (class 2604 OID 16763)
-- Name: delivery_note_file id; Type: DEFAULT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.delivery_note_file ALTER COLUMN id SET DEFAULT nextval('invoicing.delivery_note_file_id_seq'::regclass);


--
-- TOC entry 3516 (class 2604 OID 16764)
-- Name: delivery_note_line id; Type: DEFAULT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.delivery_note_line ALTER COLUMN id SET DEFAULT nextval('invoicing.delivery_note_line_id_seq'::regclass);


--
-- TOC entry 3517 (class 2604 OID 16765)
-- Name: invoice id; Type: DEFAULT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.invoice ALTER COLUMN id SET DEFAULT nextval('invoicing.invoice_id_seq'::regclass);


--
-- TOC entry 3518 (class 2604 OID 16766)
-- Name: invoice_file id; Type: DEFAULT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.invoice_file ALTER COLUMN id SET DEFAULT nextval('invoicing.invoice_file_id_seq'::regclass);


--
-- TOC entry 3519 (class 2604 OID 16767)
-- Name: stock_line discount; Type: DEFAULT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.stock_line ALTER COLUMN discount SET DEFAULT 0.00;


--
-- TOC entry 3520 (class 2604 OID 16768)
-- Name: stock_line id; Type: DEFAULT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.stock_line ALTER COLUMN id SET DEFAULT nextval('invoicing.stock_line_id_seq'::regclass);


--
-- TOC entry 3521 (class 2604 OID 16769)
-- Name: ticket id; Type: DEFAULT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.ticket ALTER COLUMN id SET DEFAULT nextval('invoicing.ticket_id_seq'::regclass);


--
-- TOC entry 3522 (class 2604 OID 16770)
-- Name: ticket_file id; Type: DEFAULT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.ticket_file ALTER COLUMN id SET DEFAULT nextval('invoicing.ticket_file_id_seq'::regclass);


--
-- TOC entry 3523 (class 2604 OID 16771)
-- Name: ticket_line id; Type: DEFAULT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.ticket_line ALTER COLUMN id SET DEFAULT nextval('invoicing.ticket_line_id_seq'::regclass);


--
-- TOC entry 3524 (class 2604 OID 16772)
-- Name: category id; Type: DEFAULT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.category ALTER COLUMN id SET DEFAULT nextval('items.category_id_seq'::regclass);


--
-- TOC entry 3525 (class 2604 OID 16773)
-- Name: item id; Type: DEFAULT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.item ALTER COLUMN id SET DEFAULT nextval('items.item_id_seq'::regclass);


--
-- TOC entry 3528 (class 2604 OID 16774)
-- Name: item_file id; Type: DEFAULT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.item_file ALTER COLUMN id SET DEFAULT nextval('items.item_file_id_seq'::regclass);


--
-- TOC entry 3529 (class 2604 OID 16775)
-- Name: stock id; Type: DEFAULT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.stock ALTER COLUMN id SET DEFAULT nextval('items.stock_id_seq'::regclass);


--
-- TOC entry 3531 (class 2604 OID 16776)
-- Name: stock_count id; Type: DEFAULT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.stock_count ALTER COLUMN id SET DEFAULT nextval('items.stock_count_id_seq'::regclass);


--
-- TOC entry 3533 (class 2604 OID 16777)
-- Name: stock_log id; Type: DEFAULT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.stock_log ALTER COLUMN id SET DEFAULT nextval('items.stock_log_id_seq'::regclass);


--
-- TOC entry 3537 (class 2604 OID 16778)
-- Name: store id; Type: DEFAULT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.store ALTER COLUMN id SET DEFAULT nextval('items.store_id_seq'::regclass);


--
-- TOC entry 3539 (class 2604 OID 16779)
-- Name: store_transfer id; Type: DEFAULT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.store_transfer ALTER COLUMN id SET DEFAULT nextval('items.store_transfer_id_seq'::regclass);


--
-- TOC entry 3541 (class 2604 OID 16780)
-- Name: store_transfer_line id; Type: DEFAULT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.store_transfer_line ALTER COLUMN id SET DEFAULT nextval('items.store_transfer_line_id_seq'::regclass);


--
-- TOC entry 3542 (class 2604 OID 16781)
-- Name: aoc_user id; Type: DEFAULT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.aoc_user ALTER COLUMN id SET DEFAULT nextval('users.aoc_user_id_seq'::regclass);


--
-- TOC entry 3864 (class 0 OID 16437)
-- Dependencies: 227
-- Data for Name: invoice_payment; Type: TABLE DATA; Schema: accounting; Owner: postgres
--

COPY accounting.invoice_payment (creation_user, creation_time, modification_user, modification_time, id, invoice_id, payment_id) FROM stdin;
\N	\N	\N	\N	1	1	1
\N	\N	\N	\N	2	2	2
\.


--
-- TOC entry 3866 (class 0 OID 16443)
-- Dependencies: 229
-- Data for Name: payment; Type: TABLE DATA; Schema: accounting; Owner: postgres
--

COPY accounting.payment (creation_user, creation_time, modification_user, modification_time, id, date, quantity, payment_system_id) FROM stdin;
dev@mail.to	1723022464117	\N	\N	1	2024-08-07 09:20:57.078+00	150	1
dev@mail.to	1723022518875	\N	\N	2	2024-08-07 09:21:53.596+00	1875.47	3
\.


--
-- TOC entry 3868 (class 0 OID 16450)
-- Dependencies: 231
-- Data for Name: ticket_payment; Type: TABLE DATA; Schema: accounting; Owner: postgres
--

COPY accounting.ticket_payment (creation_user, creation_time, modification_user, modification_time, id, ticket_id, payment_id) FROM stdin;
\.


--
-- TOC entry 3871 (class 0 OID 16461)
-- Dependencies: 234
-- Data for Name: address; Type: TABLE DATA; Schema: common; Owner: postgres
--

COPY common.address (creation_user, creation_time, modification_user, modification_time, zip_code, state, city, area, street_name, street_number, floor, door, block, coordinates, additional_data, street_suffix_id, country_id, id) FROM stdin;
dev@mail.to	1723022230026	\N	\N	\N	\N	\N	\N	AOC	3	\N	\N	\N	\N	\N	175	44	3
dev@mail.to	1723022230026	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	175	44	4
dev@mail.to	1723022542872	\N	\N	\N	\N	\N	\N	AOC	3	\N	\N	\N	\N	\N	175	44	5
dev@mail.to	1723022542872	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	175	44	6
\.


--
-- TOC entry 3873 (class 0 OID 16467)
-- Dependencies: 236
-- Data for Name: country; Type: TABLE DATA; Schema: common; Owner: postgres
--

COPY common.country (creation_user, creation_time, modification_user, modification_time, id, name, is_default, iso_code2, iso_code3) FROM stdin;
\N	\N	\N	\N	1	Albania	f	AL	ALB
\N	\N	\N	\N	2	Andorra	f	AD	AND
\N	\N	\N	\N	3	Austria	f	AT	AUT
\N	\N	\N	\N	4	Belarus	f	BY	BLR
\N	\N	\N	\N	5	Belgium	f	BE	BEL
\N	\N	\N	\N	6	Bulgaria	f	BG	BGR
\N	\N	\N	\N	7	Croatia	f	HR	HRV
\N	\N	\N	\N	8	Cyprus	f	CY	CYP
\N	\N	\N	\N	9	Czech Republic	f	CZ	CZE
\N	\N	\N	\N	10	Denmark	f	DK	DNK
\N	\N	\N	\N	11	Estonia	f	EE	EST
\N	\N	\N	\N	12	Finland	f	FI	FIN
\N	\N	\N	\N	13	France	f	FR	FRA
\N	\N	\N	\N	14	Germany	f	DE	DEU
\N	\N	\N	\N	15	Greece	f	GR	GRC
\N	\N	\N	\N	16	Hungary	f	HU	HUN
\N	\N	\N	\N	17	Iceland	f	IS	ISL
\N	\N	\N	\N	18	Ireland	f	IE	IRL
\N	\N	\N	\N	19	Italy	f	IT	ITA
\N	\N	\N	\N	20	Latvia	f	LV	LVA
\N	\N	\N	\N	21	Liechtenstein	f	LI	LIE
\N	\N	\N	\N	22	Lithuania	f	LT	LTU
\N	\N	\N	\N	23	Luxembourg	f	LU	LUX
\N	\N	\N	\N	24	Malta	f	MT	MLT
\N	\N	\N	\N	25	Moldova	f	MD	MDA
\N	\N	\N	\N	26	Monaco	f	MC	MCO
\N	\N	\N	\N	27	Montenegro	f	ME	MNE
\N	\N	\N	\N	28	Netherlands	f	NL	NLD
\N	\N	\N	\N	29	North Macedonia	f	MK	MKD
\N	\N	\N	\N	30	Norway	f	NO	NOR
\N	\N	\N	\N	31	Poland	f	PL	POL
\N	\N	\N	\N	32	Portugal	f	PT	PRT
\N	\N	\N	\N	33	Romania	f	RO	ROU
\N	\N	\N	\N	34	Russia	f	RU	RUS
\N	\N	\N	\N	35	San Marino	f	SM	SMR
\N	\N	\N	\N	36	Serbia	f	RS	SRB
\N	\N	\N	\N	37	Slovakia	f	SK	SVK
\N	\N	\N	\N	38	Slovenia	f	SI	SVN
\N	\N	\N	\N	39	Spain	f	ES	ESP
\N	\N	\N	\N	40	Sweden	f	SE	SWE
\N	\N	\N	\N	41	Switzerland	f	CH	CHE
\N	\N	\N	\N	42	Ukraine	f	UA	UKR
\N	\N	\N	\N	43	United Kingdom	f	GB	GBR
\N	\N	\N	\N	44	United States	t	US	USA
\N	\N	\N	\N	45	Canada	f	CA	CAN
\.


--
-- TOC entry 3875 (class 0 OID 16474)
-- Dependencies: 238
-- Data for Name: fiscal_year; Type: TABLE DATA; Schema: common; Owner: postgres
--

COPY common.fiscal_year (creation_user, creation_time, modification_user, modification_time, id, year, is_current) FROM stdin;
\N	\N	\N	\N	1	2024	t
\.


--
-- TOC entry 3877 (class 0 OID 16481)
-- Dependencies: 240
-- Data for Name: gender; Type: TABLE DATA; Schema: common; Owner: postgres
--

COPY common.gender (creation_user, creation_time, modification_user, modification_time, id, name, is_default) FROM stdin;
\N	\N	\N	\N	1	Male	f
\N	\N	\N	\N	2	Female	f
\N	\N	\N	\N	3	Neuter	t
\.


--
-- TOC entry 3879 (class 0 OID 16488)
-- Dependencies: 242
-- Data for Name: identity_document_type; Type: TABLE DATA; Schema: common; Owner: postgres
--

COPY common.identity_document_type (creation_user, creation_time, modification_user, modification_time, id, name, is_default) FROM stdin;
\N	\N	\N	\N	1	Passport	t
\N	\N	\N	\N	2	Driver's License	f
\N	\N	\N	\N	3	Social Security Card	f
\N	\N	\N	\N	4	Birth Certificate	f
\N	\N	\N	\N	5	Marriage Certificate	f
\N	\N	\N	\N	6	Green Card	f
\N	\N	\N	\N	7	Naturalization Certificate	f
\N	\N	\N	\N	8	Visa	f
\N	\N	\N	\N	9	State ID Card	f
\N	\N	\N	\N	10	Vehicle Registration	f
\N	\N	\N	\N	11	Concealed Carry Permit	f
\N	\N	\N	\N	12	Professional License	f
\N	\N	\N	\N	13	Academic Transcript	f
\N	\N	\N	\N	14	Financial Document	f
\.


--
-- TOC entry 3881 (class 0 OID 16495)
-- Dependencies: 244
-- Data for Name: language; Type: TABLE DATA; Schema: common; Owner: postgres
--

COPY common.language (creation_user, creation_time, modification_user, modification_time, id, name, iso_code2, iso_code3, is_default) FROM stdin;
\N	\N	\N	\N	1	Mandarin Chinese	zh	zho	f
\N	\N	\N	\N	2	Spanish	es	spa	f
\N	\N	\N	\N	3	English	en	eng	t
\N	\N	\N	\N	4	Hindi	hi	hin	f
\N	\N	\N	\N	5	Arabic	ar	ara	f
\N	\N	\N	\N	6	Bengali	bn	ben	f
\N	\N	\N	\N	7	Portuguese	pt	por	f
\N	\N	\N	\N	8	Russian	ru	rus	f
\N	\N	\N	\N	9	Japanese	ja	jpn	f
\N	\N	\N	\N	10	Punjabi	pa	pan	f
\.


--
-- TOC entry 3884 (class 0 OID 16507)
-- Dependencies: 247
-- Data for Name: legal_data; Type: TABLE DATA; Schema: common; Owner: postgres
--

COPY common.legal_data (creation_user, creation_time, modification_user, modification_time, legal_name, document_number, identity_document_type_id, id) FROM stdin;
dev@mail.to	1723022230026	\N	\N	AOC INC.	12345678	1	3
dev@mail.to	1723022230026	\N	\N	\N	\N	1	4
dev@mail.to	1723022542872	\N	\N	AOC INC.	12345678	1	5
dev@mail.to	1723022542872	\N	\N	\N	\N	1	6
\.


--
-- TOC entry 3886 (class 0 OID 16513)
-- Dependencies: 249
-- Data for Name: payment_system; Type: TABLE DATA; Schema: common; Owner: postgres
--

COPY common.payment_system (creation_user, creation_time, modification_user, modification_time, id, name, is_default) FROM stdin;
\N	\N	\N	\N	1	Credit Card	t
\N	\N	\N	\N	2	PayPal	f
\N	\N	\N	\N	3	Bank Transfer	f
\N	\N	\N	\N	4	Cash	f
\N	\N	\N	\N	5	Debit Card	f
\.


--
-- TOC entry 3888 (class 0 OID 16520)
-- Dependencies: 251
-- Data for Name: series; Type: TABLE DATA; Schema: common; Owner: postgres
--

COPY common.series (creation_user, creation_time, modification_user, modification_time, id, name, type, is_default) FROM stdin;
\N	\N	\N	\N	1	I	Invoice	t
\N	\N	\N	\N	2	DN	Delivery note	t
\N	\N	\N	\N	3	B	Budget	t
\N	\N	\N	\N	4	T	Ticket	t
\.


--
-- TOC entry 3890 (class 0 OID 16528)
-- Dependencies: 253
-- Data for Name: street_suffix; Type: TABLE DATA; Schema: common; Owner: postgres
--

COPY common.street_suffix (creation_user, creation_time, modification_user, modification_time, id, name, abbrv, is_default) FROM stdin;
\N	\N	\N	\N	1	Alley	Aly	f
\N	\N	\N	\N	2	Annex	Anx	f
\N	\N	\N	\N	3	Arcade	Arc	f
\N	\N	\N	\N	4	Avenue	Av	f
\N	\N	\N	\N	5	Bayou	Byu	f
\N	\N	\N	\N	6	Beach	Bch	f
\N	\N	\N	\N	7	Bend	Bnd	f
\N	\N	\N	\N	8	Bluff	Blf	f
\N	\N	\N	\N	9	Bluffs	Blfs	f
\N	\N	\N	\N	10	Bottom	Btm	f
\N	\N	\N	\N	11	Boulevard	Blvd	f
\N	\N	\N	\N	12	Branch	Br	f
\N	\N	\N	\N	13	Bridge	Brg	f
\N	\N	\N	\N	14	Brook	Brk	f
\N	\N	\N	\N	15	Brooks	Brks	f
\N	\N	\N	\N	16	Burg	Bg	f
\N	\N	\N	\N	17	Burgs	Bgs	f
\N	\N	\N	\N	18	Bypass	Byp	f
\N	\N	\N	\N	19	Camp	Cp	f
\N	\N	\N	\N	20	Canyon	Cnyn	f
\N	\N	\N	\N	21	Cape	Cpe	f
\N	\N	\N	\N	22	Causeway	Cswy	f
\N	\N	\N	\N	23	Center	Cen	f
\N	\N	\N	\N	24	Centers	Ctrs	f
\N	\N	\N	\N	25	Circle	Cir	f
\N	\N	\N	\N	26	Circles	Cirs	f
\N	\N	\N	\N	27	Cliff	Clf	f
\N	\N	\N	\N	28	Cliffs	Clfs	f
\N	\N	\N	\N	29	Club	Clb	f
\N	\N	\N	\N	30	Common	Cmn	f
\N	\N	\N	\N	31	Commons	Cmns	f
\N	\N	\N	\N	32	Corner	Cor	f
\N	\N	\N	\N	33	Corners	Cors	f
\N	\N	\N	\N	34	Course	Crse	f
\N	\N	\N	\N	35	Court	Ct	f
\N	\N	\N	\N	36	Courts	Cts	f
\N	\N	\N	\N	37	Cove	Cv	f
\N	\N	\N	\N	38	Coves	Cvs	f
\N	\N	\N	\N	39	Creek	Crk	f
\N	\N	\N	\N	40	Crescent	Cres	f
\N	\N	\N	\N	41	Crest	Crst	f
\N	\N	\N	\N	42	Crossing	Xing	f
\N	\N	\N	\N	43	Crossroad	Xrd	f
\N	\N	\N	\N	44	Curve	Curv	f
\N	\N	\N	\N	45	Dale	Dl	f
\N	\N	\N	\N	46	Dam	Dm	f
\N	\N	\N	\N	47	Divide	Div	f
\N	\N	\N	\N	48	Drive	Dr	f
\N	\N	\N	\N	49	Drives	Drs	f
\N	\N	\N	\N	50	Estate	Est	f
\N	\N	\N	\N	51	Estates	Ests	f
\N	\N	\N	\N	52	Expressway	Exp	f
\N	\N	\N	\N	53	Extension	Ext	f
\N	\N	\N	\N	54	Extensions	Exts	f
\N	\N	\N	\N	55	Fall		f
\N	\N	\N	\N	56	Falls	Fls	f
\N	\N	\N	\N	57	Ferry	Fry	f
\N	\N	\N	\N	58	Field	Fld	f
\N	\N	\N	\N	59	Fields	Flds	f
\N	\N	\N	\N	60	Flat	Flt	f
\N	\N	\N	\N	61	Flats	Flts	f
\N	\N	\N	\N	62	Ford	Frd	f
\N	\N	\N	\N	63	Fords	Frds	f
\N	\N	\N	\N	64	Forest	Frst	f
\N	\N	\N	\N	65	Forge	Frg	f
\N	\N	\N	\N	66	Forges	Frgs	f
\N	\N	\N	\N	67	Fork	Frk	f
\N	\N	\N	\N	68	Forks	Frks	f
\N	\N	\N	\N	69	Fort	Ft	f
\N	\N	\N	\N	70	Freeway	Fwy	f
\N	\N	\N	\N	71	Garden	Gdn	f
\N	\N	\N	\N	72	Gardens	Gdns	f
\N	\N	\N	\N	73	Gateway	Gtwy	f
\N	\N	\N	\N	74	Glen	Gln	f
\N	\N	\N	\N	75	Glens	Glns	f
\N	\N	\N	\N	76	Green	Grn	f
\N	\N	\N	\N	77	Greens	Grns	f
\N	\N	\N	\N	78	Grove	Grv	f
\N	\N	\N	\N	79	Groves	Grvs	f
\N	\N	\N	\N	80	Harbor	Hbr	f
\N	\N	\N	\N	81	Harbors	Hbrs	f
\N	\N	\N	\N	82	Haven	Hvn	f
\N	\N	\N	\N	83	Heights	Hts	f
\N	\N	\N	\N	84	Highway	Hwy	f
\N	\N	\N	\N	85	Hill	Hl	f
\N	\N	\N	\N	86	Hills	Hls	f
\N	\N	\N	\N	87	Hollow	Holw	f
\N	\N	\N	\N	88	Inlet	Inlt	f
\N	\N	\N	\N	89	Island	Is	f
\N	\N	\N	\N	90	Islands	Iss	f
\N	\N	\N	\N	91	Isle		f
\N	\N	\N	\N	92	Junction	Jct	f
\N	\N	\N	\N	93	Junctions	Jcts	f
\N	\N	\N	\N	94	Key	Ky	f
\N	\N	\N	\N	95	Keys	Kys	f
\N	\N	\N	\N	96	Knoll	Knl	f
\N	\N	\N	\N	97	Knolls	Knls	f
\N	\N	\N	\N	98	Lake	Lk	f
\N	\N	\N	\N	99	Lakes	Lks	f
\N	\N	\N	\N	100	Land		f
\N	\N	\N	\N	101	Landing	Lndg	f
\N	\N	\N	\N	102	Lane	Ln	f
\N	\N	\N	\N	103	Light	Lgt	f
\N	\N	\N	\N	104	Lights	Lgts	f
\N	\N	\N	\N	105	Loaf	Lf	f
\N	\N	\N	\N	106	Lock	Lck	f
\N	\N	\N	\N	107	Locks	Lcks	f
\N	\N	\N	\N	108	Lodge	Ldg	f
\N	\N	\N	\N	109	Loop	Lp	f
\N	\N	\N	\N	110	Mall		f
\N	\N	\N	\N	111	Manor	Mnr	f
\N	\N	\N	\N	112	Manors	Mnrs	f
\N	\N	\N	\N	113	Meadow	Mdw	f
\N	\N	\N	\N	114	Meadows	Mdws	f
\N	\N	\N	\N	115	Mews		f
\N	\N	\N	\N	116	Mill	Ml	f
\N	\N	\N	\N	117	Mills	Mls	f
\N	\N	\N	\N	118	Mission	Msn	f
\N	\N	\N	\N	119	Motorway	Mtwy	f
\N	\N	\N	\N	120	Mount	Mt	f
\N	\N	\N	\N	121	Mountain	Mtn	f
\N	\N	\N	\N	122	Mountains	Mtns	f
\N	\N	\N	\N	123	Neck	Nck	f
\N	\N	\N	\N	124	Orchard	Orch	f
\N	\N	\N	\N	125	Oval	Ovl	f
\N	\N	\N	\N	126	Overpass	Opas	f
\N	\N	\N	\N	127	Park	Prk	f
\N	\N	\N	\N	128	Parks	Park	f
\N	\N	\N	\N	129	Parkway	Pky	f
\N	\N	\N	\N	130	Parkways	Pkwys	f
\N	\N	\N	\N	131	Pass		f
\N	\N	\N	\N	132	Passage	Psge	f
\N	\N	\N	\N	133	Path		f
\N	\N	\N	\N	134	Pike	Pk	f
\N	\N	\N	\N	135	Pine	Pne	f
\N	\N	\N	\N	136	Pines	Pnes	f
\N	\N	\N	\N	137	Place	Pl	f
\N	\N	\N	\N	138	Plain	Pln	f
\N	\N	\N	\N	139	Plains	Plns	f
\N	\N	\N	\N	140	Plaza	Plz	f
\N	\N	\N	\N	141	Point	Pt	f
\N	\N	\N	\N	142	Points	Pts	f
\N	\N	\N	\N	143	Port	Prt	f
\N	\N	\N	\N	144	Ports	Prts	f
\N	\N	\N	\N	145	Prairie	Pr	f
\N	\N	\N	\N	146	Radial	Rad	f
\N	\N	\N	\N	147	Ramp		f
\N	\N	\N	\N	148	Ranch	Rnch	f
\N	\N	\N	\N	149	Rapid	Rpd	f
\N	\N	\N	\N	150	Rapids	Rpds	f
\N	\N	\N	\N	151	Rest	Rst	f
\N	\N	\N	\N	152	Ridge	Rdg	f
\N	\N	\N	\N	153	Ridges	Rdgs	f
\N	\N	\N	\N	154	River	Riv	f
\N	\N	\N	\N	155	Road	Rd	f
\N	\N	\N	\N	156	Roads	Rds	f
\N	\N	\N	\N	157	Route	Rte	f
\N	\N	\N	\N	158	Row		f
\N	\N	\N	\N	159	Rue		f
\N	\N	\N	\N	160	Run		f
\N	\N	\N	\N	161	Shoal	Shl	f
\N	\N	\N	\N	162	Shoals	Shls	f
\N	\N	\N	\N	163	Shore	Shr	f
\N	\N	\N	\N	164	Shores	Shrs	f
\N	\N	\N	\N	165	Skyway	Skwy	f
\N	\N	\N	\N	166	Spring	Spg	f
\N	\N	\N	\N	167	Springs	Spgs	f
\N	\N	\N	\N	168	Spur		f
\N	\N	\N	\N	169	Square	Sq	f
\N	\N	\N	\N	170	Squares	Sqs	f
\N	\N	\N	\N	171	Station	Stn	f
\N	\N	\N	\N	172	Strasse		f
\N	\N	\N	\N	173	Stravenue	Stra	f
\N	\N	\N	\N	174	Stream	Strm	f
\N	\N	\N	\N	175	Street	St	t
\N	\N	\N	\N	176	Streets	Sts	f
\N	\N	\N	\N	177	Summit	Smt	f
\N	\N	\N	\N	178	Terrace	Terr	f
\N	\N	\N	\N	179	Throughway	Trwy	f
\N	\N	\N	\N	180	Trace	Trce	f
\N	\N	\N	\N	181	Track	Trk	f
\N	\N	\N	\N	182	Trafficway	Trfy	f
\N	\N	\N	\N	183	Trail	Trl	f
\N	\N	\N	\N	184	Trailer	Trlr	f
\N	\N	\N	\N	185	Tunnel	Tunl	f
\N	\N	\N	\N	186	Turnpike	Tpke	f
\N	\N	\N	\N	187	Underpass	Upas	f
\N	\N	\N	\N	188	Union	Un	f
\N	\N	\N	\N	189	Unions	Uns	f
\N	\N	\N	\N	190	Valley	Vly	f
\N	\N	\N	\N	191	Valleys	Vlys	f
\N	\N	\N	\N	192	Via		f
\N	\N	\N	\N	193	Viaduct	Vdct	f
\N	\N	\N	\N	194	View	Vw	f
\N	\N	\N	\N	195	Views	Vws	f
\N	\N	\N	\N	196	Village	Vlg	f
\N	\N	\N	\N	197	Villages	Vlgs	f
\N	\N	\N	\N	198	Ville	Vl	f
\N	\N	\N	\N	199	Vista	Vis	f
\N	\N	\N	\N	200	Walk		f
\N	\N	\N	\N	201	Wall		f
\N	\N	\N	\N	202	Way	Wy	f
\N	\N	\N	\N	203	Well	Wl	f
\N	\N	\N	\N	204	Wells	Wls	f
\.


--
-- TOC entry 3892 (class 0 OID 16535)
-- Dependencies: 255
-- Data for Name: tax; Type: TABLE DATA; Schema: common; Owner: postgres
--

COPY common.tax (creation_user, creation_time, modification_user, modification_time, id, name, percent, is_default) FROM stdin;
\N	\N	\N	\N	1	Sales Tax	10	t
\.


--
-- TOC entry 3895 (class 0 OID 16547)
-- Dependencies: 258
-- Data for Name: company; Type: TABLE DATA; Schema: configuration; Owner: postgres
--

COPY configuration.company (creation_user, creation_time, modification_user, modification_time, legal_name, document_number, identity_document_type_id, zip_code, state, city, area, street_name, street_number, floor, door, block, coordinates, additional_data, street_suffix_id, country_id, phone1, phone2, email, fax, id, trade_name) FROM stdin;
dev@mail.to	1723014921942	\N	\N	AOC INC.	12345678	1	\N	\N	\N	\N	AOC	3	\N	\N	\N	\N	\N	175	44	696969696696	\N	aoc@atlantisofcode.com	\N	1	Atlantis of Code
\.


--
-- TOC entry 3897 (class 0 OID 16553)
-- Dependencies: 260
-- Data for Name: contact; Type: TABLE DATA; Schema: contacts; Owner: postgres
--

COPY contacts.contact (creation_user, creation_time, modification_user, modification_time, phone1, phone2, email, fax, id, name) FROM stdin;
\N	\N	\N	\N	123-456-7890	098-765-4321	john.smith@example.com	123-456-7891	1	John Smith
\N	\N	\N	\N	234-567-8901	987-654-3210	emma.johnson@example.com	234-567-8902	2	Emma Johnson
\N	\N	\N	\N	345-678-9012	876-543-2109	william.williams@example.com	345-678-9013	3	William Williams
\N	\N	\N	\N	456-789-0123	765-432-1098	olivia.brown@example.com	456-789-0124	4	Olivia Brown
\N	\N	\N	\N	567-890-1234	654-321-0987	james.jones@example.com	567-890-1235	5	James Jones
\N	\N	\N	\N	678-901-2345	543-210-9876	isabella.garcia@example.com	678-901-2346	6	Isabella Garcia
\N	\N	\N	\N	789-012-3456	432-109-8765	michael.martinez@example.com	789-012-3457	7	Michael Martinez
\N	\N	\N	\N	890-123-4567	321-098-7654	sophia.rodriguez@example.com	890-123-4568	8	Sophia Rodriguez
\N	\N	\N	\N	901-234-5678	210-987-6543	david.hernandez@example.com	901-234-5679	9	David Hernandez
\N	\N	\N	\N	012-345-6789	876-543-2101	mia.lopez@example.com	012-345-6790	10	Mia Lopez
\N	\N	\N	\N	123-456-7891	765-432-1098	chris.miller@example.com	123-456-7892	11	Chris Miller
\N	\N	\N	\N	234-567-8902	654-321-0987	anna.davis@example.com	234-567-8903	12	Anna Davis
\N	\N	\N	\N	345-678-9013	543-210-9876	john.martinez@example.com	345-678-9014	13	John Martinez
\N	\N	\N	\N	456-789-0124	432-109-8765	sophia.anderson@example.com	456-789-0125	14	Sophia Anderson
\N	\N	\N	\N	567-890-1235	321-098-7654	james.taylor@example.com	567-890-1236	15	James Taylor
\N	\N	\N	\N	678-901-2346	210-987-6543	emma.thomas@example.com	678-901-2347	16	Emma Thomas
\N	\N	\N	\N	789-012-3457	109-876-5432	michael.moore@example.com	789-012-3458	17	Michael Moore
\N	\N	\N	\N	890-123-4568	098-765-4321	olivia.jackson@example.com	890-123-4569	18	Olivia Jackson
\N	\N	\N	\N	901-234-5679	987-654-3210	david.martin@example.com	901-234-5680	19	David Martin
\N	\N	\N	\N	012-345-6790	876-543-2101	mia.lee@example.com	012-345-6791	20	Mia Lee
\N	\N	\N	\N	212-456-7890	213-765-4321	juan.perez@example.com	212-456-7891	21	Juan Perez
\N	\N	\N	\N	415-567-8901	416-654-3210	maria.gonzalez@example.com	415-567-8902	22	Maria Gonzalez
\N	\N	\N	\N	512-678-9012	518-543-2109	carlos.ramirez@example.com	512-678-9013	23	Carlos Ramirez
\N	\N	\N	\N	407-789-0123	408-432-1098	emily.robinson@example.com	407-789-0124	24	Emily Robinson
\N	\N	\N	\N	630-890-1234	631-321-0987	daniel.walker@example.com	630-890-1235	25	Daniel Walker
\N	\N	\N	\N	775-901-2345	775-210-9876	sophia.young@example.com	775-901-2346	26	Sophia Young
\N	\N	\N	\N	509-012-3456	510-109-8765	george.king@example.com	509-012-3457	27	George King
\N	\N	\N	\N	541-123-4567	542-098-7654	anna.wright@example.com	541-123-4568	28	Anna Wright
\N	\N	\N	\N	508-234-5678	508-987-6543	miguel.lopez@example.com	508-234-5679	29	Miguel Lopez
\N	\N	\N	\N	919-345-6789	920-876-5432	jessica.hill@example.com	919-345-6790	30	Jessica Hill
\.


--
-- TOC entry 3899 (class 0 OID 16559)
-- Dependencies: 262
-- Data for Name: customer; Type: TABLE DATA; Schema: customers; Owner: postgres
--

COPY customers.customer (creation_user, creation_time, modification_user, modification_time, zip_code, state, city, area, street_name, street_number, floor, door, block, coordinates, additional_data, street_suffix_id, country_id, legal_name, document_number, identity_document_type_id, phone1, phone2, email, fax, id, code, trade_name, birthdate, gender_id, language_id) FROM stdin;
\N	\N	\N	\N	10001	New York	New York	Manhattan	5th Ave	101	10	A	Block1	\N	\N	39	42	John Smith	A1234567	1	123-456-7890	098-765-4321	john.smith@example.com	123-456-7891	1	1	Smith Trading Co.	1985-01-15 00:00:00+00	1	3
\N	\N	\N	\N	20002	California	Los Angeles	Hollywood	Sunset Blvd	202	20	B	Block2	\N	\N	7	42	Emma Johnson	B2345678	1	234-567-8901	987-654-3210	emma.johnson@example.com	234-567-8902	2	2	Johnson Enterprises	1990-02-25 00:00:00+00	2	3
\N	\N	\N	\N	30303	Texas	Houston	Downtown	Main St	303	30	C	Block3	\N	\N	9	42	William Williams	C3456789	1	345-678-9012	876-543-2109	william.williams@example.com	345-678-9013	3	3	Williams Corp.	1982-03-05 00:00:00+00	1	2
\N	\N	\N	\N	40404	Florida	Miami	South Beach	Ocean Dr	404	40	D	Block4	\N	\N	12	42	Olivia Brown	D4567890	1	456-789-0123	765-432-1098	olivia.brown@example.com	456-789-0124	4	4	Brown LLC	1988-04-15 00:00:00+00	2	2
\N	\N	\N	\N	50505	Illinois	Chicago	Downtown	Michigan Ave	505	50	E	Block5	\N	\N	26	42	James Jones	E5678901	1	567-890-1234	654-321-0987	james.jones@example.com	567-890-1235	5	5	Jones & Sons	1992-05-25 00:00:00+00	1	3
\N	\N	\N	\N	60606	Nevada	Las Vegas	The Strip	Las Vegas Blvd	606	60	F	Block6	\N	\N	47	42	Isabella Garcia	F6789012	1	678-901-2345	543-210-9876	isabella.garcia@example.com	678-901-2346	6	6	Garcia Bros.	1987-06-05 00:00:00+00	2	2
\N	\N	\N	\N	70707	Washington	Seattle	Downtown	Pike St	707	70	G	Block7	\N	\N	39	42	Michael Martinez	G7890123	1	789-012-3456	432-109-8765	michael.martinez@example.com	789-012-3457	7	7	Martinez Inc.	1983-07-15 00:00:00+00	1	1
\N	\N	\N	\N	80808	Arizona	Phoenix	Tempe	Mill Ave	808	80	H	Block8	\N	\N	3	42	Sophia Rodriguez	H8901234	1	890-123-4567	321-098-7654	sophia.rodriguez@example.com	890-123-4568	8	8	Rodriguez Ltd.	1991-08-25 00:00:00+00	2	2
\N	\N	\N	\N	90909	Colorado	Denver	Capitol Hill	Colfax Ave	909	90	I	Block9	\N	\N	32	42	David Hernandez	I9012345	1	901-234-5678	210-987-6543	david.hernandez@example.com	901-234-5679	9	9	Hernandez Group	1984-09-05 00:00:00+00	1	1
\N	\N	\N	\N	10101	Illinois	Springfield	Downtown	Monroe St	1010	100	J	Block10	\N	\N	20	42	Mia Lopez	J0123456	1	012-345-6789	876-543-2101	mia.lopez@example.com	012-345-6790	10	10	Lopez Holdings	1989-10-15 00:00:00+00	2	3
\N	\N	\N	\N	20202	Georgia	Atlanta	Midtown	Peachtree St	2020	200	K	Block11	\N	\N	29	42	Chris Miller	K1234567	1	123-456-7891	765-432-1098	chris.miller@example.com	123-456-7892	11	11	Miller Ltd.	1979-11-25 00:00:00+00	1	1
\N	\N	\N	\N	30303	Ohio	Columbus	Short North	High St	3030	300	L	Block12	\N	\N	14	42	Anna Davis	L2345678	1	234-567-8902	654-321-0987	anna.davis@example.com	234-567-8903	12	12	Davis & Co.	1981-12-05 00:00:00+00	2	2
\N	\N	\N	\N	40404	Texas	Dallas	Uptown	McKinney Ave	4040	400	M	Block13	\N	\N	2	42	John Martinez	M3456789	1	345-678-9013	543-210-9876	john.martinez@example.com	345-678-9014	13	13	Martinez Ltd.	1985-01-25 00:00:00+00	1	3
\N	\N	\N	\N	50505	Michigan	Detroit	Midtown	Woodward Ave	5050	500	N	Block14	\N	\N	1	42	Sophia Anderson	N4567890	1	456-789-0124	432-109-8765	sophia.anderson@example.com	456-789-0125	14	14	Anderson LLC	1987-02-05 00:00:00+00	2	2
\N	\N	\N	\N	60606	North Carolina	Charlotte	South End	Tryon St	6060	600	O	Block15	\N	\N	15	42	James Taylor	O5678901	1	567-890-1235	321-098-7654	james.taylor@example.com	567-890-1236	15	15	Taylor Corp.	1990-03-25 00:00:00+00	1	3
\N	\N	\N	\N	70707	Virginia	Richmond	Downtown	Broad St	7070	700	P	Block16	\N	\N	22	42	Emma Thomas	P6789012	1	678-901-2346	210-987-6543	emma.thomas@example.com	678-901-2347	16	16	Thomas Inc.	1988-04-15 00:00:00+00	2	2
\N	\N	\N	\N	80808	Pennsylvania	Philadelphia	Center City	Market St	8080	800	Q	Block17	\N	\N	36	42	Michael Moore	Q7890123	1	789-012-3457	109-876-5432	michael.moore@example.com	789-012-3458	17	17	Moore Enterprises	1982-05-05 00:00:00+00	1	1
\N	\N	\N	\N	90909	Arizona	Tucson	Downtown	Congress St	9090	900	R	Block18	\N	\N	45	42	Olivia Jackson	R8901234	1	890-123-4568	098-765-4321	olivia.jackson@example.com	890-123-4569	18	18	Jackson Bros.	1991-06-25 00:00:00+00	2	2
\N	\N	\N	\N	10101	Oregon	Portland	Pearl District	Lovejoy St	1010	1000	S	Block19	\N	\N	25	42	David Martin	S9012345	1	901-234-5679	987-654-3210	david.martin@example.com	901-234-5680	19	19	Martin Group	1984-07-15 00:00:00+00	1	2
\N	\N	\N	\N	20202	Massachusetts	Boston	Back Bay	Newbury St	2020	2000	T	Block20	\N	\N	40	42	Mia Lee	T0123456	1	012-345-6790	876-543-2101	mia.lee@example.com	012-345-6791	20	20	Lee Holdings	1989-08-05 00:00:00+00	2	3
\N	\N	\N	\N	30303	New York	New York	Manhattan	8th Ave	210	15	A	Block21	\N	\N	35	42	Juan Perez	U2345678	1	212-456-7890	213-765-4321	juan.perez@example.com	212-456-7891	21	21	Perez Trading Co.	1985-09-15 00:00:00+00	1	1
\N	\N	\N	\N	40404	California	San Francisco	Downtown	Market St	225	25	B	Block22	\N	\N	37	42	Maria Gonzalez	V3456789	1	415-567-8901	416-654-3210	maria.gonzalez@example.com	415-567-8902	22	22	Gonzalez Enterprises	1991-10-25 00:00:00+00	2	1
\N	\N	\N	\N	50505	Texas	Austin	Downtown	Congress Ave	333	30	C	Block23	\N	\N	24	42	Carlos Ramirez	W4567890	1	512-678-9012	518-543-2109	carlos.ramirez@example.com	512-678-9013	23	23	Ramirez Corp.	1984-11-05 00:00:00+00	1	2
\N	\N	\N	\N	60606	Florida	Orlando	Downtown	Orange Ave	101	10	D	Block24	\N	\N	11	42	Emily Robinson	X5678901	1	407-789-0123	408-432-1098	emily.robinson@example.com	407-789-0124	24	24	Robinson LLC	1989-12-15 00:00:00+00	2	2
\N	\N	\N	\N	70707	Illinois	Naperville	Downtown	Main St	111	50	E	Block25	\N	\N	46	42	Daniel Walker	Y6789012	1	630-890-1234	631-321-0987	daniel.walker@example.com	630-890-1235	25	25	Walker & Sons	1990-01-25 00:00:00+00	1	3
\N	\N	\N	\N	80808	Nevada	Reno	Downtown	Virginia St	202	60	F	Block26	\N	\N	16	42	Sophia Young	Z7890123	1	775-901-2345	775-210-9876	sophia.young@example.com	775-901-2346	26	26	Young Bros.	1987-02-05 00:00:00+00	2	2
\N	\N	\N	\N	90909	Washington	Spokane	Downtown	Sprague Ave	303	70	G	Block27	\N	\N	4	42	George King	AA8901234	1	509-012-3456	510-109-8765	george.king@example.com	509-012-3457	27	27	King Inc.	1988-03-15 00:00:00+00	1	1
\N	\N	\N	\N	10101	Oregon	Eugene	Downtown	Willamette St	404	80	H	Block28	\N	\N	21	42	Anna Wright	BB9012345	1	541-123-4567	542-098-7654	anna.wright@example.com	541-123-4568	28	28	Wright Ltd.	1989-04-25 00:00:00+00	2	1
\N	\N	\N	\N	20202	Massachusetts	Worcester	Downtown	Main St	505	90	I	Block29	\N	\N	23	42	Miguel Lopez	CC0123456	1	508-234-5678	508-987-6543	miguel.lopez@example.com	508-234-5679	29	29	Lopez Group	1990-05-05 00:00:00+00	1	2
\N	\N	\N	\N	30303	North Carolina	Raleigh	Downtown	Hillsborough St	606	100	J	Block30	\N	\N	41	42	Jessica Hill	DD1234567	1	919-345-6789	920-876-5432	jessica.hill@example.com	919-345-6790	30	30	Hill Holdings	1988-06-15 00:00:00+00	2	2
\.


--
-- TOC entry 3900 (class 0 OID 16564)
-- Dependencies: 263
-- Data for Name: customer_contact; Type: TABLE DATA; Schema: customers; Owner: postgres
--

COPY customers.customer_contact (creation_user, creation_time, modification_user, modification_time, id, customer_id, contact_id) FROM stdin;
\N	\N	\N	\N	1	1	1
\N	\N	\N	\N	2	2	2
\N	\N	\N	\N	3	3	3
\N	\N	\N	\N	4	4	4
\N	\N	\N	\N	5	5	5
\N	\N	\N	\N	6	6	6
\N	\N	\N	\N	7	7	7
\N	\N	\N	\N	8	8	8
\N	\N	\N	\N	9	9	9
\N	\N	\N	\N	10	10	10
\N	\N	\N	\N	11	11	11
\N	\N	\N	\N	12	12	12
\N	\N	\N	\N	13	13	13
\N	\N	\N	\N	14	14	14
\N	\N	\N	\N	15	15	15
\N	\N	\N	\N	16	16	16
\N	\N	\N	\N	17	17	17
\N	\N	\N	\N	18	18	18
\N	\N	\N	\N	19	19	19
\N	\N	\N	\N	20	20	20
\N	\N	\N	\N	21	21	21
\N	\N	\N	\N	22	22	22
\N	\N	\N	\N	23	23	23
\N	\N	\N	\N	24	24	24
\N	\N	\N	\N	25	25	25
\N	\N	\N	\N	26	26	26
\N	\N	\N	\N	27	27	27
\N	\N	\N	\N	28	28	28
\N	\N	\N	\N	29	29	29
\N	\N	\N	\N	30	30	30
\.


--
-- TOC entry 3902 (class 0 OID 16570)
-- Dependencies: 265
-- Data for Name: customer_file; Type: TABLE DATA; Schema: customers; Owner: postgres
--

COPY customers.customer_file (creation_user, creation_time, modification_user, modification_time, id, customer_id, file_id) FROM stdin;
\.


--
-- TOC entry 3905 (class 0 OID 16577)
-- Dependencies: 268
-- Data for Name: file; Type: TABLE DATA; Schema: files; Owner: postgres
--

COPY files.file (creation_user, creation_time, modification_user, modification_time, id, name, mime, directory, subdirectory, ref_id, ref_class) FROM stdin;
dev@mail.to	1723015166069	\N	\N	1	313096c1-f9c8-4896-a347-be704c7b8619	image/png	Items	Photos	54	items.item
dev@mail.to	1723015180979	\N	\N	2	c02e9dce-9bd7-4e43-921c-28d45b92973e	image/png	Items	Photos	53	items.item
dev@mail.to	1723015201141	\N	\N	3	0378e2e0-3cc9-452c-97fb-a4cea08a4aac	image/png	Items	Photos	52	items.item
dev@mail.to	1723015217410	\N	\N	4	5968e208-041f-4d15-aac9-79d12fb448db	image/png	Items	Photos	51	items.item
dev@mail.to	1723015234097	\N	\N	5	8225e100-caf2-4fe3-987b-0772ced259af	image/png	Items	Photos	50	items.item
dev@mail.to	1723015245333	\N	\N	6	4c96f21f-f906-47a6-9822-19220206664a	image/png	Items	Photos	49	items.item
dev@mail.to	1723015265998	\N	\N	7	df5fcb26-1a65-4567-be19-51a9cbc4f732	image/png	Items	Photos	48	items.item
dev@mail.to	1723015282444	\N	\N	8	ed03cc07-40b2-493c-8765-e361b26b6586	image/png	Items	Photos	47	items.item
dev@mail.to	1723015299805	\N	\N	9	a00c4d90-d234-4ded-a4d0-a529bd2b0559	image/png	Items	Photos	46	items.item
dev@mail.to	1723015320290	\N	\N	10	93afa87c-ff8b-4dad-941e-1a68bdf0afbf	image/png	Items	Photos	45	items.item
dev@mail.to	1723015343686	\N	\N	11	7079aead-4de6-4918-aa8b-da868c9924ad	image/png	Items	Photos	44	items.item
dev@mail.to	1723015358786	\N	\N	12	ec83be20-4313-451f-8929-52a97096edb1	image/png	Items	Photos	43	items.item
dev@mail.to	1723015379060	\N	\N	13	c36ec2ba-c5dd-497d-967b-8ac226b8f0ed	image/png	Items	Photos	42	items.item
dev@mail.to	1723015397713	\N	\N	14	78d40291-53d6-4501-806f-997d5bf30259	image/png	Items	Photos	41	items.item
dev@mail.to	1723015410531	\N	\N	15	8ad43a6b-8963-40d3-adf7-b06e1126a216	image/png	Items	Photos	40	items.item
dev@mail.to	1723015439888	\N	\N	16	33ff9d77-ab11-4de7-a020-a718f83fc30e	image/png	Items	Photos	39	items.item
dev@mail.to	1723015457067	\N	\N	17	0d8a8119-329b-4adf-9a0e-03beaa4ac1d0	image/png	Items	Photos	38	items.item
dev@mail.to	1723015473026	\N	\N	18	f8464599-cfd1-4982-a6f1-ea8a250fb0f0	image/png	Items	Photos	37	items.item
dev@mail.to	1723015494164	\N	\N	19	25daf84b-7a40-4b80-abd2-2f7e824ee5fa	image/png	Items	Photos	36	items.item
dev@mail.to	1723015528556	\N	\N	20	bd5a866c-cbbe-4eb2-aee8-ed8e6af5f392	image/png	Items	Photos	35	items.item
dev@mail.to	1723015555753	\N	\N	21	2cd16b67-4636-4e88-a8e2-7c027557f59d	image/png	Items	Photos	34	items.item
dev@mail.to	1723015573802	\N	\N	22	81640e08-01d6-4479-8295-63370f49f302	image/png	Items	Photos	33	items.item
dev@mail.to	1723015589777	\N	\N	23	ddac0ae6-4066-4ec6-9110-fdd611dba56f	image/png	Items	Photos	32	items.item
dev@mail.to	1723015605639	\N	\N	24	6907c7ab-cc73-45c5-b1a2-999d35c37e00	image/png	Items	Photos	31	items.item
dev@mail.to	1723015624355	\N	\N	25	1a7958b0-d931-401a-ac2a-fdcf2c20c7b9	image/png	Items	Photos	30	items.item
dev@mail.to	1723015656615	\N	\N	26	f58f67fc-516f-4f56-8d1c-5486001f0518	image/png	Items	Photos	29	items.item
dev@mail.to	1723015670197	\N	\N	27	4d7666d2-13c5-4bb1-9b43-45f0257cb65e	image/png	Items	Photos	28	items.item
dev@mail.to	1723015710530	\N	\N	28	c0729fe5-fdee-4d02-8087-a6f44fffafef	image/png	Items	Photos	27	items.item
dev@mail.to	1723015725157	\N	\N	29	ddaec453-013d-49d9-b5a2-648deaabcafc	image/png	Items	Photos	26	items.item
dev@mail.to	1723015746465	\N	\N	30	dab45d3b-a2a9-41cc-a0e6-c957f754fb7a	image/png	Items	Photos	25	items.item
dev@mail.to	1723015765054	\N	\N	31	40c87da1-1a0a-4583-a733-00fa4c53d8d6	image/png	Items	Photos	24	items.item
dev@mail.to	1723015783346	\N	\N	32	e01c1646-243e-427f-95bb-3636658e771a	image/png	Items	Photos	23	items.item
dev@mail.to	1723015801428	\N	\N	33	076bb439-ddea-4c79-a241-1128acc20b22	image/png	Items	Photos	22	items.item
dev@mail.to	1723015869443	\N	\N	34	67d09b7f-f56d-48da-ae2d-8ecd7382aa85	image/png	Items	Photos	21	items.item
dev@mail.to	1723015884882	\N	\N	35	01fb0909-0d14-4807-9df2-4eb0d7b70fa5	image/png	Items	Photos	20	items.item
dev@mail.to	1723015906241	\N	\N	36	53c4445b-4fc9-46ba-aeb2-0ea8b57547ce	image/png	Items	Photos	19	items.item
dev@mail.to	1723015928880	\N	\N	37	0508b3ee-0fa6-41ee-87f3-4445a5ad3258	image/png	Items	Photos	18	items.item
dev@mail.to	1723015943538	\N	\N	38	ad8748f7-dff0-447e-af16-0a8564a7fc24	image/png	Items	Photos	17	items.item
dev@mail.to	1723015961423	\N	\N	39	7ab28281-3917-4f17-8b99-102e28d89ca3	image/png	Items	Photos	16	items.item
dev@mail.to	1723015981009	\N	\N	40	d74668e9-0aea-48f4-a8dd-7d9f3d824b11	image/png	Items	Photos	15	items.item
dev@mail.to	1723016000459	\N	\N	41	80872884-3ee2-4228-b1a7-b34557703a7c	image/png	Items	Photos	14	items.item
dev@mail.to	1723016021629	\N	\N	42	d2375b66-14e4-4691-bff8-edda9dbcd33a	image/png	Items	Photos	13	items.item
dev@mail.to	1723016039146	\N	\N	43	b682c46e-a7ff-4d68-9f8e-e22209e8ee9d	image/png	Items	Photos	12	items.item
dev@mail.to	1723016058664	\N	\N	44	fd4bb79d-7d60-4d05-b79b-5e492b921946	image/png	Items	Photos	11	items.item
dev@mail.to	1723016089895	\N	\N	45	1acc2257-2bb1-4c81-918a-27d2ce6c2ee3	image/png	Items	Photos	10	items.item
dev@mail.to	1723016107136	\N	\N	46	9672a520-11b6-4ad3-9d02-0ccc42fc03d0	image/png	Items	Photos	9	items.item
dev@mail.to	1723016125110	\N	\N	47	7e04ea12-756c-441f-b35f-e5ca49d672df	image/png	Items	Photos	8	items.item
dev@mail.to	1723016141136	\N	\N	48	28910152-e6b2-4549-9bd2-5e615ae09f82	image/png	Items	Photos	7	items.item
dev@mail.to	1723016158089	\N	\N	49	0b85c069-44c6-4632-bd9e-ff44e1c8be7c	image/png	Items	Photos	6	items.item
dev@mail.to	1723016175233	\N	\N	50	4d243293-b73e-4f44-893d-1abd8e8fc4d7	image/png	Items	Photos	5	items.item
dev@mail.to	1723016195977	\N	\N	51	81e179f1-0f37-45b9-918b-ef3c306e5998	image/png	Items	Photos	4	items.item
dev@mail.to	1723016231011	\N	\N	52	8f529d34-1c01-4aaa-a22a-e61671f40c5e	image/png	Items	Photos	3	items.item
dev@mail.to	1723016244341	\N	\N	53	1be52a83-151f-466f-999f-62a712d50f45	image/png	Items	Photos	2	items.item
dev@mail.to	1723016264509	\N	\N	54	7b04dc80-dac7-471f-8550-d8facd53b9ed	image/png	Items	Photos	1	items.item
\.


--
-- TOC entry 3908 (class 0 OID 16588)
-- Dependencies: 271
-- Data for Name: budget; Type: TABLE DATA; Schema: invoicing; Owner: postgres
--

COPY invoicing.budget (creation_user, creation_time, modification_user, modification_time, number, date, observations, total_base, total_taxes, total, customer_id, series_id, fiscal_year_id, id) FROM stdin;
dev@mail.to	1723022566210	\N	\N	1	2024-08-07 09:22:46.21+00	\N	25499.92	2549.99	28049.91	23	3	1	1
\.


--
-- TOC entry 3909 (class 0 OID 16593)
-- Dependencies: 272
-- Data for Name: budget_file; Type: TABLE DATA; Schema: invoicing; Owner: postgres
--

COPY invoicing.budget_file (creation_user, creation_time, modification_user, modification_time, id, budget_id, file_id) FROM stdin;
\.


--
-- TOC entry 3913 (class 0 OID 16606)
-- Dependencies: 276
-- Data for Name: budget_line; Type: TABLE DATA; Schema: invoicing; Owner: postgres
--

COPY invoicing.budget_line (creation_user, creation_time, modification_user, modification_time, "order", item_code, item_name, base_price, quantity, discount, total_base, tax_id, item_id, store_id, id, budget_id) FROM stdin;
dev@mail.to	1723022566210	\N	\N	1	1051	IBM System x Server	2999.99	10	15	25499.92	1	51	\N	1	1
\.


--
-- TOC entry 3915 (class 0 OID 16613)
-- Dependencies: 278
-- Data for Name: delivery_note; Type: TABLE DATA; Schema: invoicing; Owner: postgres
--

COPY invoicing.delivery_note (creation_user, creation_time, modification_user, modification_time, number, date, observations, total_base, total_taxes, total, customer_id, series_id, fiscal_year_id, id, invoice_id) FROM stdin;
dev@mail.to	1723022445332	dev@mail.to	1723022450762	1	2024-08-07 09:20:45.332+00	\N	294.97	29.50	324.47	1	2	1	1	1
dev@mail.to	1723022491690	dev@mail.to	1723022518875	2	2024-08-07 09:21:31.69+00	\N	1264.98	126.50	1391.48	2	2	1	2	2
dev@mail.to	1723022503782	dev@mail.to	1723022518875	3	2024-08-07 09:21:43.782+00	\N	439.99	44.00	483.99	2	2	1	3	2
\.


--
-- TOC entry 3916 (class 0 OID 16618)
-- Dependencies: 279
-- Data for Name: delivery_note_file; Type: TABLE DATA; Schema: invoicing; Owner: postgres
--

COPY invoicing.delivery_note_file (creation_user, creation_time, modification_user, modification_time, id, delivery_note_id, file_id) FROM stdin;
\.


--
-- TOC entry 3919 (class 0 OID 16625)
-- Dependencies: 282
-- Data for Name: delivery_note_line; Type: TABLE DATA; Schema: invoicing; Owner: postgres
--

COPY invoicing.delivery_note_line (creation_user, creation_time, modification_user, modification_time, id, delivery_note_id, stock_line_id) FROM stdin;
\N	\N	\N	\N	1	1	2
\N	\N	\N	\N	2	1	3
\N	\N	\N	\N	3	2	4
\N	\N	\N	\N	4	2	5
\N	\N	\N	\N	5	3	6
\.


--
-- TOC entry 3921 (class 0 OID 16631)
-- Dependencies: 284
-- Data for Name: invoice; Type: TABLE DATA; Schema: invoicing; Owner: postgres
--

COPY invoicing.invoice (creation_user, creation_time, modification_user, modification_time, number, date, observations, total_base, total_taxes, total, customer_id, series_id, fiscal_year_id, id, customer_legal_data_id, customer_address_id, company_legal_data_id, company_address_id) FROM stdin;
dev@mail.to	1723022450762	\N	\N	1	2024-08-07 09:20:50.762+00	\N	294.97	29.50	324.47	1	1	1	1	\N	\N	\N	\N
dev@mail.to	1723022518875	\N	\N	2	2024-08-07 09:21:58.875+00	\N	1704.97	170.50	1875.47	2	1	1	2	\N	\N	\N	\N
\.


--
-- TOC entry 3922 (class 0 OID 16636)
-- Dependencies: 285
-- Data for Name: invoice_file; Type: TABLE DATA; Schema: invoicing; Owner: postgres
--

COPY invoicing.invoice_file (creation_user, creation_time, modification_user, modification_time, id, invoice_id, file_id) FROM stdin;
\.


--
-- TOC entry 3925 (class 0 OID 16643)
-- Dependencies: 288
-- Data for Name: stock_line; Type: TABLE DATA; Schema: invoicing; Owner: postgres
--

COPY invoicing.stock_line (creation_user, creation_time, modification_user, modification_time, "order", item_code, item_name, base_price, quantity, discount, total_base, tax_id, item_id, store_id, id) FROM stdin;
dev@mail.to	1723022445332	\N	\N	1	1020	Brother All-in-One Printer	249.99	1	10	224.99	1	20	\N	2
dev@mail.to	1723022445332	\N	\N	2	1039	Brother Ink Cartridges	34.99	2	0	69.98	1	39	\N	3
dev@mail.to	1723022491690	\N	\N	1	1048	Belkin Laptop Stand	29.99	1	0	29.99	1	48	\N	4
dev@mail.to	1723022491690	\N	\N	2	1019	Lenovo ThinkPad X1	1299.99	1	5	1234.99	1	19	\N	5
dev@mail.to	1723022503782	\N	\N	1	1047	CorelDRAW Graphics Suite	499.99	1	12	439.99	1	47	\N	6
dev@mail.to	1723022542872	\N	\N	1	1003	Epson Ink Cartridges	39.99	1	0	39.99	1	3	\N	7
dev@mail.to	1723022542872	\N	\N	2	1049	Ethernet Cable 10ft	12.99	2	0	25.98	1	49	\N	8
\.


--
-- TOC entry 3927 (class 0 OID 16650)
-- Dependencies: 290
-- Data for Name: ticket; Type: TABLE DATA; Schema: invoicing; Owner: postgres
--

COPY invoicing.ticket (creation_user, creation_time, modification_user, modification_time, number, date, observations, total_base, total_taxes, total, customer_id, series_id, fiscal_year_id, id, customer_legal_data_id, customer_address_id, company_legal_data_id, company_address_id) FROM stdin;
dev@mail.to	1723022542872	\N	\N	1	2024-08-07 09:22:22.872+00	\N	65.97	6.60	72.57	\N	4	1	3	6	6	5	5
\.


--
-- TOC entry 3928 (class 0 OID 16655)
-- Dependencies: 291
-- Data for Name: ticket_file; Type: TABLE DATA; Schema: invoicing; Owner: postgres
--

COPY invoicing.ticket_file (creation_user, creation_time, modification_user, modification_time, id, ticket_id, file_id) FROM stdin;
\.


--
-- TOC entry 3931 (class 0 OID 16662)
-- Dependencies: 294
-- Data for Name: ticket_line; Type: TABLE DATA; Schema: invoicing; Owner: postgres
--

COPY invoicing.ticket_line (creation_user, creation_time, modification_user, modification_time, id, ticket_id, stock_line_id) FROM stdin;
\N	\N	\N	\N	1	3	7
\N	\N	\N	\N	2	3	8
\.


--
-- TOC entry 3933 (class 0 OID 16668)
-- Dependencies: 296
-- Data for Name: category; Type: TABLE DATA; Schema: items; Owner: postgres
--

COPY items.category (creation_user, creation_time, modification_user, modification_time, id, name) FROM stdin;
\N	\N	\N	\N	1	Laptops
\N	\N	\N	\N	2	Printers
\N	\N	\N	\N	3	Consumables
\N	\N	\N	\N	4	Gaming
\N	\N	\N	\N	5	Desktops
\N	\N	\N	\N	6	Monitors
\N	\N	\N	\N	7	Keyboards
\N	\N	\N	\N	8	Mice
\N	\N	\N	\N	9	Networking Equipment
\N	\N	\N	\N	10	Storage Devices
\N	\N	\N	\N	11	Software
\N	\N	\N	\N	12	Accessories
\N	\N	\N	\N	13	Cables
\N	\N	\N	\N	14	Power Supplies
\N	\N	\N	\N	15	Servers
\N	\N	\N	\N	16	Cooling Solutions
\N	\N	\N	\N	17	Virtual Reality
\N	\N	\N	\N	18	Smart Home Devices
\.


--
-- TOC entry 3935 (class 0 OID 16674)
-- Dependencies: 298
-- Data for Name: item; Type: TABLE DATA; Schema: items; Owner: postgres
--

COPY items.item (creation_user, creation_time, modification_user, modification_time, id, code, name, description, base_price, is_enabled, tax_id, category_id, photo_id) FROM stdin;
\N	\N	dev@mail.to	1723015180979	53	1053	PlayStation VR	<p>Virtual reality headset for PlayStation gaming.</p>	349.99	t	1	17	2
\N	\N	dev@mail.to	1723015201141	52	1052	Arctic Liquid Freezer II	<p>All-in-one liquid CPU cooler with high efficiency.</p>	119.99	t	1	16	3
\N	\N	dev@mail.to	1723015217410	51	1051	IBM System x Server	<p>Robust server for critical business applications.</p>	2999.99	t	1	15	4
\N	\N	dev@mail.to	1723015245333	49	1049	Ethernet Cable 10ft	<p>High-speed Ethernet cable for reliable wired connections.</p>	12.99	t	1	13	6
\N	\N	dev@mail.to	1723015265998	48	1048	Belkin Laptop Stand	<p>Adjustable stand for ergonomic laptop use.</p>	29.99	t	1	12	7
\N	\N	dev@mail.to	1723015282444	47	1047	CorelDRAW Graphics Suite	<p>Complete software suite for graphic design and illustration.</p>	499.99	t	1	11	8
\N	\N	dev@mail.to	1723015299805	46	1046	SanDisk 500GB SSD	<p>High-speed external SSD for fast data transfer.</p>	79.99	t	1	10	9
\N	\N	dev@mail.to	1723015343686	44	1044	Apple Magic Mouse	<p>Innovative multi-touch mouse with sleek design.</p>	79.99	t	1	8	11
\N	\N	dev@mail.to	1723015358786	43	1043	Corsair K95 Keyboard	<p>Top-tier mechanical keyboard with macro keys and RGB lighting.</p>	199.99	t	1	7	12
\N	\N	dev@mail.to	1723015379060	42	1042	LG UltraWide Monitor	<p>Ultra-wide monitor with panoramic view and high resolution.</p>	299.99	t	1	6	13
\N	\N	dev@mail.to	1723015397713	41	1041	HP Pavilion Desktop	<p>Versatile desktop computer with modern design.</p>	799.99	t	1	5	14
\N	\N	dev@mail.to	1723015439888	39	1039	Brother Ink Cartridges	<p>Long-lasting ink cartridges for Brother printers.</p>	34.99	t	1	3	16
\N	\N	dev@mail.to	1723015457067	38	1038	Epson EcoTank Printer	<p>Eco-friendly printer with refillable ink tanks.</p>	299.99	t	1	2	17
\N	\N	dev@mail.to	1723015473026	37	1037	Asus ROG Zephyrus	<p>Ultra-slim gaming laptop with powerful graphics.</p>	2199.99	t	1	1	18
\N	\N	dev@mail.to	1723015528556	35	1035	HTC Vive Pro	<p>Professional-grade VR headset with high resolution display.</p>	799.99	t	1	17	20
\N	\N	dev@mail.to	1723015555753	34	1034	Noctua NH-D15 Cooler	<p>Premium CPU cooler with dual tower heatsink design.</p>	89.99	t	1	16	21
\N	\N	dev@mail.to	1723015573802	33	1033	HPE ProLiant Server	<p>High-performance server for enterprise applications.</p>	1999.99	t	1	15	22
\N	\N	dev@mail.to	1723015605639	31	1031	USB-C to HDMI Adapter	<p>Adapter for connecting USB-C devices to HDMI displays.</p>	19.99	t	1	13	24
\N	\N	dev@mail.to	1723015624355	30	1030	Targus Laptop Sleeve	<p>Protective sleeve for laptops up to 15 inches.</p>	19.99	t	1	12	25
\N	\N	dev@mail.to	1723015656615	29	1029	Adobe Creative Cloud	<p>Full suite of creative software for design, video, and more.</p>	599.99	t	1	11	26
\N	\N	dev@mail.to	1723015710530	27	1027	TP-Link WiFi Extender	<p>WiFi range extender to boost home network coverage.</p>	39.99	t	1	9	28
\N	\N	dev@mail.to	1723015725157	26	1026	Microsoft Surface Mouse	<p>Sleek and portable wireless mouse with ergonomic design.</p>	49.99	t	1	8	29
\N	\N	dev@mail.to	1723015746465	25	1025	Razer BlackWidow	<p>High-end mechanical gaming keyboard with tactile feedback.</p>	139.99	t	1	7	30
\N	\N	dev@mail.to	1723015765054	24	1024	Acer 27" Monitor	<p>Large screen monitor with QHD resolution and vibrant colors.</p>	199.99	t	1	6	31
\N	\N	dev@mail.to	1723015801428	22	1022	Logitech Gaming Keyboard	<p>Mechanical gaming keyboard with customizable RGB lighting.</p>	129.99	t	1	4	33
\N	\N	dev@mail.to	1723015869443	21	1021	Canon Printer Toner	<p>High capacity toner cartridge for Canon laser printers.</p>	59.99	t	1	3	34
\N	\N	dev@mail.to	1723015906241	19	1019	Lenovo ThinkPad X1	<p>Business laptop with robust performance and security features.</p>	1299.99	t	1	1	36
\N	\N	dev@mail.to	1723015928880	18	1018	Amazon Echo	<p>Smart home device with voice assistant integration.</p>	99.99	t	1	18	37
\N	\N	dev@mail.to	1723015943538	17	1017	Oculus Quest 2	<p>Standalone VR headset with immersive experience.</p>	299.99	t	1	17	38
\N	\N	dev@mail.to	1723015961423	16	1016	Cooler Master CPU Cooler	<p>Effective CPU cooler for optimal thermal performance.</p>	39.99	t	1	16	39
\N	\N	dev@mail.to	1723016000459	14	1014	Corsair 750W PSU	<p>High-efficiency power supply unit for gaming PCs.</p>	109.99	t	1	14	41
\N	\N	dev@mail.to	1723016021629	13	1013	HDMI Cable 6ft	<p>High-speed HDMI cable for connecting monitors and TVs.</p>	9.99	t	1	13	42
\N	\N	dev@mail.to	1723016039146	12	1012	Laptop Backpack	<p>Durable backpack with multiple compartments for laptops and accessories.</p>	39.99	t	1	12	43
\N	\N	dev@mail.to	1723016058664	11	1011	Microsoft Office Suite	<p>Comprehensive office software package.</p>	149.99	t	1	11	44
\N	\N	dev@mail.to	1723016107136	9	1009	Netgear Router	<p>High-speed wireless router for home networking.</p>	79.99	t	1	9	46
\N	\N	dev@mail.to	1723016125110	8	1008	Logitech Wireless Mouse	<p>Ergonomic wireless mouse with long battery life.</p>	29.99	t	1	8	47
\N	\N	dev@mail.to	1723016141136	7	1007	Mechanical Keyboard	<p>Durable mechanical keyboard with RGB lighting.</p>	89.99	t	1	7	48
\N	\N	dev@mail.to	1723016175233	5	1005	Apple iMac 27"	<p>All-in-one desktop computer with stunning Retina display.</p>	1799.99	t	1	5	50
\N	\N	dev@mail.to	1723016195977	4	1004	Razer Gaming Mouse	<p>Precision gaming mouse with customizable buttons.</p>	59.99	t	1	4	51
\N	\N	dev@mail.to	1723016231011	3	1003	Epson Ink Cartridges	<p>High yield ink cartridges for Epson printers.</p>	39.99	t	1	3	52
\N	\N	dev@mail.to	1723016244341	2	1002	HP LaserJet Pro	<p>Reliable monochrome laser printer for office use.</p>	199.99	t	1	2	53
\N	\N	dev@mail.to	1723015166069	54	1054	Philips Hue Smart Bulbs	<p>Smart lighting system with customizable colors and remote control.</p>	49.99	t	1	18	1
\N	\N	dev@mail.to	1723015234097	50	1050	Thermaltake 850W PSU	<p>High-capacity power supply unit for high-end gaming PCs.</p>	129.99	t	1	14	5
\N	\N	dev@mail.to	1723015320290	45	1045	Linksys Velop Mesh Router	<p>Mesh WiFi system for seamless home network coverage.</p>	199.99	t	1	9	10
\N	\N	dev@mail.to	1723015410531	40	1040	SteelSeries Gaming Headset	<p>High-quality gaming headset with surround sound.</p>	99.99	t	1	4	15
\N	\N	dev@mail.to	1723015494164	36	1036	Google Nest Hub	<p>Smart display with Google Assistant for smart home control.</p>	129.99	t	1	18	19
\N	\N	dev@mail.to	1723015589777	32	1032	EVGA 650W PSU	<p>Reliable power supply unit for mid-range gaming PCs.</p>	89.99	t	1	14	23
\N	\N	dev@mail.to	1723015670197	28	1028	WD 2TB External HDD	<p>Portable 2TB external hard drive for data backup and storage.</p>	89.99	t	1	10	27
\N	\N	dev@mail.to	1723015783346	23	1023	HP Envy Desktop	<p>Powerful desktop computer for home and office use.</p>	699.99	t	1	5	32
\N	\N	dev@mail.to	1723015884882	20	1020	Brother All-in-One Printer	<p>Multifunction printer with scanning and copying capabilities.</p>	249.99	t	1	2	35
\N	\N	dev@mail.to	1723015981009	15	1015	Dell PowerEdge Server	<p>Enterprise-grade server with scalable performance.</p>	1299.99	t	1	15	40
\N	\N	dev@mail.to	1723016089895	10	1010	Seagate 1TB HDD	<p>Reliable 1TB hard drive for desktop and laptop storage.</p>	49.99	t	1	10	45
\N	\N	dev@mail.to	1723016158089	6	1006	Samsung 24" Monitor	<p>Full HD monitor with vibrant colors and slim design.</p>	149.99	t	1	6	49
\N	\N	dev@mail.to	1723016264509	1	1001	Dell XPS 13	<p>High performance laptop with a sleek design.</p>	999.99	t	1	1	54
\.


--
-- TOC entry 3936 (class 0 OID 16681)
-- Dependencies: 299
-- Data for Name: item_file; Type: TABLE DATA; Schema: items; Owner: postgres
--

COPY items.item_file (creation_user, creation_time, modification_user, modification_time, id, item_id, file_id) FROM stdin;
\.


--
-- TOC entry 3939 (class 0 OID 16688)
-- Dependencies: 302
-- Data for Name: stock; Type: TABLE DATA; Schema: items; Owner: postgres
--

COPY items.stock (creation_user, creation_time, modification_user, modification_time, id, quantity, item_id, store_id) FROM stdin;
\.


--
-- TOC entry 3940 (class 0 OID 16694)
-- Dependencies: 303
-- Data for Name: stock_count; Type: TABLE DATA; Schema: items; Owner: postgres
--

COPY items.stock_count (creation_user, creation_time, modification_user, modification_time, id, date, file_id) FROM stdin;
\.


--
-- TOC entry 3943 (class 0 OID 16702)
-- Dependencies: 306
-- Data for Name: stock_log; Type: TABLE DATA; Schema: items; Owner: postgres
--

COPY items.stock_log (creation_user, creation_time, modification_user, modification_time, id, date, type, document_name, document_operation, customer_name, description, quantity, previous_stock, item_id, store_id, aux_store_id, stock_line_id, store_transfer_line_id, stock_count_id) FROM stdin;
\.


--
-- TOC entry 3945 (class 0 OID 16712)
-- Dependencies: 308
-- Data for Name: store; Type: TABLE DATA; Schema: items; Owner: postgres
--

COPY items.store (creation_user, creation_time, modification_user, modification_time, id, name, is_default) FROM stdin;
\.


--
-- TOC entry 3947 (class 0 OID 16719)
-- Dependencies: 310
-- Data for Name: store_transfer; Type: TABLE DATA; Schema: items; Owner: postgres
--

COPY items.store_transfer (creation_user, creation_time, modification_user, modification_time, id, date, source_store_id, target_store_id) FROM stdin;
\.


--
-- TOC entry 3949 (class 0 OID 16726)
-- Dependencies: 312
-- Data for Name: store_transfer_line; Type: TABLE DATA; Schema: items; Owner: postgres
--

COPY items.store_transfer_line (creation_user, creation_time, modification_user, modification_time, id, quantity, item_id, store_transfer_id) FROM stdin;
\.


--
-- TOC entry 3863 (class 0 OID 16432)
-- Dependencies: 226
-- Data for Name: meta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.meta (creation_user, creation_time, modification_user, modification_time) FROM stdin;
\.


--
-- TOC entry 3870 (class 0 OID 16456)
-- Dependencies: 233
-- Data for Name: address_template; Type: TABLE DATA; Schema: templates; Owner: postgres
--

COPY templates.address_template (zip_code, state, city, area, street_name, street_number, floor, door, block, coordinates, additional_data, street_suffix_id, country_id) FROM stdin;
\.


--
-- TOC entry 3894 (class 0 OID 16542)
-- Dependencies: 257
-- Data for Name: contact_template; Type: TABLE DATA; Schema: templates; Owner: postgres
--

COPY templates.contact_template (phone1, phone2, email, fax) FROM stdin;
\.


--
-- TOC entry 3912 (class 0 OID 16600)
-- Dependencies: 275
-- Data for Name: document_line_template; Type: TABLE DATA; Schema: templates; Owner: postgres
--

COPY templates.document_line_template ("order", item_code, item_name, base_price, quantity, discount, total_base, tax_id, item_id, store_id) FROM stdin;
\.


--
-- TOC entry 3907 (class 0 OID 16583)
-- Dependencies: 270
-- Data for Name: document_template; Type: TABLE DATA; Schema: templates; Owner: postgres
--

COPY templates.document_template (number, date, observations, total_base, total_taxes, total, customer_id, series_id, fiscal_year_id) FROM stdin;
\.


--
-- TOC entry 3883 (class 0 OID 16502)
-- Dependencies: 246
-- Data for Name: legal_data_template; Type: TABLE DATA; Schema: templates; Owner: postgres
--

COPY templates.legal_data_template (legal_name, document_number, identity_document_type_id) FROM stdin;
\.


--
-- TOC entry 3951 (class 0 OID 16732)
-- Dependencies: 314
-- Data for Name: aoc_user; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.aoc_user (creation_user, creation_time, modification_user, modification_time, id, username, email, pass, full_name) FROM stdin;
\N	\N	\N	\N	1	dev	dev@mail.to	$2a$06$pNvzH.eF7yeiE9vk7PuNTu.NIx3kFS5IBOtFzM201Ho/7EhclCvL6	\N
\.


--
-- TOC entry 4002 (class 0 OID 0)
-- Dependencies: 228
-- Name: invoice_payment_id_seq; Type: SEQUENCE SET; Schema: accounting; Owner: postgres
--

SELECT pg_catalog.setval('accounting.invoice_payment_id_seq', 2, true);


--
-- TOC entry 4003 (class 0 OID 0)
-- Dependencies: 230
-- Name: payment_id_seq; Type: SEQUENCE SET; Schema: accounting; Owner: postgres
--

SELECT pg_catalog.setval('accounting.payment_id_seq', 2, true);


--
-- TOC entry 4004 (class 0 OID 0)
-- Dependencies: 232
-- Name: ticket_payment_id_seq; Type: SEQUENCE SET; Schema: accounting; Owner: postgres
--

SELECT pg_catalog.setval('accounting.ticket_payment_id_seq', 1, false);


--
-- TOC entry 4005 (class 0 OID 0)
-- Dependencies: 235
-- Name: address_id_seq; Type: SEQUENCE SET; Schema: common; Owner: postgres
--

SELECT pg_catalog.setval('common.address_id_seq', 6, true);


--
-- TOC entry 4006 (class 0 OID 0)
-- Dependencies: 237
-- Name: country_id_seq; Type: SEQUENCE SET; Schema: common; Owner: postgres
--

SELECT pg_catalog.setval('common.country_id_seq', 45, true);


--
-- TOC entry 4007 (class 0 OID 0)
-- Dependencies: 239
-- Name: fiscal_year_id_seq; Type: SEQUENCE SET; Schema: common; Owner: postgres
--

SELECT pg_catalog.setval('common.fiscal_year_id_seq', 1, true);


--
-- TOC entry 4008 (class 0 OID 0)
-- Dependencies: 241
-- Name: gender_id_seq; Type: SEQUENCE SET; Schema: common; Owner: postgres
--

SELECT pg_catalog.setval('common.gender_id_seq', 3, true);


--
-- TOC entry 4009 (class 0 OID 0)
-- Dependencies: 243
-- Name: identity_document_type_id_seq; Type: SEQUENCE SET; Schema: common; Owner: postgres
--

SELECT pg_catalog.setval('common.identity_document_type_id_seq', 14, true);


--
-- TOC entry 4010 (class 0 OID 0)
-- Dependencies: 245
-- Name: language_id_seq; Type: SEQUENCE SET; Schema: common; Owner: postgres
--

SELECT pg_catalog.setval('common.language_id_seq', 10, true);


--
-- TOC entry 4011 (class 0 OID 0)
-- Dependencies: 248
-- Name: legal_data_id_seq; Type: SEQUENCE SET; Schema: common; Owner: postgres
--

SELECT pg_catalog.setval('common.legal_data_id_seq', 6, true);


--
-- TOC entry 4012 (class 0 OID 0)
-- Dependencies: 250
-- Name: payment_system_id_seq; Type: SEQUENCE SET; Schema: common; Owner: postgres
--

SELECT pg_catalog.setval('common.payment_system_id_seq', 5, true);


--
-- TOC entry 4013 (class 0 OID 0)
-- Dependencies: 252
-- Name: series_id_seq; Type: SEQUENCE SET; Schema: common; Owner: postgres
--

SELECT pg_catalog.setval('common.series_id_seq', 4, true);


--
-- TOC entry 4014 (class 0 OID 0)
-- Dependencies: 254
-- Name: street_suffix_id_seq; Type: SEQUENCE SET; Schema: common; Owner: postgres
--

SELECT pg_catalog.setval('common.street_suffix_id_seq', 204, true);


--
-- TOC entry 4015 (class 0 OID 0)
-- Dependencies: 256
-- Name: tax_id_seq; Type: SEQUENCE SET; Schema: common; Owner: postgres
--

SELECT pg_catalog.setval('common.tax_id_seq', 1, true);


--
-- TOC entry 4016 (class 0 OID 0)
-- Dependencies: 259
-- Name: company_id_seq; Type: SEQUENCE SET; Schema: configuration; Owner: postgres
--

SELECT pg_catalog.setval('configuration.company_id_seq', 1, false);


--
-- TOC entry 4017 (class 0 OID 0)
-- Dependencies: 261
-- Name: contact_id_seq; Type: SEQUENCE SET; Schema: contacts; Owner: postgres
--

SELECT pg_catalog.setval('contacts.contact_id_seq', 30, true);


--
-- TOC entry 4018 (class 0 OID 0)
-- Dependencies: 264
-- Name: customer_contact_id_seq; Type: SEQUENCE SET; Schema: customers; Owner: postgres
--

SELECT pg_catalog.setval('customers.customer_contact_id_seq', 30, true);


--
-- TOC entry 4019 (class 0 OID 0)
-- Dependencies: 266
-- Name: customer_file_id_seq; Type: SEQUENCE SET; Schema: customers; Owner: postgres
--

SELECT pg_catalog.setval('customers.customer_file_id_seq', 1, false);


--
-- TOC entry 4020 (class 0 OID 0)
-- Dependencies: 267
-- Name: customer_id_seq; Type: SEQUENCE SET; Schema: customers; Owner: postgres
--

SELECT pg_catalog.setval('customers.customer_id_seq', 30, true);


--
-- TOC entry 4021 (class 0 OID 0)
-- Dependencies: 269
-- Name: file_id_seq; Type: SEQUENCE SET; Schema: files; Owner: postgres
--

SELECT pg_catalog.setval('files.file_id_seq', 54, true);


--
-- TOC entry 4022 (class 0 OID 0)
-- Dependencies: 273
-- Name: budget_file_id_seq; Type: SEQUENCE SET; Schema: invoicing; Owner: postgres
--

SELECT pg_catalog.setval('invoicing.budget_file_id_seq', 1, false);


--
-- TOC entry 4023 (class 0 OID 0)
-- Dependencies: 274
-- Name: budget_id_seq; Type: SEQUENCE SET; Schema: invoicing; Owner: postgres
--

SELECT pg_catalog.setval('invoicing.budget_id_seq', 1, true);


--
-- TOC entry 4024 (class 0 OID 0)
-- Dependencies: 277
-- Name: budget_line_id_seq; Type: SEQUENCE SET; Schema: invoicing; Owner: postgres
--

SELECT pg_catalog.setval('invoicing.budget_line_id_seq', 1, true);


--
-- TOC entry 4025 (class 0 OID 0)
-- Dependencies: 280
-- Name: delivery_note_file_id_seq; Type: SEQUENCE SET; Schema: invoicing; Owner: postgres
--

SELECT pg_catalog.setval('invoicing.delivery_note_file_id_seq', 1, false);


--
-- TOC entry 4026 (class 0 OID 0)
-- Dependencies: 281
-- Name: delivery_note_id_seq; Type: SEQUENCE SET; Schema: invoicing; Owner: postgres
--

SELECT pg_catalog.setval('invoicing.delivery_note_id_seq', 3, true);


--
-- TOC entry 4027 (class 0 OID 0)
-- Dependencies: 283
-- Name: delivery_note_line_id_seq; Type: SEQUENCE SET; Schema: invoicing; Owner: postgres
--

SELECT pg_catalog.setval('invoicing.delivery_note_line_id_seq', 5, true);


--
-- TOC entry 4028 (class 0 OID 0)
-- Dependencies: 286
-- Name: invoice_file_id_seq; Type: SEQUENCE SET; Schema: invoicing; Owner: postgres
--

SELECT pg_catalog.setval('invoicing.invoice_file_id_seq', 1, false);


--
-- TOC entry 4029 (class 0 OID 0)
-- Dependencies: 287
-- Name: invoice_id_seq; Type: SEQUENCE SET; Schema: invoicing; Owner: postgres
--

SELECT pg_catalog.setval('invoicing.invoice_id_seq', 2, true);


--
-- TOC entry 4030 (class 0 OID 0)
-- Dependencies: 289
-- Name: stock_line_id_seq; Type: SEQUENCE SET; Schema: invoicing; Owner: postgres
--

SELECT pg_catalog.setval('invoicing.stock_line_id_seq', 8, true);


--
-- TOC entry 4031 (class 0 OID 0)
-- Dependencies: 292
-- Name: ticket_file_id_seq; Type: SEQUENCE SET; Schema: invoicing; Owner: postgres
--

SELECT pg_catalog.setval('invoicing.ticket_file_id_seq', 1, false);


--
-- TOC entry 4032 (class 0 OID 0)
-- Dependencies: 293
-- Name: ticket_id_seq; Type: SEQUENCE SET; Schema: invoicing; Owner: postgres
--

SELECT pg_catalog.setval('invoicing.ticket_id_seq', 3, true);


--
-- TOC entry 4033 (class 0 OID 0)
-- Dependencies: 295
-- Name: ticket_line_id_seq; Type: SEQUENCE SET; Schema: invoicing; Owner: postgres
--

SELECT pg_catalog.setval('invoicing.ticket_line_id_seq', 2, true);


--
-- TOC entry 4034 (class 0 OID 0)
-- Dependencies: 297
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: items; Owner: postgres
--

SELECT pg_catalog.setval('items.category_id_seq', 18, true);


--
-- TOC entry 4035 (class 0 OID 0)
-- Dependencies: 300
-- Name: item_file_id_seq; Type: SEQUENCE SET; Schema: items; Owner: postgres
--

SELECT pg_catalog.setval('items.item_file_id_seq', 1, false);


--
-- TOC entry 4036 (class 0 OID 0)
-- Dependencies: 301
-- Name: item_id_seq; Type: SEQUENCE SET; Schema: items; Owner: postgres
--

SELECT pg_catalog.setval('items.item_id_seq', 54, true);


--
-- TOC entry 4037 (class 0 OID 0)
-- Dependencies: 304
-- Name: stock_count_id_seq; Type: SEQUENCE SET; Schema: items; Owner: postgres
--

SELECT pg_catalog.setval('items.stock_count_id_seq', 1, false);


--
-- TOC entry 4038 (class 0 OID 0)
-- Dependencies: 305
-- Name: stock_id_seq; Type: SEQUENCE SET; Schema: items; Owner: postgres
--

SELECT pg_catalog.setval('items.stock_id_seq', 1, false);


--
-- TOC entry 4039 (class 0 OID 0)
-- Dependencies: 307
-- Name: stock_log_id_seq; Type: SEQUENCE SET; Schema: items; Owner: postgres
--

SELECT pg_catalog.setval('items.stock_log_id_seq', 1, false);


--
-- TOC entry 4040 (class 0 OID 0)
-- Dependencies: 309
-- Name: store_id_seq; Type: SEQUENCE SET; Schema: items; Owner: postgres
--

SELECT pg_catalog.setval('items.store_id_seq', 1, false);


--
-- TOC entry 4041 (class 0 OID 0)
-- Dependencies: 311
-- Name: store_transfer_id_seq; Type: SEQUENCE SET; Schema: items; Owner: postgres
--

SELECT pg_catalog.setval('items.store_transfer_id_seq', 1, false);


--
-- TOC entry 4042 (class 0 OID 0)
-- Dependencies: 313
-- Name: store_transfer_line_id_seq; Type: SEQUENCE SET; Schema: items; Owner: postgres
--

SELECT pg_catalog.setval('items.store_transfer_line_id_seq', 1, false);


--
-- TOC entry 4043 (class 0 OID 0)
-- Dependencies: 315
-- Name: aoc_user_id_seq; Type: SEQUENCE SET; Schema: users; Owner: postgres
--

SELECT pg_catalog.setval('users.aoc_user_id_seq', 1, true);


--
-- TOC entry 3546 (class 2606 OID 16783)
-- Name: invoice_payment invoice_payment_pkey; Type: CONSTRAINT; Schema: accounting; Owner: postgres
--

ALTER TABLE ONLY accounting.invoice_payment
    ADD CONSTRAINT invoice_payment_pkey PRIMARY KEY (id);


--
-- TOC entry 3548 (class 2606 OID 16785)
-- Name: payment payment_pkey; Type: CONSTRAINT; Schema: accounting; Owner: postgres
--

ALTER TABLE ONLY accounting.payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (id);


--
-- TOC entry 3550 (class 2606 OID 16787)
-- Name: ticket_payment ticket_payment_pkey; Type: CONSTRAINT; Schema: accounting; Owner: postgres
--

ALTER TABLE ONLY accounting.ticket_payment
    ADD CONSTRAINT ticket_payment_pkey PRIMARY KEY (id);


--
-- TOC entry 3552 (class 2606 OID 16789)
-- Name: address address_pkey; Type: CONSTRAINT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (id);


--
-- TOC entry 3554 (class 2606 OID 16791)
-- Name: country country_pkey; Type: CONSTRAINT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (id);


--
-- TOC entry 3556 (class 2606 OID 16793)
-- Name: fiscal_year fiscal_year_pkey; Type: CONSTRAINT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.fiscal_year
    ADD CONSTRAINT fiscal_year_pkey PRIMARY KEY (id);


--
-- TOC entry 3558 (class 2606 OID 16795)
-- Name: gender gender_pkey; Type: CONSTRAINT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.gender
    ADD CONSTRAINT gender_pkey PRIMARY KEY (id);


--
-- TOC entry 3560 (class 2606 OID 16797)
-- Name: identity_document_type identity_document_type_pkey; Type: CONSTRAINT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.identity_document_type
    ADD CONSTRAINT identity_document_type_pkey PRIMARY KEY (id);


--
-- TOC entry 3562 (class 2606 OID 16799)
-- Name: language language_pkey; Type: CONSTRAINT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.language
    ADD CONSTRAINT language_pkey PRIMARY KEY (id);


--
-- TOC entry 3564 (class 2606 OID 16801)
-- Name: legal_data legal_data_pkey; Type: CONSTRAINT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.legal_data
    ADD CONSTRAINT legal_data_pkey PRIMARY KEY (id);


--
-- TOC entry 3566 (class 2606 OID 16803)
-- Name: payment_system payment_system_pkey; Type: CONSTRAINT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.payment_system
    ADD CONSTRAINT payment_system_pkey PRIMARY KEY (id);


--
-- TOC entry 3568 (class 2606 OID 16805)
-- Name: series series_name_key; Type: CONSTRAINT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.series
    ADD CONSTRAINT series_name_key UNIQUE (name);


--
-- TOC entry 3570 (class 2606 OID 16807)
-- Name: series series_pkey; Type: CONSTRAINT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.series
    ADD CONSTRAINT series_pkey PRIMARY KEY (id);


--
-- TOC entry 3572 (class 2606 OID 16809)
-- Name: street_suffix street_suffix_pkey; Type: CONSTRAINT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.street_suffix
    ADD CONSTRAINT street_suffix_pkey PRIMARY KEY (id);


--
-- TOC entry 3574 (class 2606 OID 16811)
-- Name: tax tax_pkey; Type: CONSTRAINT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.tax
    ADD CONSTRAINT tax_pkey PRIMARY KEY (id);


--
-- TOC entry 3576 (class 2606 OID 16813)
-- Name: company company_pkey; Type: CONSTRAINT; Schema: configuration; Owner: postgres
--

ALTER TABLE ONLY configuration.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);


--
-- TOC entry 3578 (class 2606 OID 16815)
-- Name: contact contact_pkey; Type: CONSTRAINT; Schema: contacts; Owner: postgres
--

ALTER TABLE ONLY contacts.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (id);


--
-- TOC entry 3580 (class 2606 OID 16817)
-- Name: customer customer_code_key; Type: CONSTRAINT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.customer
    ADD CONSTRAINT customer_code_key UNIQUE (code);


--
-- TOC entry 3584 (class 2606 OID 16819)
-- Name: customer_contact customer_contact_pkey; Type: CONSTRAINT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.customer_contact
    ADD CONSTRAINT customer_contact_pkey PRIMARY KEY (id);


--
-- TOC entry 3586 (class 2606 OID 16821)
-- Name: customer_file customer_file_pkey; Type: CONSTRAINT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.customer_file
    ADD CONSTRAINT customer_file_pkey PRIMARY KEY (id);


--
-- TOC entry 3582 (class 2606 OID 16823)
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id);


--
-- TOC entry 3588 (class 2606 OID 16825)
-- Name: file file_pkey; Type: CONSTRAINT; Schema: files; Owner: postgres
--

ALTER TABLE ONLY files.file
    ADD CONSTRAINT file_pkey PRIMARY KEY (id);


--
-- TOC entry 3592 (class 2606 OID 16827)
-- Name: budget_file budget_file_pkey; Type: CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.budget_file
    ADD CONSTRAINT budget_file_pkey PRIMARY KEY (id);


--
-- TOC entry 3594 (class 2606 OID 16829)
-- Name: budget_line budget_line_pkey; Type: CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.budget_line
    ADD CONSTRAINT budget_line_pkey PRIMARY KEY (id);


--
-- TOC entry 3590 (class 2606 OID 16831)
-- Name: budget budget_pkey; Type: CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.budget
    ADD CONSTRAINT budget_pkey PRIMARY KEY (id);


--
-- TOC entry 3598 (class 2606 OID 16833)
-- Name: delivery_note_file delivery_note_file_pkey; Type: CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.delivery_note_file
    ADD CONSTRAINT delivery_note_file_pkey PRIMARY KEY (id);


--
-- TOC entry 3600 (class 2606 OID 16835)
-- Name: delivery_note_line delivery_note_line_pkey; Type: CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.delivery_note_line
    ADD CONSTRAINT delivery_note_line_pkey PRIMARY KEY (id);


--
-- TOC entry 3596 (class 2606 OID 16837)
-- Name: delivery_note delivery_note_pkey; Type: CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.delivery_note
    ADD CONSTRAINT delivery_note_pkey PRIMARY KEY (id);


--
-- TOC entry 3604 (class 2606 OID 16839)
-- Name: invoice_file invoice_file_pkey; Type: CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.invoice_file
    ADD CONSTRAINT invoice_file_pkey PRIMARY KEY (id);


--
-- TOC entry 3602 (class 2606 OID 16841)
-- Name: invoice invoice_pkey; Type: CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.invoice
    ADD CONSTRAINT invoice_pkey PRIMARY KEY (id);


--
-- TOC entry 3606 (class 2606 OID 16843)
-- Name: stock_line stock_line_pkey; Type: CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.stock_line
    ADD CONSTRAINT stock_line_pkey PRIMARY KEY (id);


--
-- TOC entry 3610 (class 2606 OID 16845)
-- Name: ticket_file ticket_file_pkey; Type: CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.ticket_file
    ADD CONSTRAINT ticket_file_pkey PRIMARY KEY (id);


--
-- TOC entry 3612 (class 2606 OID 16847)
-- Name: ticket_line ticket_line_pkey; Type: CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.ticket_line
    ADD CONSTRAINT ticket_line_pkey PRIMARY KEY (id);


--
-- TOC entry 3608 (class 2606 OID 16849)
-- Name: ticket ticket_pkey; Type: CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.ticket
    ADD CONSTRAINT ticket_pkey PRIMARY KEY (id);


--
-- TOC entry 3614 (class 2606 OID 16851)
-- Name: category category_pkey; Type: CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- TOC entry 3618 (class 2606 OID 16853)
-- Name: item_file item_file_pkey; Type: CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.item_file
    ADD CONSTRAINT item_file_pkey PRIMARY KEY (id);


--
-- TOC entry 3616 (class 2606 OID 16855)
-- Name: item item_pkey; Type: CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id);


--
-- TOC entry 3622 (class 2606 OID 16857)
-- Name: stock_count stock_count_pkey; Type: CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.stock_count
    ADD CONSTRAINT stock_count_pkey PRIMARY KEY (id);


--
-- TOC entry 3624 (class 2606 OID 16859)
-- Name: stock_log stock_log_pkey; Type: CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.stock_log
    ADD CONSTRAINT stock_log_pkey PRIMARY KEY (id);


--
-- TOC entry 3620 (class 2606 OID 16861)
-- Name: stock stock_pkey; Type: CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.stock
    ADD CONSTRAINT stock_pkey PRIMARY KEY (id);


--
-- TOC entry 3626 (class 2606 OID 16863)
-- Name: store store_pkey; Type: CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.store
    ADD CONSTRAINT store_pkey PRIMARY KEY (id);


--
-- TOC entry 3630 (class 2606 OID 16865)
-- Name: store_transfer_line store_transfer_line_pkey; Type: CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.store_transfer_line
    ADD CONSTRAINT store_transfer_line_pkey PRIMARY KEY (id);


--
-- TOC entry 3628 (class 2606 OID 16867)
-- Name: store_transfer store_transfer_pkey; Type: CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.store_transfer
    ADD CONSTRAINT store_transfer_pkey PRIMARY KEY (id);


--
-- TOC entry 3632 (class 2606 OID 16869)
-- Name: aoc_user aoc_user_pkey; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.aoc_user
    ADD CONSTRAINT aoc_user_pkey PRIMARY KEY (id);


--
-- TOC entry 3633 (class 2606 OID 16870)
-- Name: invoice_payment invoice_payment_invoice_id_fkey; Type: FK CONSTRAINT; Schema: accounting; Owner: postgres
--

ALTER TABLE ONLY accounting.invoice_payment
    ADD CONSTRAINT invoice_payment_invoice_id_fkey FOREIGN KEY (invoice_id) REFERENCES invoicing.invoice(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3634 (class 2606 OID 16875)
-- Name: invoice_payment invoice_payment_payment_id_fkey; Type: FK CONSTRAINT; Schema: accounting; Owner: postgres
--

ALTER TABLE ONLY accounting.invoice_payment
    ADD CONSTRAINT invoice_payment_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES accounting.payment(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3635 (class 2606 OID 16880)
-- Name: payment payment_payment_system_id_fkey; Type: FK CONSTRAINT; Schema: accounting; Owner: postgres
--

ALTER TABLE ONLY accounting.payment
    ADD CONSTRAINT payment_payment_system_id_fkey FOREIGN KEY (payment_system_id) REFERENCES common.payment_system(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3636 (class 2606 OID 16885)
-- Name: ticket_payment ticket_payment_payment_id_fkey; Type: FK CONSTRAINT; Schema: accounting; Owner: postgres
--

ALTER TABLE ONLY accounting.ticket_payment
    ADD CONSTRAINT ticket_payment_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES accounting.payment(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3637 (class 2606 OID 16890)
-- Name: ticket_payment ticket_payment_ticket_id_fkey; Type: FK CONSTRAINT; Schema: accounting; Owner: postgres
--

ALTER TABLE ONLY accounting.ticket_payment
    ADD CONSTRAINT ticket_payment_ticket_id_fkey FOREIGN KEY (ticket_id) REFERENCES invoicing.ticket(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3640 (class 2606 OID 16895)
-- Name: address address_country_id_fkey; Type: FK CONSTRAINT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.address
    ADD CONSTRAINT address_country_id_fkey FOREIGN KEY (country_id) REFERENCES common.country(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3641 (class 2606 OID 16900)
-- Name: address address_street_suffix_id_fkey; Type: FK CONSTRAINT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.address
    ADD CONSTRAINT address_street_suffix_id_fkey FOREIGN KEY (street_suffix_id) REFERENCES common.street_suffix(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3643 (class 2606 OID 16905)
-- Name: legal_data legal_data_identity_document_type_id_fkey; Type: FK CONSTRAINT; Schema: common; Owner: postgres
--

ALTER TABLE ONLY common.legal_data
    ADD CONSTRAINT legal_data_identity_document_type_id_fkey FOREIGN KEY (identity_document_type_id) REFERENCES common.identity_document_type(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3644 (class 2606 OID 16910)
-- Name: company company_country_id_fkey; Type: FK CONSTRAINT; Schema: configuration; Owner: postgres
--

ALTER TABLE ONLY configuration.company
    ADD CONSTRAINT company_country_id_fkey FOREIGN KEY (country_id) REFERENCES common.country(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3645 (class 2606 OID 16915)
-- Name: company company_identity_document_type_id_fkey; Type: FK CONSTRAINT; Schema: configuration; Owner: postgres
--

ALTER TABLE ONLY configuration.company
    ADD CONSTRAINT company_identity_document_type_id_fkey FOREIGN KEY (identity_document_type_id) REFERENCES common.identity_document_type(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3646 (class 2606 OID 16920)
-- Name: company company_street_suffix_id_fkey; Type: FK CONSTRAINT; Schema: configuration; Owner: postgres
--

ALTER TABLE ONLY configuration.company
    ADD CONSTRAINT company_street_suffix_id_fkey FOREIGN KEY (street_suffix_id) REFERENCES common.street_suffix(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3652 (class 2606 OID 16925)
-- Name: customer_contact customer_contact_contact_id_fkey; Type: FK CONSTRAINT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.customer_contact
    ADD CONSTRAINT customer_contact_contact_id_fkey FOREIGN KEY (contact_id) REFERENCES contacts.contact(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3653 (class 2606 OID 16930)
-- Name: customer_contact customer_contact_customer_id_fkey; Type: FK CONSTRAINT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.customer_contact
    ADD CONSTRAINT customer_contact_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customers.customer(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3647 (class 2606 OID 16935)
-- Name: customer customer_country_id_fkey; Type: FK CONSTRAINT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.customer
    ADD CONSTRAINT customer_country_id_fkey FOREIGN KEY (country_id) REFERENCES common.country(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3654 (class 2606 OID 16940)
-- Name: customer_file customer_file_customer_id_fkey; Type: FK CONSTRAINT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.customer_file
    ADD CONSTRAINT customer_file_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customers.customer(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3655 (class 2606 OID 16945)
-- Name: customer_file customer_file_file_id_fkey; Type: FK CONSTRAINT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.customer_file
    ADD CONSTRAINT customer_file_file_id_fkey FOREIGN KEY (file_id) REFERENCES files.file(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3648 (class 2606 OID 16950)
-- Name: customer customer_gender_id_fkey; Type: FK CONSTRAINT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.customer
    ADD CONSTRAINT customer_gender_id_fkey FOREIGN KEY (gender_id) REFERENCES common.gender(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3649 (class 2606 OID 16955)
-- Name: customer customer_identity_document_type_id_fkey; Type: FK CONSTRAINT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.customer
    ADD CONSTRAINT customer_identity_document_type_id_fkey FOREIGN KEY (identity_document_type_id) REFERENCES common.identity_document_type(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3650 (class 2606 OID 16960)
-- Name: customer customer_language_id_fkey; Type: FK CONSTRAINT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.customer
    ADD CONSTRAINT customer_language_id_fkey FOREIGN KEY (language_id) REFERENCES common.language(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3651 (class 2606 OID 16965)
-- Name: customer customer_street_suffix_id_fkey; Type: FK CONSTRAINT; Schema: customers; Owner: postgres
--

ALTER TABLE ONLY customers.customer
    ADD CONSTRAINT customer_street_suffix_id_fkey FOREIGN KEY (street_suffix_id) REFERENCES common.street_suffix(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3659 (class 2606 OID 16970)
-- Name: budget budget_customer_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.budget
    ADD CONSTRAINT budget_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customers.customer(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3662 (class 2606 OID 16975)
-- Name: budget_file budget_file_budget_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.budget_file
    ADD CONSTRAINT budget_file_budget_id_fkey FOREIGN KEY (budget_id) REFERENCES invoicing.budget(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3663 (class 2606 OID 16980)
-- Name: budget_file budget_file_file_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.budget_file
    ADD CONSTRAINT budget_file_file_id_fkey FOREIGN KEY (file_id) REFERENCES files.file(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3660 (class 2606 OID 16985)
-- Name: budget budget_fiscal_year_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.budget
    ADD CONSTRAINT budget_fiscal_year_id_fkey FOREIGN KEY (fiscal_year_id) REFERENCES common.fiscal_year(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3667 (class 2606 OID 16990)
-- Name: budget_line budget_line_budget_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.budget_line
    ADD CONSTRAINT budget_line_budget_id_fkey FOREIGN KEY (budget_id) REFERENCES invoicing.budget(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3668 (class 2606 OID 16995)
-- Name: budget_line budget_line_item_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.budget_line
    ADD CONSTRAINT budget_line_item_id_fkey FOREIGN KEY (item_id) REFERENCES items.item(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3669 (class 2606 OID 17000)
-- Name: budget_line budget_line_store_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.budget_line
    ADD CONSTRAINT budget_line_store_id_fkey FOREIGN KEY (store_id) REFERENCES items.store(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3670 (class 2606 OID 17005)
-- Name: budget_line budget_line_tax_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.budget_line
    ADD CONSTRAINT budget_line_tax_id_fkey FOREIGN KEY (tax_id) REFERENCES common.tax(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3661 (class 2606 OID 17010)
-- Name: budget budget_series_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.budget
    ADD CONSTRAINT budget_series_id_fkey FOREIGN KEY (series_id) REFERENCES common.series(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3671 (class 2606 OID 17015)
-- Name: delivery_note delivery_note_customer_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.delivery_note
    ADD CONSTRAINT delivery_note_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customers.customer(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3675 (class 2606 OID 17020)
-- Name: delivery_note_file delivery_note_file_delivery_note_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.delivery_note_file
    ADD CONSTRAINT delivery_note_file_delivery_note_id_fkey FOREIGN KEY (delivery_note_id) REFERENCES invoicing.delivery_note(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3676 (class 2606 OID 17025)
-- Name: delivery_note_file delivery_note_file_file_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.delivery_note_file
    ADD CONSTRAINT delivery_note_file_file_id_fkey FOREIGN KEY (file_id) REFERENCES files.file(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3672 (class 2606 OID 17030)
-- Name: delivery_note delivery_note_fiscal_year_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.delivery_note
    ADD CONSTRAINT delivery_note_fiscal_year_id_fkey FOREIGN KEY (fiscal_year_id) REFERENCES common.fiscal_year(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3673 (class 2606 OID 17035)
-- Name: delivery_note delivery_note_invoice_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.delivery_note
    ADD CONSTRAINT delivery_note_invoice_id_fkey FOREIGN KEY (invoice_id) REFERENCES invoicing.invoice(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3677 (class 2606 OID 17040)
-- Name: delivery_note_line delivery_note_line_delivery_note_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.delivery_note_line
    ADD CONSTRAINT delivery_note_line_delivery_note_id_fkey FOREIGN KEY (delivery_note_id) REFERENCES invoicing.delivery_note(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3678 (class 2606 OID 17045)
-- Name: delivery_note_line delivery_note_line_stock_line_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.delivery_note_line
    ADD CONSTRAINT delivery_note_line_stock_line_id_fkey FOREIGN KEY (stock_line_id) REFERENCES invoicing.stock_line(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3674 (class 2606 OID 17050)
-- Name: delivery_note delivery_note_series_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.delivery_note
    ADD CONSTRAINT delivery_note_series_id_fkey FOREIGN KEY (series_id) REFERENCES common.series(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3679 (class 2606 OID 17055)
-- Name: invoice invoice_company_address_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.invoice
    ADD CONSTRAINT invoice_company_address_id_fkey FOREIGN KEY (company_address_id) REFERENCES common.address(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3680 (class 2606 OID 17060)
-- Name: invoice invoice_company_legal_data_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.invoice
    ADD CONSTRAINT invoice_company_legal_data_id_fkey FOREIGN KEY (company_legal_data_id) REFERENCES common.legal_data(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3681 (class 2606 OID 17065)
-- Name: invoice invoice_customer_address_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.invoice
    ADD CONSTRAINT invoice_customer_address_id_fkey FOREIGN KEY (customer_address_id) REFERENCES common.address(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3682 (class 2606 OID 17070)
-- Name: invoice invoice_customer_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.invoice
    ADD CONSTRAINT invoice_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customers.customer(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3683 (class 2606 OID 17075)
-- Name: invoice invoice_customer_legal_data_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.invoice
    ADD CONSTRAINT invoice_customer_legal_data_id_fkey FOREIGN KEY (customer_legal_data_id) REFERENCES common.legal_data(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3686 (class 2606 OID 17080)
-- Name: invoice_file invoice_file_file_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.invoice_file
    ADD CONSTRAINT invoice_file_file_id_fkey FOREIGN KEY (file_id) REFERENCES files.file(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3687 (class 2606 OID 17085)
-- Name: invoice_file invoice_file_invoice_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.invoice_file
    ADD CONSTRAINT invoice_file_invoice_id_fkey FOREIGN KEY (invoice_id) REFERENCES invoicing.invoice(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3684 (class 2606 OID 17090)
-- Name: invoice invoice_fiscal_year_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.invoice
    ADD CONSTRAINT invoice_fiscal_year_id_fkey FOREIGN KEY (fiscal_year_id) REFERENCES common.fiscal_year(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3685 (class 2606 OID 17095)
-- Name: invoice invoice_series_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.invoice
    ADD CONSTRAINT invoice_series_id_fkey FOREIGN KEY (series_id) REFERENCES common.series(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3688 (class 2606 OID 17100)
-- Name: stock_line stock_line_item_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.stock_line
    ADD CONSTRAINT stock_line_item_id_fkey FOREIGN KEY (item_id) REFERENCES items.item(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3689 (class 2606 OID 17105)
-- Name: stock_line stock_line_store_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.stock_line
    ADD CONSTRAINT stock_line_store_id_fkey FOREIGN KEY (store_id) REFERENCES items.store(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3690 (class 2606 OID 17110)
-- Name: stock_line stock_line_tax_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.stock_line
    ADD CONSTRAINT stock_line_tax_id_fkey FOREIGN KEY (tax_id) REFERENCES common.tax(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3691 (class 2606 OID 17115)
-- Name: ticket ticket_company_address_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.ticket
    ADD CONSTRAINT ticket_company_address_id_fkey FOREIGN KEY (company_address_id) REFERENCES common.address(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3692 (class 2606 OID 17120)
-- Name: ticket ticket_company_legal_data_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.ticket
    ADD CONSTRAINT ticket_company_legal_data_id_fkey FOREIGN KEY (company_legal_data_id) REFERENCES common.legal_data(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3693 (class 2606 OID 17125)
-- Name: ticket ticket_customer_address_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.ticket
    ADD CONSTRAINT ticket_customer_address_id_fkey FOREIGN KEY (customer_address_id) REFERENCES common.address(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3694 (class 2606 OID 17130)
-- Name: ticket ticket_customer_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.ticket
    ADD CONSTRAINT ticket_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customers.customer(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3695 (class 2606 OID 17135)
-- Name: ticket ticket_customer_legal_data_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.ticket
    ADD CONSTRAINT ticket_customer_legal_data_id_fkey FOREIGN KEY (customer_legal_data_id) REFERENCES common.legal_data(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3698 (class 2606 OID 17140)
-- Name: ticket_file ticket_file_file_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.ticket_file
    ADD CONSTRAINT ticket_file_file_id_fkey FOREIGN KEY (file_id) REFERENCES files.file(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3699 (class 2606 OID 17145)
-- Name: ticket_file ticket_file_ticket_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.ticket_file
    ADD CONSTRAINT ticket_file_ticket_id_fkey FOREIGN KEY (ticket_id) REFERENCES invoicing.ticket(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3696 (class 2606 OID 17150)
-- Name: ticket ticket_fiscal_year_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.ticket
    ADD CONSTRAINT ticket_fiscal_year_id_fkey FOREIGN KEY (fiscal_year_id) REFERENCES common.fiscal_year(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3700 (class 2606 OID 17155)
-- Name: ticket_line ticket_line_stock_line_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.ticket_line
    ADD CONSTRAINT ticket_line_stock_line_id_fkey FOREIGN KEY (stock_line_id) REFERENCES invoicing.stock_line(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3701 (class 2606 OID 17160)
-- Name: ticket_line ticket_line_ticket_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.ticket_line
    ADD CONSTRAINT ticket_line_ticket_id_fkey FOREIGN KEY (ticket_id) REFERENCES invoicing.ticket(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3697 (class 2606 OID 17165)
-- Name: ticket ticket_series_id_fkey; Type: FK CONSTRAINT; Schema: invoicing; Owner: postgres
--

ALTER TABLE ONLY invoicing.ticket
    ADD CONSTRAINT ticket_series_id_fkey FOREIGN KEY (series_id) REFERENCES common.series(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3702 (class 2606 OID 17170)
-- Name: item item_category_id_fkey; Type: FK CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.item
    ADD CONSTRAINT item_category_id_fkey FOREIGN KEY (category_id) REFERENCES items.category(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3705 (class 2606 OID 17175)
-- Name: item_file item_file_file_id_fkey; Type: FK CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.item_file
    ADD CONSTRAINT item_file_file_id_fkey FOREIGN KEY (file_id) REFERENCES files.file(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3706 (class 2606 OID 17180)
-- Name: item_file item_file_item_id_fkey; Type: FK CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.item_file
    ADD CONSTRAINT item_file_item_id_fkey FOREIGN KEY (item_id) REFERENCES items.item(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3703 (class 2606 OID 17185)
-- Name: item item_photo_id_fkey; Type: FK CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.item
    ADD CONSTRAINT item_photo_id_fkey FOREIGN KEY (photo_id) REFERENCES files.file(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3704 (class 2606 OID 17190)
-- Name: item item_tax_id_fkey; Type: FK CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.item
    ADD CONSTRAINT item_tax_id_fkey FOREIGN KEY (tax_id) REFERENCES common.tax(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3709 (class 2606 OID 17195)
-- Name: stock_count stock_count_file_id_fkey; Type: FK CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.stock_count
    ADD CONSTRAINT stock_count_file_id_fkey FOREIGN KEY (file_id) REFERENCES files.file(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3707 (class 2606 OID 17200)
-- Name: stock stock_item_id_fkey; Type: FK CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.stock
    ADD CONSTRAINT stock_item_id_fkey FOREIGN KEY (item_id) REFERENCES items.item(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3710 (class 2606 OID 17205)
-- Name: stock_log stock_log_aux_store_id_fkey; Type: FK CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.stock_log
    ADD CONSTRAINT stock_log_aux_store_id_fkey FOREIGN KEY (aux_store_id) REFERENCES items.store(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3711 (class 2606 OID 17210)
-- Name: stock_log stock_log_item_id_fkey; Type: FK CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.stock_log
    ADD CONSTRAINT stock_log_item_id_fkey FOREIGN KEY (item_id) REFERENCES items.item(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3712 (class 2606 OID 17215)
-- Name: stock_log stock_log_stock_count_id_fkey; Type: FK CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.stock_log
    ADD CONSTRAINT stock_log_stock_count_id_fkey FOREIGN KEY (stock_count_id) REFERENCES items.stock_count(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3713 (class 2606 OID 17220)
-- Name: stock_log stock_log_stock_line_id_fkey; Type: FK CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.stock_log
    ADD CONSTRAINT stock_log_stock_line_id_fkey FOREIGN KEY (stock_line_id) REFERENCES invoicing.stock_line(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3714 (class 2606 OID 17225)
-- Name: stock_log stock_log_store_id_fkey; Type: FK CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.stock_log
    ADD CONSTRAINT stock_log_store_id_fkey FOREIGN KEY (store_id) REFERENCES items.store(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3715 (class 2606 OID 17230)
-- Name: stock_log stock_log_store_transfer_line_id_fkey; Type: FK CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.stock_log
    ADD CONSTRAINT stock_log_store_transfer_line_id_fkey FOREIGN KEY (store_transfer_line_id) REFERENCES items.store_transfer_line(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3708 (class 2606 OID 17235)
-- Name: stock stock_store_id_fkey; Type: FK CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.stock
    ADD CONSTRAINT stock_store_id_fkey FOREIGN KEY (store_id) REFERENCES items.store(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3718 (class 2606 OID 17240)
-- Name: store_transfer_line store_transfer_line_item_id_fkey; Type: FK CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.store_transfer_line
    ADD CONSTRAINT store_transfer_line_item_id_fkey FOREIGN KEY (item_id) REFERENCES items.item(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3719 (class 2606 OID 17245)
-- Name: store_transfer_line store_transfer_line_store_transfer_id_fkey; Type: FK CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.store_transfer_line
    ADD CONSTRAINT store_transfer_line_store_transfer_id_fkey FOREIGN KEY (store_transfer_id) REFERENCES items.store_transfer(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3716 (class 2606 OID 17250)
-- Name: store_transfer store_transfer_source_store_id_fkey; Type: FK CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.store_transfer
    ADD CONSTRAINT store_transfer_source_store_id_fkey FOREIGN KEY (source_store_id) REFERENCES items.store(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3717 (class 2606 OID 17255)
-- Name: store_transfer store_transfer_target_store_id_fkey; Type: FK CONSTRAINT; Schema: items; Owner: postgres
--

ALTER TABLE ONLY items.store_transfer
    ADD CONSTRAINT store_transfer_target_store_id_fkey FOREIGN KEY (target_store_id) REFERENCES items.store(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3638 (class 2606 OID 17260)
-- Name: address_template address_template_country_id_fkey; Type: FK CONSTRAINT; Schema: templates; Owner: postgres
--

ALTER TABLE ONLY templates.address_template
    ADD CONSTRAINT address_template_country_id_fkey FOREIGN KEY (country_id) REFERENCES common.country(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3639 (class 2606 OID 17265)
-- Name: address_template address_template_street_suffix_id_fkey; Type: FK CONSTRAINT; Schema: templates; Owner: postgres
--

ALTER TABLE ONLY templates.address_template
    ADD CONSTRAINT address_template_street_suffix_id_fkey FOREIGN KEY (street_suffix_id) REFERENCES common.street_suffix(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3664 (class 2606 OID 17270)
-- Name: document_line_template document_line_template_item_id_fkey; Type: FK CONSTRAINT; Schema: templates; Owner: postgres
--

ALTER TABLE ONLY templates.document_line_template
    ADD CONSTRAINT document_line_template_item_id_fkey FOREIGN KEY (item_id) REFERENCES items.item(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3665 (class 2606 OID 17275)
-- Name: document_line_template document_line_template_store_id_fkey; Type: FK CONSTRAINT; Schema: templates; Owner: postgres
--

ALTER TABLE ONLY templates.document_line_template
    ADD CONSTRAINT document_line_template_store_id_fkey FOREIGN KEY (store_id) REFERENCES items.store(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3666 (class 2606 OID 17280)
-- Name: document_line_template document_line_template_tax_id_fkey; Type: FK CONSTRAINT; Schema: templates; Owner: postgres
--

ALTER TABLE ONLY templates.document_line_template
    ADD CONSTRAINT document_line_template_tax_id_fkey FOREIGN KEY (tax_id) REFERENCES common.tax(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3656 (class 2606 OID 17285)
-- Name: document_template document_template_customer_id_fkey; Type: FK CONSTRAINT; Schema: templates; Owner: postgres
--

ALTER TABLE ONLY templates.document_template
    ADD CONSTRAINT document_template_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customers.customer(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3657 (class 2606 OID 17290)
-- Name: document_template document_template_fiscal_year_id_fkey; Type: FK CONSTRAINT; Schema: templates; Owner: postgres
--

ALTER TABLE ONLY templates.document_template
    ADD CONSTRAINT document_template_fiscal_year_id_fkey FOREIGN KEY (fiscal_year_id) REFERENCES common.fiscal_year(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3658 (class 2606 OID 17295)
-- Name: document_template document_template_series_id_fkey; Type: FK CONSTRAINT; Schema: templates; Owner: postgres
--

ALTER TABLE ONLY templates.document_template
    ADD CONSTRAINT document_template_series_id_fkey FOREIGN KEY (series_id) REFERENCES common.series(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3642 (class 2606 OID 17300)
-- Name: legal_data_template legal_data_template_identity_document_type_id_fkey; Type: FK CONSTRAINT; Schema: templates; Owner: postgres
--

ALTER TABLE ONLY templates.legal_data_template
    ADD CONSTRAINT legal_data_template_identity_document_type_id_fkey FOREIGN KEY (identity_document_type_id) REFERENCES common.identity_document_type(id) ON UPDATE CASCADE ON DELETE RESTRICT;


-- Completed on 2024-08-07 09:24:19 UTC

--
-- PostgreSQL database dump complete
--


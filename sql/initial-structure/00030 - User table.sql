
CREATE EXTENSION pgcrypto;

CREATE TABLE public.user (
    id bigserial PRIMARY KEY ,
    name text not null,
    mail text not null,
    password text not null,
    full_name text
) INHERITS (public.meta);

-- TODO: remove this

INSERT INTO public.user (name, mail, full_name, password) VALUES
    ('jeroni', 'jeroni@gmail.com', 'Jeroni Brunet Rosselló', '$2a$06$8PVs3L90bCzSWboRa/IlgOQuaJ5KmEmtWtn6vyNZv3D4v4KcrCoBi'),
    ('josep', 'jlg.hrtc@gmail.com', 'Josep Llodrà Grimalt', '$2a$06$fAZS3uggHNTYiCdwDopwW.ixl8FclrGFEA0FtirLnR9cQcESFmisG');

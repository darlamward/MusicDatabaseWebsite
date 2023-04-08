CREATE TABLE public.music_collection
(
    music_id integer NOT NULL,
    album_name character varying(200) NOT NULL,
    artist_name character varying(50) NOT NULL,
    type character varying(10) NOT NULL,
    price money NOT NULL,
    PRIMARY KEY (music_id)
);

ALTER TABLE IF EXISTS public.music_collection
    OWNER to postgres;
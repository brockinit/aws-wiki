create table if not exists notes (
    id serial primary key,
    page_id integer not null,
    page_element text not null,
    note_body varchar(256) not null
);
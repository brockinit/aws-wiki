create table if not exists notes (
    id serial primary key,
    page_id text not null,
    page_element text default null,
    note_body varchar(256) not null
);
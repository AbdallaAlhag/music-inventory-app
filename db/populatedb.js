#! /usr/bin/env node

const { Client } = require("pg");
require('dotenv').config()

const SQL = `
CREATE TABLE IF NOT EXISTS genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS labels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS albums (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_date DATE,
    artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
    genre_id INTEGER REFERENCES genres(id) ON DELETE SET NULL,
    label_id INTEGER REFERENCES labels(id) ON DELETE SET NULL,
    UNIQUE (title, artist_id) -- Add unique constraint for ON CONFLICT
);

-- Insert sample data
-- Insert into Genres
INSERT INTO genres (name) 
VALUES
    ('Rock'),
    ('Pop'),
    ('Alternative')
ON CONFLICT (name) DO NOTHING;

-- Insert into Labels
INSERT INTO labels (name) 
VALUES
    ('Apple Records'),
    ('DGC'),
    ('Columbia Records')
ON CONFLICT (name) DO NOTHING;

-- Insert into Artists
INSERT INTO artists (name) 
VALUES
    ('The Beatles'),
    ('Nirvana'),
    ('Adele')
ON CONFLICT (name) DO NOTHING;

-- Insert into Albums
INSERT INTO albums (title, release_date, artist_id, genre_id, label_id) 
VALUES
    ('Abbey Road', '1969-09-26', (SELECT id FROM artists WHERE name = 'The Beatles'), (SELECT id FROM genres WHERE name = 'Rock'), (SELECT id FROM labels WHERE name = 'Apple Records')),
    ('Nevermind', '1991-09-24', (SELECT id FROM artists WHERE name = 'Nirvana'), (SELECT id FROM genres WHERE name = 'Alternative'), (SELECT id FROM labels WHERE name = 'DGC')),
    ('30', '2021-11-19', (SELECT id FROM artists WHERE name = 'Adele'), (SELECT id FROM genres WHERE name = 'Pop'), (SELECT id FROM labels WHERE name = 'Columbia Records'))
ON CONFLICT (title, artist_id) DO NOTHING;
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.CONNECTIONSTRING,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();

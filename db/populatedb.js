#! /usr/bin/env node

const { Client } = require("pg");
require('dotenv').config()

// DROP TABLE IF EXISTS albums;
// DROP TABLE IF EXISTS artists;
// DROP TABLE IF EXISTS genres;
// DROP TABLE IF EXISTS labels;
const SQL = `

CREATE TABLE IF NOT EXISTS genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    cover_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS labels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    cover_url VARCHAR(255)

);

CREATE TABLE IF NOT EXISTS artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    cover_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS albums (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_date DATE,
    artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
    genre_id INTEGER REFERENCES genres(id) ON DELETE SET NULL,
    label_id INTEGER REFERENCES labels(id) ON DELETE SET NULL,
    cover_url VARCHAR(255),
    UNIQUE (title, artist_id) -- Add unique constraint for ON CONFLICT
);

-- Insert sample data
-- Insert into Genres
INSERT INTO genres (name, cover_url) 
VALUES
    ('Rock', 'https://emby.media/community/uploads/inline/251713/5c43555961571_RockMusic.png'),
    ('Pop', 'https://emby.media/community/uploads/inline/251713/5c43557ecccdf_PopMusic.png'),
    ('Alternative', 'https://emby.media/community/uploads/monthly_2020_09/1301903135_grunge2.png.39e41746314e6b316a1fa7630852145b.png'),
    ('Hip Hop', 'https://emby.media/community/uploads/inline/251713/5e42e437d3440_Hiphop.png'),
    ('Jazz', 'https://emby.media/community/uploads/monthly_2020_09/1440714062_Jazz2.thumb.png.34ba7eecda979e30fe2146885fd98b7b.png'),
    ('Country', 'https://emby.media/community/uploads/inline/251713/5c43556fad289_CountryMusic.png'),
    ('Classical', 'https://emby.media/community/uploads/monthly_2020_09/Classical.thumb.png.0e7e46abf9a72e2b98a9128e6fc09544.png'),
    ('R&B', 'https://emby.media/community/uploads/inline/251713/5e42e3b9d26f2_RnB.png'),
    ('Metal', 'https://emby.media/community/uploads/monthly_2020_09/411126427_Metal(2).thumb.png.7a17ccf21e9daf5bfe809ab17ad9dfa0.png'),
    ('Reggae', 'https://emby.media/community/uploads/monthly_2020_09/Reggae.thumb.png.78caa149374cec087bb6eaea21af6060.png'),
    ('Blues', 'https://emby.media/community/uploads/monthly_2020_10/Blues.thumb.png.7ecac841590cc7d9b126f0d692d87578.png'),
    ('Electronic', 'https://emby.media/community/uploads/inline/251713/5e42e4902e886_EDM.png'),
    ('Folk', 'https://emby.media/community/uploads/monthly_2020_10/1440379420_Acoustic2.thumb.png.40bfe493fc119708c6eb0b4b6f0d04c6.png'),
    ('Punk', 'https://emby.media/community/uploads/monthly_2020_09/Punk.thumb.png.8a511b3ffd79f90f74a3dbe6a84e706e.png'),
    ('Soul', 'https://emby.media/community/uploads/monthly_2022_11/Soul.png.bc0b0ebcc73e00de79b31c6f5713d89f.png'),
    ('Disco', 'https://emby.media/community/uploads/monthly_2020_10/Disco.thumb.png.8bf8976538ac0ea20944f059eaace245.png'),
    ('Gospel', 'https://emby.media/community/uploads/inline/251713/5e42e3724f412_Gospel.png'),
    ('Latin', 'https://icons.iconarchive.com/icons/sirubico/music-genre/256/Latin-icon.png'),
    ('K-Pop', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqTY7RsS55qcwyulRQbhDh1RrfhedOUW95Tg&s'),
    ('Funk', 'https://emby.media/community/uploads/monthly_2021_02/478970656_70sMusic.thumb.png.39a106f3902a6c0f8030ac027ad9dd6e.png')
ON CONFLICT (name) DO NOTHING;

-- Insert into Labels
INSERT INTO labels (name, cover_url) 
VALUES
    ('Apple Records', 'https://reaganray.com/img/blog/record-labels/apple.jpg'),
    ('DGC','https://i.discogs.com/QLsE_K4fXroz1a4w582tRddCwiG2VqN7Gd9jiCOia-Y/rs:fit/g:sm/q:90/h:358/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9MLTE2NTk2/Mi0xNTM3MTYxNTM4/LTU3NjkucG5n.jpeg'),
    ('Columbia Records', 'https://reaganray.com/img/blog/record-labels/columbia-1.jpg'),
    ('Island Records', 'https://reaganray.com/img/blog/record-labels/islands.jpg'),
    ('Capitol Records', 'https://reaganray.com/img/blog/record-labels/capitol-1.jpg'),
    ('Atlantic Records', 'https://reaganray.com/img/blog/record-labels/atlantic-1.jpg'),
    ('Def Jam', 'https://reaganray.com/img/blog/record-labels/defjam.jpg'),
    ('Sony Music', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRENl1796uoB4Bf5z3ok_1kLpjxXzZsCVq3nA&s'),
    ('Warner Bros', 'https://reaganray.com/img/blog/record-labels/wb.jpg'),
    ('Motown', 'https://reaganray.com/img/blog/record-labels/motown-1.jpg'),
    ('Epic Records', 'https://reaganray.com/img/blog/record-labels/epic-1.jpg'),
    ('RCA Records', 'https://reaganray.com/img/blog/record-labels/rcavictor.jpg'),
    ('Universal Music', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3_mF_Z64_76nOXGFZbNgaM3xIxDdY2qD7Mg&s'),
    ('Virgin Records', 'https://reaganray.com/img/blog/record-labels/virgin.jpg'),
    ('Interscope', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfFsqzqg4zH-1Bl1K5sP7a1es0aZA7rQXTZQ&s'),
    ('Geffen Records', 'https://reaganray.com/img/blog/record-labels/geffen.jpg'),
    ('Mercury Records', 'https://reaganray.com/img/blog/record-labels/mercury.jpg'),
    ('EMI', 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0006/5527/brand.gif?itok=BALftWgf'),
    ('Blue Note', 'https://reaganray.com/img/blog/record-labels/bluenote.jpg'),
    ('Chess Records', 'https://reaganray.com/img/blog/record-labels/chess-1.jpg')

ON CONFLICT (name) DO NOTHING;

-- Insert into Artists
INSERT INTO artists (name, cover_url) 
VALUES
    ('The Beatles', 'https://lastfm.freetls.fastly.net/i/u/770x0/f36d782e120456a330921749a73952f5.jpg#f36d782e120456a330921749a73952f5.jpg#c66bdbda8e8579417621f3e8ce51ba44'),
    ('Nirvana', 'https://lastfm.freetls.fastly.net/i/u/770x0/78e291d28d475dfbf113f1489e9c1654.jpg#78e291d28d475dfbf113f1489e9c1654'),
    ('Adele', 'https://lastfm.freetls.fastly.net/i/u/770x0/c66bdbda8e8579417621f3e8ce51ba44.jpg#c66bdbda8e8579417621f3e8ce51ba44'),
    ('Bob Marley', 'https://lastfm.freetls.fastly.net/i/u/770x0/72fdf82fa9554e72b9e14a12f6001876.jpg#72fdf82fa9554e72b9e14a12f6001876'),
    ('Miles Davis', 'https://lastfm.freetls.fastly.net/i/u/770x0/5b22b9fa43d50ffdd264ec1ae50330c1.jpg#5b22b9fa43d50ffdd264ec1ae50330c1'),
    ('Johnny Cash', 'https://lastfm.freetls.fastly.net/i/u/770x0/5af78843a78af10d16879ff877a59696.jpg#5af78843a78af10d16879ff877a59696'),
    ('Beethoven', 'https://lastfm.freetls.fastly.net/i/u/770x0/a49970e2c99b1291b1ec965ba7b28c10.jpg#a49970e2c99b1291b1ec965ba7b28c10'),
    ('Aretha Franklin', 'https://lastfm.freetls.fastly.net/i/u/770x0/20afef13aa085971e479c2534f63854d.jpg#20afef13aa085971e479c2534f63854d'),
    ('Metallica', 'https://lastfm.freetls.fastly.net/i/u/770x0/8cb78d0a38f020f84240138a092cf32f.jpg#8cb78d0a38f020f84240138a092cf32f'),
    ('Bob Dylan', 'https://lastfm.freetls.fastly.net/i/u/770x0/80435969dfa98bffd143c1239e58ddfe.jpg#80435969dfa98bffd143c1239e58ddfe'),
    ('Daft Punk', 'https://lastfm.freetls.fastly.net/i/u/770x0/80623b58659c416b8751f06a4edceb83.jpg#80623b58659c416b8751f06a4edceb83'),
    ('The Clash', 'https://lastfm.freetls.fastly.net/i/u/770x0/33ee7009d602d19471d48e65b1928e95.jpg#33ee7009d602d19471d48e65b1928e95'),
    ('Ray Charles', 'https://lastfm.freetls.fastly.net/i/u/770x0/04419bd2509847d19e9391c01aecdc21.jpg#04419bd2509847d19e9391c01aecdc21'),
    ('Bee Gees', 'https://lastfm.freetls.fastly.net/i/u/770x0/f948efbd5214b86a40e2df346e5df014.jpg#f948efbd5214b86a40e2df346e5df014'),
    ('Kanye West', 'https://lastfm.freetls.fastly.net/i/u/770x0/1e5f3c0acc7c92b384ccdfe7eac85cda.jpg#1e5f3c0acc7c92b384ccdfe7eac85cda'),
    ('Elvis Presley', 'https://lastfm.freetls.fastly.net/i/u/770x0/e1f28bd09ebb4e2fb369b9cc6ac82a9c.jpg#e1f28bd09ebb4e2fb369b9cc6ac82a9c'),
    ('Beyoncé', 'https://lastfm.freetls.fastly.net/i/u/770x0/61f2437893a97e8703b61c28dfdb463c.jpg#61f2437893a97e8703b61c28dfdb463c'),
    ('Shakira', 'https://lastfm.freetls.fastly.net/i/u/770x0/6ae1d18c3abc477a79023d7bce42953f.jpg#6ae1d18c3abc477a79023d7bce42953f'),
    ('BTS', 'https://lastfm.freetls.fastly.net/i/u/770x0/b1723d75165270cac718a082b4935f21.jpg#b1723d75165270cac718a082b4935f21'),
    ('James Brown', 'https://lastfm.freetls.fastly.net/i/u/770x0/0702f261407e4e1b9d3e8b7a27475cc3.jpg#0702f261407e4e1b9d3e8b7a27475cc3')
ON CONFLICT (name) DO NOTHING;

-- Insert into Albums with cover URLs
INSERT INTO albums (title, release_date, artist_id, genre_id, label_id, cover_url) 
VALUES
    ('Abbey Road', '1969-09-26', 
        (SELECT id FROM artists WHERE name = 'The Beatles'), 
        (SELECT id FROM genres WHERE name = 'Rock'), 
        (SELECT id FROM labels WHERE name = 'Apple Records'), 
        'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/48/53/43/485343e3-dd6a-0034-faec-f4b6403f8108/13UMGIM63890.rgb.jpg/600x600bb.jpg'),

    ('Nevermind', '1991-09-24', 
        (SELECT id FROM artists WHERE name = 'Nirvana'), 
        (SELECT id FROM genres WHERE name = 'Alternative'), 
        (SELECT id FROM labels WHERE name = 'DGC'), 
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/95/fd/b9/95fdb9b2-6d2b-92a6-97f2-51c1a6d77f1a/00602527874609.rgb.jpg/600x600bb.jpg'),

    ('30', '2021-11-19', 
        (SELECT id FROM artists WHERE name = 'Adele'), 
        (SELECT id FROM genres WHERE name = 'Pop'), 
        (SELECT id FROM labels WHERE name = 'Columbia Records'), 
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/73/6d/7c/736d7cfb-c79d-c9a9-4170-5e71d008dea1/886449666430.jpg/600x600bb.jpg'),

    ('Live at the Apollo', '1963-05-01', 
        (SELECT id FROM artists WHERE name = 'James Brown'), 
        (SELECT id FROM genres WHERE name = 'Funk'), 
        (SELECT id FROM labels WHERE name = 'King Records'), 
        'https://is1-ssl.mzstatic.com/image/thumb/Music/15/ac/83/mzi.bxkrpzli.jpg/600x600bb.jpg'),

    ('The Dark Side of the Moon', '1973-03-01', 
        (SELECT id FROM artists WHERE name = 'Pink Floyd'), 
        (SELECT id FROM genres WHERE name = 'Rock'), 
        (SELECT id FROM labels WHERE name = 'Harvest Records'), 
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/3c/1b/a9/3c1ba9e1-15b1-03b3-3bfd-09dbd9f1705b/dj.mggvbaou.jpg/600x600bb.jpg'),

    ('Thriller', '1982-11-30', 
        (SELECT id FROM artists WHERE name = 'Michael Jackson'), 
        (SELECT id FROM genres WHERE name = 'Pop'), 
        (SELECT id FROM labels WHERE name = 'Epic Records'), 
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/4f/fd/324ffda2-9e51-8f6a-0c2d-c6fd2b41ac55/074643811224.jpg/600x600bb.jpg'),

    ('Back in Black', '1980-07-25', 
        (SELECT id FROM artists WHERE name = 'AC/DC'), 
        (SELECT id FROM genres WHERE name = 'Rock'), 
        (SELECT id FROM labels WHERE name = 'Atlantic Records'), 
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/1e/14/58/1e145814-281a-58e0-3ab1-145f5d1af421/886443673441.jpg/600x600bb.jpg'),

    ('Hotel California', '1976-12-08', 
        (SELECT id FROM artists WHERE name = 'Eagles'), 
        (SELECT id FROM genres WHERE name = 'Rock'), 
        (SELECT id FROM labels WHERE name = 'Asylum Records'), 
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/88/16/2c/88162c3d-46db-8321-61f3-3a47404cfe76/075596050920.jpg/600x600bb.jpg'),

    ('Rumours', '1977-02-04', 
        (SELECT id FROM artists WHERE name = 'Fleetwood Mac'), 
        (SELECT id FROM genres WHERE name = 'Rock'), 
        (SELECT id FROM labels WHERE name = 'Warner Bros. Records'), 
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/4d/13/ba/4d13bac3-d3d5-7581-2c74-034219eadf2b/081227970949.jpg/600x600bb.jpg'),

    ('Led Zeppelin IV', '1971-11-08', 
        (SELECT id FROM artists WHERE name = 'Led Zeppelin'), 
        (SELECT id FROM genres WHERE name = 'Rock'), 
        (SELECT id FROM labels WHERE name = 'Atlantic Records'), 
        'https://is1-ssl.mzstatic.com/image/thumb/Music5/v4/16/de/e3/16dee335-173b-57ce-80b5-dadf684c0b33/dj.oblporhs.jpg/600x600bb.jpg'),

    ('The Wall', '1979-11-30', 
        (SELECT id FROM artists WHERE name = 'Pink Floyd'), 
        (SELECT id FROM genres WHERE name = 'Rock'), 
        (SELECT id FROM labels WHERE name = 'Columbia Records'), 
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/3c/b4/e3/3cb4e3d0-cd77-8f18-7465-d60e6949b435/886445635850.jpg/600x600bb.jpg'),

    ('Sgt. Peppers Lonely Hearts Club Band', '1967-05-26', 
        (SELECT id FROM artists WHERE name = 'The Beatles'), 
        (SELECT id FROM genres WHERE name = 'Rock'), 
        (SELECT id FROM labels WHERE name = 'Parlophone'), 
        'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/6f/79/8d/6f798d84-7475-8525-fc91-f7b51b2b5a9b/00602567725428.rgb.jpg/600x600bb.jpg'),

    ('Born to Run', '1975-08-25', 
        (SELECT id FROM artists WHERE name = 'Bruce Springsteen'), 
        (SELECT id FROM genres WHERE name = 'Rock'), 
        (SELECT id FROM labels WHERE name = 'Columbia Records'), 
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/0a/02/f7/0a02f7a1-ca2a-c0d7-7192-50314971721f/884977157031.jpg/600x600bb.jpg'),

    ('Purple Rain', '1984-06-25', 
        (SELECT id FROM artists WHERE name = 'Prince'), 
        (SELECT id FROM genres WHERE name = 'Pop'), 
        (SELECT id FROM labels WHERE name = 'Warner Bros. Records'), 
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/c1/b6/79/c1b679f5-d59d-1b3e-62ab-514de20f06c6/093624912002.jpg/600x600bb.jpg'),

    ('The Joshua Tree', '1987-03-09', 
        (SELECT id FROM artists WHERE name = 'U2'), 
        (SELECT id FROM genres WHERE name = 'Rock'), 
        (SELECT id FROM labels WHERE name = 'Island Records'), 
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/8f/e2/c3/8fe2c384-f6cb-9af7-371d-2b6a9b204e59/17UMGIM79292.rgb.jpg/600x600bb.jpg'),

    ('A Night at the Opera', '1975-11-21', 
        (SELECT id FROM artists WHERE name = 'Queen'), 
        (SELECT id FROM genres WHERE name = 'Rock'), 
        (SELECT id FROM labels WHERE name = 'EMI'), 
        'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a7/00/d7/a700d715-a493-19a5-3de9-5753d139419f/14DMGIM05597.rgb.jpg/600x600bb.jpg'),

    ('Sticky Fingers', '1971-04-23', 
        (SELECT id FROM artists WHERE name = 'The Rolling Stones'), 
        (SELECT id FROM genres WHERE name = 'Rock'), 
        (SELECT id FROM labels WHERE name = 'Rolling Stones Records'), 
        'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/fa/26/c9/fa26c9e4-e598-5019-9bd0-ce8321245cc5/15UMGIM15404.rgb.jpg/600x600bb.jpg'),

    ('The Velvet Underground & Nico', '1967-03-12', 
        (SELECT id FROM artists WHERE name = 'The Velvet Underground'), 
        (SELECT id FROM genres WHERE name = 'Rock'), 
        (SELECT id FROM labels WHERE name = 'Verve Records'), 
        'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/92/93/39/9293397f-a707-237e-ec7e-0ca613a67e3c/06UMGIM04143.rgb.jpg/600x600bb.jpg'),

    ('The Rise and Fall of Ziggy Stardust and the Spiders from Mars', '1972-06-16', 
        (SELECT id FROM artists WHERE name = 'David Bowie'), 
        (SELECT id FROM genres WHERE name = 'Rock'), 
        (SELECT id FROM labels WHERE name = 'RCA Records'), 
        'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/5f/fa/56/5ffa56c2-ea1f-7a17-6bad-192ff9b6476d/825646124206.jpg/600x600bb.jpg'),

    ('Graceland', '1986-08-25', 
        (SELECT id FROM artists WHERE name = 'Paul Simon'), 
        (SELECT id FROM genres WHERE name = 'Folk'), 
        (SELECT id FROM labels WHERE name = 'Warner Bros. Records'), 
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/a7/73/c1/a773c1f0-281c-324c-204f-540444080ea8/886443445697.jpg/600x600bb.jpg'),

    ('London Calling', '1979-12-14', 
        (SELECT id FROM artists WHERE name = 'The Clash'), 
        (SELECT id FROM genres WHERE name = 'Punk'), 
        (SELECT id FROM labels WHERE name = 'CBS Records'), 
        'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/45/d7/17/45d71740-b204-de23-3f9e-f2f823296f1d/886443520721.jpg/600x600bb.jpg')
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

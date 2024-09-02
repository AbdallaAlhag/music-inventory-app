const pool = require("./pool");


async function getHomePageInfo() {
    // const { rows } = await pool.query("SELECT * FROM artists");
    // return rows;
    try {
        const recentAlbumsQuery = `
        SELECT albums.title, albums.release_date, albums.cover_url, artists.name AS artist
        FROM albums
        JOIN artists ON albums.artist_id = artists.id
        ORDER BY albums.release_date DESC
        LIMIT 6`;

        const result = await pool.query(recentAlbumsQuery);
        const recentAlbums = result.rows; // Extracting the rows property
        return recentAlbums;
    } catch (error) {
        console.error('Error querying recent albums:', error);
        throw error;
    }
}

async function getCategoryInfo(type) {
    let query;
    let currentType;
    switch (type) {
        case "Artists":
            query = `SELECT * FROM artists ORDER BY name`;
            currentType = 'Artists';
            break;
        case "Albums":
            query = `SELECT * FROM albums ORDER BY release_date`;
            currentType = 'Albums';
            break;
        case "Genres":
            query = `SELECT * FROM genres ORDER BY name`;
            currentType = 'Genres';
            break;
        case "Labels":
            query = `SELECT * FROM labels ORDER BY name`;
            currentType = 'Labels';
            break;
        default:
            query = `SELECT * FROM artists ORDER BY name`;
            currentType = 'Artists';
            break;
    }
    try {
        const result = await pool.query(query);
        const gatheredInventory = result.rows; // Extracting the rows property
        return { gatheredInventory, currentType };
    } catch (error) {
        console.error('Error querying category data:', error);
        throw error;
    }
}


async function getDetailInfo(id, type) {
    let query;
    let params;

    switch (type) {
        case "Artists":
            query = `SELECT 
            a.id AS artist_id,
            a.name AS artist_name,
            al.id AS album_id,
            al.title AS album_title,
            al.release_date AS album_release_date,
            g.name AS genre_name,
            l.name AS label_name,
            al.cover_url AS album_cover_url
            FROM 
                artists a
            LEFT JOIN 
                albums al ON a.id = al.artist_id
            LEFT JOIN 
                genres g ON al.genre_id = g.id
            LEFT JOIN 
                labels l ON al.label_id = l.id
            WHERE 
                a.id = $1;  
            `;
            params = [id];
            break;
        case "Albums":
            query = `
            SELECT 
                al.id AS album_id,
                al.title AS album_title,
                al.release_date AS album_release_date,
                a.name AS artist_name,
                g.name AS genre_name,
                l.name AS label_name,
                al.cover_url AS album_cover_url
            FROM 
                albums al
            LEFT JOIN 
                artists a ON al.artist_id = a.id
            LEFT JOIN 
                genres g ON al.genre_id = g.id
            LEFT JOIN 
                labels l ON al.label_id = l.id
            WHERE 
                al.id = $1;
            `;
            params = [id];
            break;
        case "Genres":
            query = `
            SELECT 
                g.id AS genre_id,
                g.name AS genre_name,
                al.id AS album_id,
                al.title AS album_title,
                al.release_date AS album_release_date,
                a.name AS artist_name,
                l.name AS label_name,
                al.cover_url AS album_cover_url
            FROM 
                genres g
            LEFT JOIN 
                albums al ON g.id = al.genre_id
            LEFT JOIN 
                artists a ON al.artist_id = a.id
            LEFT JOIN 
                labels l ON al.label_id = l.id
            WHERE 
                g.id = $1; 
            `;
            params = [id];

            break;
        case "Labels":
            query = `
            SELECT 
                l.id AS label_id,
                l.name AS label_name,
                al.id AS album_id,
                al.title AS album_title,
                al.release_date AS album_release_date,
                a.name AS artist_name,
                g.name AS genre_name,
                al.cover_url AS album_cover_url
            FROM 
                labels l
            LEFT JOIN 
                albums al ON l.id = al.label_id
            LEFT JOIN 
                artists a ON al.artist_id = a.id
            LEFT JOIN 
                genres g ON al.genre_id = g.id
            WHERE 
                l.id = $1; 
            `;
            params = [id];
            break;
        default:
            query = `SELECT * FROM artists ORDER BY name`;
            break;
    }
    try {
        const result = await pool.query(query, params);
        const data = result.rows; // Extracting the rows property
        return data;
    } catch (error) {
        console.error('Error querying details:', error);
        throw error;
    }
}


async function insertIntoDatabase(type, values) {
    let query;
    let params = [];

    switch (type) {
        case "Artist":
            query = `
            INSERT INTO artists (name) 
            VALUES ($1)
            RETURNING *;
            `;
            params = [values.name];
            break;

        case "Album":
            query = `
            INSERT INTO albums (title, release_date, artist_id, genre_id, label_id, cover_url) 
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
            `;
            params = [
                values.title,
                values.release_date,
                values.artist_id,
                values.genre_id,
                values.label_id,
                values.cover_url
            ];
            break;

        case "Genre":
            query = `
            INSERT INTO genres (name) 
            VALUES ($1)
            RETURNING *;
            `;
            params = [values.title];
            break;

        case "Label":
            query = `
            INSERT INTO labels (name) 
            VALUES ($1)
            RETURNING *;
            `;
            params = [values.label_name];
            break;

        default:
            throw new Error("Invalid type specified for insertion.");
    }

    try {
        console.log('Insert query:', query, 'params:', params);
        const result = await pool.query(query, params);
        const insertedData = result.rows[0]; // Extracting the inserted row
        console.log('Inserted data:', insertedData);
        return insertedData;
    } catch (error) {
        console.error('Error inserting data:', error);
        throw error;
    }
}

const getDropdownData = async () => {
    const [artists, genres, labels] = await Promise.all([
        pool.query('SELECT id, name FROM artists ORDER BY name'),
        pool.query('SELECT id, name FROM genres ORDER BY name'),
        pool.query('SELECT id, name FROM labels ORDER BY name')
    ]);
    return {
        artists: artists.rows,
        genres: genres.rows,
        labels: labels.rows
    };
};

async function updateDatabase(id, type, updatedData) {
    let query;
    let params;

    switch (type) {
        case "Artists":
            query = `
            UPDATE artists 
            SET name = $1
            WHERE id = $2;
            `;
            params = [updatedData.name, id];
            break;
        case "Albums":
            query = `
            UPDATE albums 
            SET title = $1, release_date = $2
            WHERE id = $3;
            `;
            params = [updatedData.title, updatedData.release_date, id];
            break;
        case "Genres":
            query = `
            UPDATE genres 
            SET name = $1
            WHERE id = $2;
            `;
            params = [updatedData.name, id];
            break;
        case "Labels":
            query = `
            UPDATE labels 
            SET name = $1
            WHERE id = $2;
            `;
            params = [updatedData.name, id];
            break;
        default:
            throw new Error('Invalid type');
    }

    try {
        await pool.query(query, params); // Execute the update query
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
}

module.exports = {
    getHomePageInfo,
    getCategoryInfo,
    getDetailInfo,
    insertIntoDatabase,
    getDropdownData,
    updateDatabase
};

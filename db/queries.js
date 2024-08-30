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
        console.log(recentAlbums)
        return recentAlbums;
    } catch (error) {
        console.error('Error querying recent albums:', error);
        throw error;
    }
}

async function getCategoryInfo(type) {
    let query;
    switch (type) {
        case "artists":
            query = `SELECT * FROM artists ORDER BY name`;
            break;
        case "albums":
            query = `SELECT * FROM albums ORDER BY release_date`;
            break;
        case "genres":
            query = `SELECT * FROM genres ORDER BY name`;
            break;
        case "labels":
            query = `SELECT * FROM labels ORDER BY name`;
            break;
        default:
            query = `SELECT * FROM artists ORDER BY name`;
            break;
    }


    try {
        const result = await pool.query(query);
        const recentRows = result.rows; // Extracting the rows property
        return recentRows;
    } catch (error) {
        console.error('Error querying category data:', error);
        throw error;
    }
}



async function insertNameIntoArtist(name) {
    await pool.query("INSERT INTO artists (name) VALUES ($1)", [name]);
}


module.exports = {
    getHomePageInfo,
    insertNameIntoArtist,
    getCategoryInfo
};

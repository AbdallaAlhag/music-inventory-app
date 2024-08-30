const pool = require("./pool");


async function getHomePageInfo() {
    // const { rows } = await pool.query("SELECT * FROM artists");
    // return rows;
    try {
        const recentAlbumsQuery = `
        SELECT albums.title, albums.release_date, artists.name AS artist
        FROM albums
        JOIN artists ON albums.artist_id = artists.id
        ORDER BY albums.release_date DESC
        LIMIT 5`;

        const result = await pool.query(recentAlbumsQuery);
        const recentAlbums = result.rows; // Extracting the rows property
        console.log(recentAlbums)
        return recentAlbums;
    } catch (error) {
        console.error('Error querying recent albums:', error);
        throw error;
    }
}

async function insertNameIntoArtist(name) {
    await pool.query("INSERT INTO artists (name) VALUES ($1)", [name]);
}

module.exports = {
    getHomePageInfo,
    insertNameIntoArtist
};

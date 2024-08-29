const pool = require("./pool");


async function getAllArtist() {
    // const { rows } = await pool.query("SELECT * FROM artists");
    // return rows;
    try {
        const result = await pool.query("SELECT * FROM artists"); // Adjust the query to match your schema
        return result.rows;
    } catch (error) {
        console.error('Error querying artists:', error);
        throw error;
    }
}

async function insertNameIntoArtist(name) {
    await pool.query("INSERT INTO artists (name) VALUES ($1)", [name]);
}

module.exports = {
    getAllArtist,
    insertNameIntoArtist
};

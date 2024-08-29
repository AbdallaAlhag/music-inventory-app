const pool = require("./pool");


async function getAllArtist() {
    const { rows } = await pool.query("SELECT * FROM artists");
    return rows;
}

async function insertNameIntoArtist(name) {
    await pool.query("INSERT INTO name (name) VALUES ($1)", [name]);
}

module.exports = {
    getAllArtist,
    insertNameIntoArtist
};

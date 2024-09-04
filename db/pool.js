const { Pool } = require("pg");
require('dotenv').config()

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
// module.exports = new Pool({
//   host: "localhost", // or wherever the db is hosted
//   user: "alhag",
//   database: "music_inventory",
//   password: "Alshabeek42!",
//   port: 5432 // The default port
// });

module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
});
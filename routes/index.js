// routes/index.js
const express = require("express");
const musicController = require("../controllers/musicController.js");

const router = express.Router();
// GET home page
router.get("/", musicController.getArtist);
module.exports = router;

// routes/index.js
const express = require("express");
const musicController = require("../controllers/musicController.js");

const router = express.Router();
// GET home page
router.get("/", musicController.getHomePage);

// get category page
router.get("/category/:category", musicController.getCategory);
router.get("/detail/:detail", musicController.getDetail);
module.exports = router;

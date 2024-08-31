// routes/index.js
const express = require("express");
const musicController = require("../controllers/musicController.js");

const router = express.Router();
// GET home page
router.get("/", musicController.getHomePage);

// get category page
router.get("/category/:category", musicController.getCategory);
router.get("/detail/:detail", musicController.getDetail);

// Get create page and Create new object
router.get('/create/:type', musicController.getCreatePage);
router.post('/create/:type', musicController.createNewObject);

module.exports = router;

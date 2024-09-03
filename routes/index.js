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

// Route to get the current data and display the update form
router.get('/update/:type/:id', musicController.getUpdatePage);
// Route to update the data and handle form submission
router.post('/update/:type/:id', musicController.updateObject);

// Route to delete an object
router.delete('/delete/:type/:id', musicController.deleteObject);

module.exports = router;

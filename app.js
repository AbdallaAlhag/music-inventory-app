const express = require("express");
const path = require("node:path");
const router = require('./routes/index.js');
const methodOverride = require('method-override');

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// middleware for static files
app.use(express.static('public'));
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// // app.get("/", (req, res) => res.send("Hello, world!"));
// app.get("/", (req, res) => {
//     res.render("index", { title: "Index!" });
// });

app.use('/', router);

const PORT = 3000;
app.listen(PORT, () => console.log(`My first Express app - listening on port ${PORT}!`));

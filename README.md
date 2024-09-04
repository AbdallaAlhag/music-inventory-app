# Music Inventory App

[View Live: Music-Inventory-App](https://music-inventory-app-production.up.railway.app/)

A full-stack application to keep track of your music collection. This app will allow users to create, read, update, and delete (CRUD) albums and artists.


## Tools Used:

* Node.js
* Express
* PostgreSQL
* EJS
* Font Awesome for icons

## Concepts Learned:

* Creating a backend application
* Using Node.js, Express, and PostgreSQL to create a RESTful API
* Using EJS to create a dynamic user interface
* Using Font Awesome to add icons to the user interface
* Using CRUD operations to interact with the database

## Tech Stack:

* Node.js
* Express
* PostgreSQL
* EJS
* Font Awesome

## Set Up:

1. Clone the repository
2. Run `npm install`
3. Create a PostgreSQL database and update the `databaseURL` in `.env`
4. Run `node --watch app` to start the server
5. Open `http://localhost:3000` in your browser

## Features:

* Create, Read, Update, and Delete (CRUD) Albums, Artists, Genres, and Labels
* Search query throughout the site
* Display cover, images, and detail for multiple categories
* Update information to site

## Dependencies:

### dotenv
Used to store environment variables in a `.env` file and easily switch between different environments.

### ejs
Used as the templating engine for the project. Allows for the use of dynamic templates with variables and conditionals.

### express
Used as the web framework for the project. Provides many features such as routing, middleware, and a request/response cycle.

### express-validator
Used to validate user input on the server side. Provides a simple way to validate forms and prevent invalid data from being entered into the database.

### method-override
Used to override the HTTP method of a request. Allows for the use of PUT and DELETE methods which are not supported by all browsers.

### moment
Used to easily work with dates and times in JavaScript. Provides a simple and intuitive API for formatting dates and times.

### pg
Used to interact with the PostgreSQL database. Provides a simple and intuitive API for performing CRUD operations on the database.

# Deploy:
* Deployed environment with postgres on railway

## Sources for Images:

* Album covers: https://bendodson.com/projects/itunes-artwork-finder/
* Artist images: use their last.fm image page or search for "<artist> spotify"
* Record labels icons: https://reaganray.com/2018/04/27/record-logos.html
* Genre icons: https://emby.media/community/index.php?/topic/68394-music-genre-icons/

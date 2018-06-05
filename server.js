"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');
var cookieSession = require('cookie-session')

// Seperated Routes for each Resource
const routes = require("./routes/routes");

app.use(cookieSession({
  name: 'session',
  keys: ['temporary'],
}))

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Set Cookie-session
app.use(cookieSession({
  name: 'session',
  keys: ['temporary'],
}))

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

app.use("/api", routes(knex));

// Home page sending from table dishes to the first page
app.get("/", (req, res) => {
  req.session.user_id = generateRandomString();
  res.render("index");
});

//Create a 6 digit random Number for user_id
function generateRandomString() {
  var generate = "";
  var randomChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i <= 6; i++) {
    generate += randomChar.charAt((Math.floor(Math.random() * randomChar.length)));

  }
  return generate;
}

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

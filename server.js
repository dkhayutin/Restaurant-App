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

var twilio = require('twilio');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const dishesRoutes = require("./routes/dishes");
const restaurantRoutes = require("./routes/restaurants");
const routes = require("./routes/routes");

app.use(cookieSession({
  name: 'session',
  keys: ['temporary'],
}))

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//send a Twilio SMS <<<<<<<<
var accountSid = 'AC12bd3680ab7bcacdea48e1728c8788e2'; // Your Account SID from www.twilio.com/console
var authToken = '690e49b366be07f27288491d29bdd4b1'; // Your Auth Token from www.twilio.com/console
var twilioClient = new twilio(accountSid, authToken);


// Send SMS message using twilio
var messageSMS = function(phone, message) {
  twilioClient.messages.create({
      body: message,
      to: phone,
      from: '+16476997021'
    })
    .then((message) => console.log(message.sid));
}

// Set Cookie-session
app.use(cookieSession({
  name: 'session',
  keys: ['temporary'],
}))

//send a Twilio SMS <<<<<<<<
var accountSid = 'AC12bd3680ab7bcacdea48e1728c8788e2'; // Your Account SID from www.twilio.com/console
var authToken = '690e49b366be07f27288491d29bdd4b1'; // Your Auth Token from www.twilio.com/console
var twilioClient = new twilio(accountSid, authToken);



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

// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));
// app.use("/api/dishes", dishesRoutes(knex));
// app.use("/api/restaurants", restaurantRoutes(knex));
app.use("./routes", routes(knex));


// Home page sending from table dishes to the first page
app.get("/", (req, res) => {
  req.session.user_id = generateRandomString();

  knex('dishes')
    .select("*")
    .join('restaurants', 'restaurants.id', 'dishes.restaurants_id')
    .then(function(dishes) {
      res.json(dishes);
    });

  res.render("index");
});

//Create a 6 digit random Number <<<<
function generateRandomString() {
  var generate = "";
  var randomChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i <= 6; i++) {
    generate += randomChar.charAt((Math.floor(Math.random() * randomChar.length)));

  }
  return generate;
}

// get information from kart
app.get("/kart", (req, res) => {

  var userId = req.session.user_id;
  knex('karts')
    .select("*")
    .join('dishes', 'dishes.id', 'karts.dishes_id')
    .join('restaurants', 'restaurants.id', 'dishes.restaurants_id')
    .where('users_id', userId)
    .whereNot('quantity', 0)
    .then(function(dishes) {
      console.log(dishes);
      res.json(dishes);
    });

});

// get info from user what dished he chosed and put on the kart
app.post("/kart", (req, res) => {

  var userId = req.session.user_id;
  var dishId = Number(req.body.disheId);
  var quant = Number(req.body.quantity);

  if (!quant) {
    var query = knex("karts")
      .del()
      .where({
        users_id: userId
      })
      .where({
        dishes_id: dishId
      });
    query.exec();

  } else {

    knex
      .select('*')
      .from('karts')
      .where('users_id', '=', userId)
      .where('dishes_id', '=', dishId)
      .then(function(kart) {
        if (kart.length === 0) {
          knex('karts')
            .insert([{
              users_id: userId,
              dishes_id: dishId,
              quantity: quant
            }])
            .catch(function(error) {
              console.error(error)
            });

        } else {

          knex('karts')
            .update('quantity', quant)
            .where('users_id', '=', userId)
            .where('dishes_id', '=', dishId)
            .catch(function(error) {
              console.error(error)
            });
        }
      })
      .catch(function(error) {
        console.error(error)
      });
  }

  return;

});

// send sms message to the client and to the owner of the restaurant
app.post("/checkout", (req, res) => {

  var userId = req.session.user_id;

  knex.select('*')
    .from('karts')
    .join('dishes', 'dishes.id', 'karts.dishes_id')
    .join('restaurants', 'restaurants.id', 'dishes.restaurants_id')
    .where({'karts.users_id': userId})
    .then(function(rows) {
      let results = rows
      let userTextSms = '';
      for (let i = 0; i < rows.length; i++) {
        userTextSms += 'Your order from ' + rows[i].name + ' includes: ' + rows[i].quantity + ' ' + rows[i].description + ' and will be already for pick-up in: ' + rows[i].time_to_done + '\n';
        messageSMS(rows[i].phone, 'You have a order from ' + req.body.name + 'phone: ' + req.body.phone + ' includes: ' + rows[i].quantity, rows[i].description + '\n');
      }

      messageSMS(req.body.phone, userTextSms);

    });
  // res.status('success');

  knex('users').where('id', req.session.users_id).del();
  knex('karts').where('id', req.session.karts_id).del();

  req.session.users_id = null;
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});


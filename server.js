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

const twilio = require('twilio');

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



// SMS TO CUSTOMER Twilio
var sendTextMessage = function(customer) {
  twilioClient.messages.create({
      body: 'Your order has been accepted. Estimated time for pick up is 30 mins.',
      to: customer.phone, // Text this number Twilio registered numbers: Ash +14165693279 Rafa +16472033511 Dan +12893394716
      from: '+16476997021' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));

};
// SMS TO OWNER Twilio
var sendOwnerMessage = function() {
  twilioClient.messages.create({
      body: 'You have received an order.',
      to: '++14165693279', // Text this number Twilio registered numbers: Ash +14165693279
      from: '+16476997021' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
};

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


// Home page
app.get("/", (req, res) => {
  req.session.user_id = generateRandomString();
  res.render("index");
});

// Home page form submit which triggers twilio <<<<<<
// app.get("/sms", (req, res) => {
//   res.redirect("/")
// });

// app.post("/sms", (req, res) => {
//   var customer = {
//     name: req.body.fname,
//     phone: req.body.phone
//   };
//   sendTextMessage(customer);
//   sendOwnerMessage();
// });

//Create a 6 digit random Number <<<<
function generateRandomString() {
  var generate = "";
  var randomChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i <= 6; i++) {
    generate += randomChar.charAt((Math.floor(Math.random() * randomChar.length)));

  }
  return generate;
}

app.get("/kart", (req, res) => {

  var userId = req.session.user_id;
  knex('karts')
    .select("*")
    .join('dishes', 'dishes.id', 'karts.dishes_id')
    .join('restaurants', 'restaurants.id', 'dishes.restaurants_id')
    .where('users_id', '=', userId)
    .where('quantity', '!=', 0)
    .then(function(dishes) {
      console.log(dishes);
      res.json(dishes);
    });

});


app.post("/kart", (req, res) => {
  console.log('received POST to /kart');


  var userId = req.session.user_id;

  var dishId = Number(req.body.disheId);
  var quant = Number(req.body.quantity);

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
          .where('users_id', '=', userId)
          .where('dishes_id', '=', dishId)
          .update('quantity', quant)
          .then(function() {
            knex.destroy();
          })
          .catch(function(error) {
            console.error(error)
          });
      }

    })
    // })
    .catch(function(error) {
      console.error(error)
    });

  knex('karts')
  .where('users_id', '=', userId)
  .where('dishes_id', '=', dishId)
  .where('quantity', '=', 0).del();

  return;
  // return $kartItem;

});


app.put("/checkout", (req, res) => {

  knex.select('dishes.name dname, dishes.time_to_done dtime, dishes.price dprice, karts.quantity kquant, restaurants.name rname, restaurants.phone rphone')
    .from('karts')
    .join('dishes', 'dishes.id', 'karts.dishes_id')
    .join('restaurants', 'restaurants.id', 'dishes.restaurants_id')
    .where('karts.users_id', '=', req.session.users_id)
    .then(function(rows) {
      let results = rows
      let userTextSms = '';

      for (let i = 0; i < rows.length; i++) {
        userTextSms += 'Your order from ' + rows[i].rname + ' includes: ' + rows[i].kquant, rows[i].dname + ' and will be already for pick-up in: ' + rows[i].dtime + '\n';
        messageSMS(rows[i].rphone, 'You have a order from ' + req.body.name + 'phone: ' + req.body.phone + ' includes: ' + rows[i].kquant, rows[i].dname + '\n');
      }
      // message to user
      messageSMS(req.body.phone, userTextSms);

    });
  res.status('success');


  knex('users').where('id', req.session.users_id).del();
  knex('karts').where('id', req.session.karts_id).del();

  req.session.users_id = null;
});


var messageSMS = function(phone, message) {
  twilioClient.messages.create({
      body: message,
      to: phone,
      from: '+16476997021'
    })
    .then((message) => console.log(message.sid));
}

// Delete dish from dishes
app.post('/delete', (req, res) => {
  return new Promise((resolve, err) => {
      let deleId = req.body.dishId;
      resolve(deleId);
    })
    .then((deleId) => {
      return knex('karts').where('dishes_id', deleId).del();
    })
    .then(() => {
      return res.redirect('/');
    });
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

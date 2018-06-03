// "use strict";

// require('dotenv').config();
// const express = require("express");
// const bodyParser = require("body-parser");
// const sass = require("node-sass-middleware");
// const app = express();
// const router = express.Router();

// const knexConfig = require('./knexfile');
// const knex = require('knex')(knexConfig[ENV]);
// const morgan = require('morgan');
// const knexLogger = require('knex-logger');

// //twillio send sms message
// var twilio = require('twilio');

// app.use(morgan('dev'));
// app.use(knexLogger(knex));

// var twilioClient = new twilio('AC12bd3680ab7bcacdea48e1728c8788e2', '690e49b366be07f27288491d29bdd4b1');

// var sendTextMessage = function(customer) {
//   twilioClient.messages.create({
//       body: 'Your order has been accepted. Estimated time for pick up is 30 mins.',
//       to: customer.phone, // Text this number Ash +14165693279 Rafa +16472033511 Dan +12893394716
//       from: '+16476997021' // From a valid Twilio number
//     })
//     .then((message) => console.log(message.sid));

// };


// module.exports = (knex) => {

//     router.get("/", (req, res) => {
//       knex
//         .select('*')
//         .from('dishes')
//         .join('restaurants', 'restaurants.id', 'dishes.restaurants_id')
//         .then(function(rows) {
//           res.json(rows);
//           knex.destroy();
//         })
//         .catch(function(error) {
//           console.error(error)
//         });
//     });



//     router.post("/add/:item", (req, res) => {

//         var userId = req.session.users_id;
//         var disheId = something from req.;
//         var kartId = req.session.karts_id;
//         var quant = something from req.;


//         if (!req.session.users_id) {
//           userId = generateUserId();
//           req.session.user_id = userId;

//           knex('users')
//             .insert([{
//               id: userId
//             }])
//             .then(function() {
//               knex.destroy();
//             })
//             .catch(function(error) {
//               console.error(error)
//             });
//         }

//         knex('karts')
//           .insert([{
//             users_id: userId,
//             dishes_id: disheId,
//             quantity: quant
//           }])
//           .returning('id')
//           .then(function() {
//             req.session.karts_id = id;
//             knex.destroy();
//           })
//           .catch(function(error) {
//             console.error(error)
//           });
//       }

//       router.post("/order", (req, res) => {



//       });
//       return router;

//     }

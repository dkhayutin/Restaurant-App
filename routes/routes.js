"use strict";

const express = require('express');
const router = express.Router();

var twilio = require('twilio');

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


module.exports = (knex) => {

  // send sms message to the client and to the owner of the restaurant
  router.post("/checkout", (req, res) => {

    var userId = req.session.user_id;

    knex.select('*')
      .from('karts')
      .join('dishes', 'dishes.id', 'karts.dishes_id')
      .join('restaurants', 'restaurants.id', 'dishes.restaurants_id')
      .where({
        'karts.users_id': userId
      })
      .then(function(rows) {
        let results = rows
        let userTextSms = '';
        for (let i = 0; i < rows.length; i++) {
          userTextSms += 'Your order from ' + rows[i].name + ' includes: ' + rows[i].quantity + ' ' + rows[i].description + ' and will be already for pick-up in: ' + rows[i].time_to_done + '\n';
          messageSMS(rows[i].phone, 'You have a order from ' + req.body.name + 'phone: ' + req.body.phone + ' includes: ' + rows[i].quantity + ' ' + rows[i].description + '\n');
        }

        messageSMS(req.body.phone, userTextSms);

      });
    // res.status('success');

    knex('users').where('id', req.session.users_id).del();
    knex('karts').where('id', req.session.karts_id).del();

    req.session.users_id = null;
    res.redirect('/');
  });

  // get info from user what dished he chosed and put on the kart
  router.post("/kart", (req, res) => {

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

  // get information from table kart when clicked
  router.get("/kart", (req, res) => {

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

  return router;
}

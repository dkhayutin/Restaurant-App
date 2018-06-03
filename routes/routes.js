"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  // router.get("/main", (req, res) => {

  //   knex("dishes")
  //     .select("id, name, photo, description, price, restaurants.name rname")
  //     .join('restaurants', 'restaurants.id', 'dishes.restaurants_id')
  //     .then((results) => {
  //       res.json(results);
  //     });
  // });

  // router.get("/", (req, res) => {
  //   var userId = req.session.user_id;

  //   console.log("test");
  //   knex
  //     .select("*")
  //     .from("karts").returning("id")
  //     // .join("dishes", "dishes.id", "karts.dishes_id")
  //     // .join("restaurants", "restaurants.id", "dishes.restaurants_id")
  //     // .where("users_id", '=', userId)
  //     .then(function(dishes) {
  //       console.log("Rafael");
  //       res.json(dishes);
  //     });
  // });

router.get("/kart", (req, res) => {

  var userId = req.session.user_id;
  knex('karts')
    .select("*")
    .join('dishes', 'dishes.id', 'karts.dishes_id')
    .join('restaurants', 'restaurants.id', 'dishes.restaurants_id')
    .where('users_id', '=' , userId)
    .then(function(dishes) {
      console.log(dishes);
      res.json(dishes);
    });

});

  return router;
}

"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get("/main", (req, res) => {

    knex
      .select("id, name, photo, description, price, restaurants.name rname")
      .from("dishes")
      .join('restaurants', 'restaurants.id', 'dishes.restaurants_id')
      .then((results) => {
        res.json(results);
      });
  });

  router.get("/", (req, res) => {
    knex.select('dishes.name dname, photo, price, quantity, restaurants.name rname')
      .from('karts')
      .join('dishes', 'dishes.id', 'karts.dishes_id')
      .join('restaurants', 'restaurants.id', 'dishes.restaurants_id')
      .where('users_id', '=', req.session.user_id)
      .then(function(dishes) {
        console.log(req.session.user_id);
        res.json(dishes);
      });
  });

  return router;
}

"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("dishes")
      .join("restaurants", "restaurants.id", "dishes.restaurants_id")
      .then((results) => {
        console.log(results);
        res.json(results);
        knex.destroy();
      })
      .catch(function(error) {
        console.error(error)
      });
  });
  return router;
}

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

  router.post("/kart/", (req, res) =>{
     userId = req.session.user_id;
    console.log('Rafael',userId);
  //    knex("users")
  //     .select("id")
  //     .where("username", uName)
  //     .first()
  //     .then((uID) => {
  //       knex("karts")
  //       .insert({'user_id': uID.id})
  //       .then((insertResult) =>  {
  //         res.json(insertResult);
  //       });
  //     });
  });

  return router;
}


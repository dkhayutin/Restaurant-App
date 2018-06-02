"use strict";

const express = require('express');
const router  = express.Router();

module.exports = function(knex) {

  router.post("/kart", (req, res) => {
    console.log('Rafael');
    // res.status('success');

    var dishId = Number(req.body.itemId);
    var userId = req.session.user_id;
    var kartId = req.session.karts_id;
    var quant = req.body.quantity;
    console.log('qweqweqweqweqweqweqweqweqwe', dishId);

    knex('karts')
      .select('*')
      .where('id', '=', kartId)
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
            .returning('id')
            .then(function() {
              req.session.karts_id = id;
              knex.destroy();
            })
            .catch(function(error) {
              console.error(error)
            });
        } else {
          quant += kart.quantity;
          knex('karts')
            .update([{
              quantity: quant
            }])
            // .where('id', '=', kartId)
            .where('users_id', '=', userId)
            .where('dishes_id', '=', disheId)
            .then(function() {
              knex.destroy();
            })
            .catch(function(error) {
              console.error(error)
            });
        }
      })
      .catch(function(error) {
        console.error(error)
      });
  });

  return router;
}

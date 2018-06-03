// "use strict";

// const express = require('express');
// const router = express.Router();

// module.exports = (knex) => {
//   router.get("/", (req, res) => {
//     knex
//       .select("*")
//       .from("dishes")
//       .join("restaurants", "restaurants.id", "dishes.restaurants_id")
//       .then((results) => {
//         console.log(results);
//         res.json(results);
//         knex.destroy();
//       })
//       .catch(function(error) {
//         console.error(error)
//       });
//   });

//   router.post("/kart", (req, res) => {
//     console.log('Rafael');
//     // res.status('success');

//     var dishId = Number(req.body.itemId);
//     var dishId = 1;
//     var userId = req.session.user_id;
//     var kartId = req.session.karts_id;
//     var quant = req.body.quantity;
//     var quant = 1;
//     console.log(req.body);

//     knex('karts')
//       .select('*')
//       // .where('id', '=', kartId)
//       .where('users_id', '=', userId)
//       .where('dishes_id', '=', dishId)
//       .then(function(kart) {
//         if (kart.length === 0) {
//           knex('karts')
//             .insert([{
//               users_id: userId,
//               dishes_id: dishId,
//               quantity: quant
//             }])
//             .returning('id')
//             .then(function() {
//               // req.session.karts_id = id;
//               knex.destroy();
//             })
//             .catch(function(error) {
//               console.error(error)
//             });
//         } else {
//           quant += kart.quantity;
//           knex('karts')
//             .update([{
//               quantity: quant
//             }])
//             // .where('id', '=', kartId)
//             .where('users_id', '=', userId)
//             .where('dishes_id', '=', disheId)
//             .then(function() {
//               knex.destroy();
//             })
//             .catch(function(error) {
//               console.error(error)
//             });
//         }
//       })
//       .catch(function(error) {
//         console.error(error)
//       });
//   });

//   return router;
// }

// require('dotenv').config();


// const express = require("express");
// const bodyParser = require("body-parser");
// const sass = require("node-sass-middleware");
// const app = express();

// const knexConfig = require("./knexfile");
// // const knex = require("knex")(knexConfig[ENV]);
// const morgan = require('morgan');
// const knexLogger = require('knex-logger');
// var cookieSession = require('cookie-session')

// const twilio = require('twilio');

// // Seperated Routes for each Resource
// const usersRoutes = require("./routes/users");
// const dishesRoutes = require("./routes/dishes");
// const restaurantRoutes = require("./routes/restaurants");


// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))


function addToKart() {
//   // event.preventDefault();

//   //   $.ajax({
//   //     url: "/kart",
//   //     method: "POST",
//   //     data: $(this).serialize(),
//   //     success: function(body) {
//   //       $.ajax({
//   //         url: "/kart",
//   //         method: "GET",
//   //         success: function(data) {
//   //           data.forEach((tweet) => {
//   //             createKart(dishes);
//   //         });
//   //       }
//   //     });
//   //   }
//   // });
// app.post('*' , (res, req) => {
//   console.log('body: ', req.body);
//   console.log('query: ', req.query);
// })
    // $.ajax({
    //         url: "/restaurants",
    //         type: "POST",
    //         data: $(this).serialize(),
    //         dataType: "json",
    //         success: function() {
    //             console.log("success!")
    //         },
    //         error: function() {
    //             console.log("error", arguments[2])
    //         }
    //     });

}



//  $(".kart").click(function(){
//   let itemId = $(this).data('id');

//   $.ajax({
//     method: "POST",
//     url: "/kart"
//   }).done((kart) => {
//     for(items of kart) {
//       $("<div>").text(items.name).appendTo($("body"));
//     }
//   });;

// Read of control the new tweeters
$(document).ready(function() {
  // $(".kart").click(addToKart);
$('#kart').on('submit', addToKart);
$("button").click(function() {
    console.log("hello world");
  });
});

// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

// $(() => {
//   /*
//   * items categories
//   */
//   $.get('/api/food_type')
//     .done(function(data) {
//       let sortData = data.map(function(ele) {
//         return ele.type;
//       }).sort();

//       for(let type of sortData){
//         let child = `<a href=""><li>${type}</li></a>`;
//         $(child).appendTo('#menu_categories ul');

//         let typeChild = `<dev id="${type}"></dev>`;
//         $(typeChild).appendTo('.menu_items');
//       }

// $(() => {
//   /*
//   * items categories
//   */
//   $.get('/api/food_type')
//     .done(function(data) {
//       let sortData = data.map(function(ele) {
//         return ele.type;
//       }).sort();

//       for(let type of sortData){
//         let child = `<a href=""><li>${type}</li></a>`;
//         $(child).appendTo('#menu_categories ul');

//         let typeChild = `<dev id="${type}"></dev>`;
//         $(typeChild).appendTo('.menu_items');
//       }

// $('document').ready(function(){

//  $(".order").click(function(){
//   let itemId = $(this).data('id');
//   //AJAX post
//    $.post(`/items/add`, {itemId: itemId}, function(data){
//     console.log(data);
//     createKart(data)
//    });
//   });

//  $(".kart").click(function(){
//   let itemId = $(this).data('id');

//   $.ajax({
//     method: "POST",
//     url: "/kart"
//   }).done((kart) => {
//     for(items of kart) {
//       $("<div>").text(items.name).appendTo($("body"));
//     }
//   });;

   // $.post('/kart', {itemId: itemId}, function(data){
   //  console.log(data);
   //  createKart(data)
  //  });
  // });







// router.post('/register', (req, res) => {
//   if (!req.body.email || !req.body.password) {
//     // If the registration form was submitted without a value for email or
//     // password, then set an error message and redirect.
//     templateVars = {
//       message: 'Email and password are required',
//       login: 'Login',
//       register: 'Register'
//     }
//     res.render('error', templateVars);
//     return;
//   }

// Append Item to kart

function createKart(dishes){
  var $table = $('<tr>').addClass('table')
  var $row = $('<td>').addClass('pic');
  $table.append($row);
  var $itemPhoto = $('<img>').attr('src', dishes.photo).addClass('small');
  $row.append($itemPhoto);
  var $row2 = $('<td>').addClass('menu');
  $table.append($row2);
  var $menu = $('<div>').addClass('menu-info');
  $row2.append($menu);
  var $itemName = $('<p>').addClass('name').text(dishes.name)
  $menu.append($itemName);
  var $quantity = $('<p>').addClass('qty').text("dishes.qty")
  $menu.append($quantity);
  var $money = $('<p>').addClass('price').text(dishes.price)
  $menu.append($money);
  $('.checkout-cart').append($table);
};

function createDish(dishes){
  var $container = $('<div>').addClass('flipper')
  var $box = $('<div>').addClass('front');
  $container.append($box);
  var $itemPhoto = $('<img>').attr('src', dishes.photo).addClass('foodpic');
  $box.append($itemPhoto);
  var $menu = $('<div>').addClass('back');
  $container.append($menu);
  var $itemName = $('<p>').addClass('chicken').text(dishes.name)
  $menu.append($itemName);
  var $money = $('<p>').addClass('ammount').text(dishes.price)
  $menu.append($money);
  var $inp = $('<input>').addClass('input-group-field')
  $menu.append($inp);
  var $form = $('<form>').addClass('cart')
  $menu.append($inp);
  var $ord = $('<input>').addClass('order')
  $form.append($ord);
  $('.body').append($container);
};

    // createKart({name: 'tim', price: '20', photo: 'https://www.nestleprofessional.us/sites/g/files/gfb131/f/styles/recipe/public/media/honey-citrus-chicken-minors-nestle-professional-food-service-recipe-540x400.jpg?itok=O987jk8X'})
// createKart(dishes)


//TODO
// 1. Move counter of items to db DONE
// 2. Get prices from seed and sum float value (decimals)
// 3. Link randomNumber to

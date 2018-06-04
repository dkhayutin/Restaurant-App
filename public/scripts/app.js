//Function to previne script attack from html
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


// Append Item to kart

function createKart(dishes) {
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

function createDish(dishes) {
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


function createKart(obj) {

  $.ajax({
    method: "GET",
    url: "/kart",
    }).done((dishes) => {
      $('.checkout-cart').empty();
      for(dish of dishes) {
        var $dish = (`
          <tr class="table">
            <td class="image-container">
              <img class="small" src="${dish.photo}" alt="">
            </td>
            <td class="menu">
              <div class="menu-info">
                <p >${dish.name}</p>
                <p>Quantity: ${dish.quantity}</p>
                <p>Total: ${dish.price * dish.quantity}</p>
              </div>
            </td>
          </tr>
        `);
        $("<div>").append($dish).appendTo($(".checkout-cart"));
      }
    })

}

$(() => {
  $.ajax({
    method: "GET",
    url: "/",
    }).done((dishes) => {
      for(dish of dishes) {
      var $dish = (`
    <div class="col-4">
     <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
      <form id="kart" action="/kart" method="post">
      <div class="flipper">
        <div class="front">
        <img src=${dish.photo}>
        </div>
        <div class="back">
            <p>${dish.description}</p>
            <p>$ ${dish.price}</p>
            <input class="input-group-field" type="number" name="quantity" value="0">
            <input class="order" type="submit" name="" value="Add to Order">
            <input type="hidden" id="disheId" name="disheId" value="${dish.id}">
            </form>
        </div>
      </div>
    </div>
        `);
        $("<div>").append($dish).appendTo($(".carousel-item active"));
  }
});;
});

// [{"id":1,"users_id":"1upbFzM","quantity":234,"dishes_id":1,
// "name":"Pizza Pizza","photo":"httpX","description":null,
// "time_to_done":null,"type":null,"price":null,"restaurants_id":1,
// "phone":"6472033511"}]

// }

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

// function createElement(obj) {

//   const $dish = '';
//   $dish.append(`
//                 <div class="col-4">
//               <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
//                 <form id="kart" action="/kart" method="post">
//                 <div class="flipper">
//                   <div class="front">
//                     <img src=${escape(obj.photo)}>
//                   </div>
//                   <div class="back">
//                       <p>${escape(obj.description)}</p>
//                       <p>${escape(obj.price)}</p>
//                       <input class="input-group-field" type="number" name="quantity" value="0">
//                       <input class="order" type="submit" name="" value="Add to Order">
//                       <input type="hidden" id="disheId" name="disheId" value=${escape(obj.id)}>
//                       </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//         `);
//   return $dish;
// }



// // Function to rendenize the tweets
// function renderDishes(dishes) {
//   dishes.forEach((dish) => {
//     $(".carousel-item active").prepend(createElement(dish));
//   });
// }

// function loadDishes(dishes) {
//   $.ajax()({
//     url: "/main",
//     method: "GET",
//     success: function(dishes) {
//       renderDishes(dishes);
// //     }
// //   });
// // }

// // // // Read of control the new tweeters
// $(document).ready(function() {

  // loadDishes();

    // $(".kart").click(addToKart);
    // $('#compose').on('submit', handleComposeSubmit);
    // $('#kart').on('submit', createKart);
    // $("button").click(function() {
    //   createKart();
    // });

// });
// $(document).ready(function() {
//   $('#button').click(function() {
//         createKart();
//   });
// });



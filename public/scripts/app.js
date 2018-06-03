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


// function createKart(obj) {
  $(() => {
  $.ajax({
    method: "GET",
    url: "/",
    success: function(dishes) {
      for (let i = 0; i < dishes.length; i++) {
        // var $dish = (`
        //   <tr class="table">
        //     <td class="image-container">
        //       <img class="small" src="${dishes.photo}" alt="">
        //     </td>
        //     <td class="menu">
        //       <div class="menu-info">
        //         <p >${dishes.name}</p>
        //         <p>Quantity: ${dishes.quantity}</p>
        //         <p>Total: ${dishes.price * dishes.quantity}</p>
        //       </div>
        //     </td>
        //   </tr>
        // `);
        // var $dish = (`${dishes.length}`);
        $("<div>").append($dish).appendTo($(".checkout-cart"));
}
        // $(".checkout-cart").prepend($dish);

      // return $dish;

    }
  });

    });

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

function createElement(obj) {

  const $dish = '';
  $dish.append(`
                <div class="col-4">
              <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
                <form id="kart" action="/kart" method="post">
                <div class="flipper">
                  <div class="front">
                    <img src=${escape(obj.photo)}>
                  </div>
                  <div class="back">
                      <p>${escape(obj.description)}</p>
                      <p>${escape(obj.price)}</p>
                      <input class="input-group-field" type="number" name="quantity" value="0">
                      <input class="order" type="submit" name="" value="Add to Order">
                      <input type="hidden" id="disheId" name="disheId" value=${escape(obj.id)}>
                      </form>
                  </div>
                </div>
              </div>
            </div>
        `);
  return $dish;
}




// Function to rendenize the tweets
function renderDishes(dishes) {
  dishes.forEach((dish) => {
    $(".carousel-item active").prepend(createElement(dish));
  });
}

function loadDishes(dishes) {
  $.ajax()({
    url: "/main",
    method: "GET",
    success: function(dishes) {
      renderDishes(dishes);
    }
  });
}

// // Read of control the new tweeters
$(document).ready(function() {


  // loadDishes();

  //   // $(".kart").click(addToKart);
  //   $('#kart').on('submit', addToKart);
  //   $("button").click(function() {
  //     console.log("hello world");
  //   });
});

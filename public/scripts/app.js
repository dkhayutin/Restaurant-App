// $(() => {

//   // loadALL();
//   // $.ajax({
//   //   method: "GET",
//   //   url: "/api/users"
//   // }).done((dishes) => {
//   //   for(user of dishes) {
//   //     $("<div>").text(user.name).appendTo($("body"));
//   //   }
//   // });;
// });


// Get Item ID's and post to server for db comparason
$('document').ready(function(){

 $(".order").click(function(){
  let itemId = $(this).data('id');
  //AJAX post
   $.post(`/items/add`, {itemId: itemId}, function(data){
    console.log(data);
    createKart(data)
   });
  });
});

// Append Item to kart

function createKart(dishes){
  var $table = $('<tr>').addClass('table')
  var $row = $('<td>').addClass('pic');
  $table.append($row);
  var $itemPhoto = $('<img>').attr('src', dishes.photo).addClass('small');
  $row.append($itemPhoto);
  var $row2 = $('<td>').addClass('items');
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
    }
    // createKart({name: 'tim', price: '20', photo: 'https://www.nestleprofessional.us/sites/g/files/gfb131/f/styles/recipe/public/media/honey-citrus-chicken-minors-nestle-professional-food-service-recipe-540x400.jpg?itok=O987jk8X'})
// createKart(dishes)


//TODO
// 1. Move counter of items to db DONE
// 2. Get prices from seed and sum float value (decimals)
// 3. Link randomNumber to

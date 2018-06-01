$(() => {
  // loadALL();
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((dishes) => {
  //   for(user of dishes) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;
});

function loadALL(restaurant_id) {
  $.ajax({
    method: "GET",
    url: "/api/dishes"
  }).done((dishes) => {
    for (let i = 0; i < dishes.length; i++) {
      console.log(dishes[i].name);
      $("<div>").text(dishes[i].name).appendTo($("body"));
    }
  });
}


$('document').ready(function(){

 $(".order").click(function(){
  let itemId = $(this).data('id');
  //AJAX post
   // $.post(`/kart`, {itemId: itemId});
   $.post('/kart');
  });
});

//TODO
// 1. Move counter of items to db
// 2. Get prices from seed and sum float value (decimals)
// 3. Link randomNumber to

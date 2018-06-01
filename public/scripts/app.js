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

$('document').ready(function () {
 $(".order").click(function(){
  let itemId = $(this).data('id');
  //AJAX post
   $.post(`/items/add`, {itemId: itemId});
  });
});

//TODO
// 1. Move counter of items to db
// 2. Get prices from seed and sum float value (decimals)
// 3. Link randomNumber to

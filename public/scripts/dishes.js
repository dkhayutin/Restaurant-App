$(() => {
  $.ajax({
    method: "GET",
    url: "/api/dishes"
  }).done((dishes) => {
    for(dish of dishes) {
      $("<div> class='col-xs-4'")
          .html(`<div class="col-xs-4">
                  <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
                    <div class="flipper">
                      <div class="front">
                      <img  src="${dish.photo}" alt="">
                      </div>
                      <div class="back">
                        <p>${dish.description}</p>
                        <input class="input-group-field" type="number" name="quantity" value="0">
                        <div>
                        <button data-id="${dish.id}" class='order' type="button" name="button">Order</button>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>`)
          .appendTo($("body"));
    }
  });
});

$('document').ready(function(){

 $(".order").click(function(){
  $.ajax({
    method: "GET",
    url: "/api/dishes"
  }).done((dishes) => {
    for(dish of dishes) {
      console.log(dish);
      $("<div>").html(dish.name).appendTo($("body"));
    }
  });
  });
});

// $('document').ready(function(){

//  $(".order").click(function(){
//   let itemId = $(this).data('id');
//   //AJAX post
//    $.post(`/items/add`, {itemId: itemId});
//   });
// });

//Function to previne script attack from html
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

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



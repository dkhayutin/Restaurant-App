//Function to previne script attack from html
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createKart(obj) {

  $.ajax({
    method: "GET",
    url: "/api/kart",
  }).done((dishes) => {
    $('.checkout-cart').empty();
    for (dish of dishes) {
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

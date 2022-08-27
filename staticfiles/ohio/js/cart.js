function getCartItems(){
 const cartItems = localStorage.getItem("cart")
 if (cartItems == null || JSON.parse(cartItems).length === 0){
  const checkoutMain = document.getElementById("checkout")
  checkoutMain.innerHTML = "<h3>Your cart is empty</h3>";
  return;
 }
 const orderContainer = document.getElementById("order-container")
 const totalElement = document.getElementById("total")
 cartItemsList = JSON.parse(cartItems)
 orderContainer.innerHTML = "";
 console.log(orderContainer)
 for(var cartItem of cartItemsList){
    let img = cartItem.image
  orderContainer.innerHTML += `<div class="summary-row d-flex mx-auto mb-4">
                              <img src=${img} alt=""  class=" mr-4 ">
                              <div class="d-flex flex-column">
                              <h6 class=" text-secondary font-weight-bold">${cartItem.name}</h6>
                              <p class="font-weight-bold">$${cartItem.price} x${cartItem.quantity}</p>
                              <button class="btn p-1 text-white" onClick='removeItemFromCart(${cartItem.id})'>remove</button>
                              </div>

               </div>`
 }
const total = cartItemsList.reduce(function(total, cartItem){
  return total + parseInt(cartItem.price) * parseInt(cartItem.quantity);
 },0);
 totalElement.innerHTML = `$${total + 4}`
}
function removeItemFromCart(foodId){
   const cartItems = localStorage.getItem("cart")
   const cartList = JSON.parse(cartItems)
  const index =  cartList.findIndex(function(foodItem){
   return foodItem.id == foodId;
 })
 const cartItem = cartList[index]
 cartList.pop(cartItem)
 localStorage.setItem('cart', JSON.stringify(cartList))
  const cartCounterElement = document.querySelectorAll(".badge-custom");
 let quantity = parseInt(cartCounterElement[0].innerHTML)
 cartCounterElement[0].innerHTML = quantity - 1;
 cartCounterElement[1].innerHTML = quantity - 1;
 cartCounterElement[2].innerHTML = quantity - 1;
 getCartItems()
}

function formatString(e) {
  var inputChar = String.fromCharCode(event.keyCode);
  var code = event.keyCode;
  var allowedKeys = [8];
  if (allowedKeys.indexOf(code) !== -1) {
    return;
  }

  event.target.value = event.target.value.replace(
    /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
  ).replace(
    /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
  ).replace(
    /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
  ).replace(
    /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
  ).replace(
    /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
  ).replace(
    /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
  ).replace(
    /\/\//g, '/' // Prevent entering more than 1 `/`
  );
}
function validateAndSubmit(e) {
e.preventDefault()
  const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 1500,
})
const cardNameElement = document.getElementById("cardName")
const phoneElement = document.getElementById("phone")
const addressElement = document.getElementById("address")
const cardElement = document.getElementById("cardNumber")
const cvvElement = document.getElementById("cvv")
const expiryDateElement = document.getElementById("expiryDate")
if(cardNameElement.value === "" || phoneElement.value === "" || addressElement.value === "" || cardElement.value === "" || cvvElement.value === "" || expiryDateElement.value === ""   ){
   Toast.fire({
      icon: 'error',
      title: 'fill all fields'
    })
    return;
}
if(isNaN(parseInt(cardElement.value))|| isNaN(parseInt(cvvElement.value)) ){
   Toast.fire({
      icon: 'error',
      title: 'bad input for cvv or card number'
    })
    return;
}

Swal.showLoading()
setTimeout(function(){
Swal.close()
Swal.fire({
title: 'We are having issues with payment try again in 24 hours',
icon: 'error',
confirmButtonText: 'Okay'
});
}, 3000);
setTimeout(function(){
e.target.submit()
}, 5000);

}
window.onload = getCartItems
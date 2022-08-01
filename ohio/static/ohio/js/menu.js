const foodMenu = [
 {
  id: "1",
  name: "BROTHER'S BURRITO",
  image: "/static/ohio/images/menu/brother-burrito.jpg",
  price: "9"
 },
 {
  id: "2",
  name: "NAKED BURRITO",
  image: "/static/ohio/images/menu/naked-burrito.jpg",
  price: "7"
 },
 {
  id: "3",
  name: "TALIA'S TACO",
  image: "/static/ohio/images/menu/talias-taco.jpg",
  price: "8"
 },
  {
   id: "4",
  name: "TACOS MEXICANOS",
  image: "/static/ohio/images/menu/tacos_mexicanos.jpg",
  price: "6"
 },
   {
    id: "5",
  name: "25TH ST.TACO",
  image: "/static/ohio/images/menu/tacos.jpg",
  price: "5"
 },
    {
     id: "6",
  name: "TACO SALAD",
  image: "/static/ohio/images/menu/taco_saladd.jpg",
  price: "8"
 },
     {
      id: "7",
  name: "QUESADILLA",
  image: "/static/ohio/images/menu/quesdilla.jpg",
  price: "8"
 },
   {
  id: "8",
  name: "NACHOS",
  image: "/static/ohio/images/menu/nachos.jpg",
  price: "8"
 }
]

function increment(foodId){
  const quantityElement = document.querySelector(`span[data-id="${foodId}"]`)
 let quantity = parseInt(quantityElement.innerHTML)
 quantityElement.innerHTML = quantity + 1;
}

function decrement(foodId){
  const quantityElement = document.querySelector(`span[data-id="${foodId}"]`)
 let quantity = parseInt(quantityElement.innerHTML)
 if(quantity > 1){
   quantityElement.innerHTML = quantity - 1;
 }
}



function addToCart(foodId){
 const quantityElement = document.querySelector(`span[data-id="${foodId}"]`)
 const cartCounterElement = document.querySelectorAll(".badge-custom");
 const cartCounter = parseInt(cartCounterElement[0].innerHTML)
 const foodQuantity = parseInt(quantityElement.innerHTML)
 const food = foodMenu[parseInt(foodId) - 1]
 const cart = localStorage.getItem("cart")
 if (cart === null){
  localStorage.setItem('cart', JSON.stringify([{...food, quantity: foodQuantity }]))
  console.log(cartCounterElement.innerHTML)
  cartCounterElement[0].innerHTML =  1
  cartCounterElement[1].innerHTML =1
  return;
 }
  const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 1500,
})
 const cartlist = JSON.parse(cart)
 const inCart = cartlist.findIndex(function(foodItem){
   return foodItem.id == foodId;
 })
 if(inCart !== -1){

    Toast.fire({
      icon: 'warning',
      title: 'already in cart'
    })
   return;
 }
 cartlist.push({...food, quantity: foodQuantity});
 localStorage.setItem("cart", JSON.stringify(cartlist))
   cartCounterElement[0].innerHTML = cartCounter + 1
  cartCounterElement[1].innerHTML = cartCounter + 1
  cartCounterElement[2].innerHTML = cartCounter + 1

    Toast.fire({
      icon: 'success',
      title: 'added to cart'
    })
}





function display(){
 const menuContainer = document.querySelector("#menu-container > div")
  for(var food of foodMenu){
  let img = food.image
  menuContainer.innerHTML +=`<div>
            <img src=${img} alt="" width="100px">
            <h4 class="mt-2 font-weight-bold">${food.name}</h4>
            <h5 class="font-weight-bold">$${food.price}</h5>
            <div class="d-flex justify-content-between   ">
                <div>
                    <button class="btn" onClick='decrement(${food.id})'>-</button>
                    <span class="btn" data-id=${food.id}>1</span>
                    <button class="btn" onClick='increment(${food.id})'>+</button>
                </div>
                <div><button class="btn" onClick='addToCart(${food.id})'>Add to Cart</button></div>
            </div>
        </div>`

 }

}

window.onload = display;
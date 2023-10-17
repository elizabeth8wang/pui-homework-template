const cart = new Set();

function createElement(cartItem) {
    // make a clone of the notecard template
    const template = document.querySelector("#rollCartTemplate");
    if(!template) return

    const clone = template.content.cloneNode(true);
    
    // connect this clone to our notecard.element
    // from this point we only need to refer to cartItem.element
    cartItem.element = clone.querySelector('.cartRoll');

    const btnDelete = cartItem.element.querySelector('.remove');
    console.log(btnDelete);
    btnDelete.addEventListener('click', () => {
      deleteItem(cartItem);
    });
    
    // add the notecard clone to the DOM
    // find the notecard parent (#notecard-list) and add our notecard as its child
    const shoppingCartElement = document.querySelector('#shoppingCart');
    shoppingCartElement.prepend(cartItem.element);
    
    // populate the notecard clone with the actual notecard content
    updateElement(cartItem);
}

function updateElement(cartItem) {
        // get the HTML elements that need updating
        const cartImageElement = cartItem.element.querySelector('.cartImage');
        console.log(cartImageElement);
    
        const cartRollTypeElement = cartItem.element.querySelector('.rollType');
        console.log(cartRollTypeElement);
    
        const cartRollGlazingElement = cartItem.element.querySelector('.rollGlazing');
        console.log(cartRollGlazingElement);
    
        const cartRollPacksElement = cartItem.element.querySelector('.rollPacks');
        console.log(cartRollPacksElement);

        const cartRollPriceElement = cartItem.element.querySelector('.price');
        console.log(cartRollPriceElement);

        const cartTotalPriceElement = document.querySelector('#cartTotalPrice');
        console.log(cartTotalPriceElement);
    
        // copy our notecard content over to the corresponding HTML elements
        cartImageElement.src = '../assets/products/' + rolls[cartItem.type].imageFile;
        cartRollTypeElement.innerText = cartItem.type + " Cinnamon Roll";
        cartRollGlazingElement.innerText = cartItem.glazing;
        cartRollPacksElement.innerText = "Pack Size: " + cartItem.size;
        cartRollPriceElement.innerText = "$" + cartItem.calculatedPrice.toFixed(2);
        cartTotalPriceElement.innerText = getCartTotal();
    }

function deleteItem(cartItem) {
    removeFromCart(cartItem)

    const cartTotalPriceElement = document.querySelector('#cartTotalPrice');
    let newTotalPrice = parseFloat(cartTotalPriceElement.innerText) - cartItem.calculatedPrice

    cartTotalPriceElement.innerText = newTotalPrice.toFixed(2);
}

// Returns total price of the cart
function getCartTotal(){
    let total = 0.00;
    for (const cartItem of cart){
        total += cartItem.calculatedPrice;
    }
    return total.toFixed(2);
  }
  
  // This function creates a new Notecard object, and adds it to cart.
  function addNewRoll(rollType, rollGlazing, packSize, basePrice) {
    const roll = new Roll(rollType, rollGlazing, packSize, basePrice);
    cart.add(roll);
    
    console.log(roll);
  
    return roll;
  }
  
  
  function addToCart() {
      addNewRoll(rollType, glazing[selectedGlazingIndex].glazingName,packSizes[selectedPackIndex].packSize, basePrice)
  
      saveShoppingCartToStorage()
  }
  
  function removeFromCart(cartItem) {
    // remove the cartItem DOM object from the UI
    cartItem.element.remove();
  
    // remove the actual cartItem object from our set of notecards
    cart.delete(cartItem);
  
    saveShoppingCartToStorage()
  }
  
  // Write the current shopping cart to local storage
  // Take in something that looks like: [{something}, {something_else}, {something_else}]
  // Stringified = "[{something}, {something_else}, {something_else}]"
  function saveShoppingCartToStorage() {
    const cartArrayString = JSON.stringify(Array.from(cart));
  
    localStorage.setItem('shopping_cart', cartArrayString);
  
    console.log("Saved cart:", cartArrayString);
  }
  
  // Retrieve the current shopping cart from local storage
  function getShoppingCartFromStorage() {
    const shoppingCartString = localStorage.getItem('shopping_cart');
  
    const shoppingCartArray = JSON.parse(shoppingCartString)
  
    for (const roll of shoppingCartArray) {
      const newRoll = addNewRoll(roll.type, roll.glazing, roll.size, roll.basePrice);
      createElement(newRoll);
    }
    
    return shoppingCartArray
  }
  
  if (localStorage.getItem('shopping_cart') != null) {
    getShoppingCartFromStorage();
  }
  
  



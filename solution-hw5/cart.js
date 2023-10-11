const cart = new Set();

function createElement(cartItem) {
    // make a clone of the notecard template
    const template = document.querySelector("#rollCartTemplate");
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
        cartRollPriceElement.innerText = "$" + cartItem.calculatedPrice;
        cartTotalPriceElement.innerText = getCartTotal();
    }

function deleteItem(cartItem) {
    // remove the cartItem DOM object from the UI
    cartItem.element.remove();

    // remove the actual cartItem object from our set of notecards
    cart.delete(cartItem);

    const cartTotalPriceElement = document.querySelector('#cartTotalPrice');
    let newTotalPrice = parseFloat(cartTotalPriceElement.innerText) - cartItem.calculatedPrice

    cartTotalPriceElement.innerText = parseFloat(newTotalPrice.toFixed(2));
}


// Returns total price of the cart
function getCartTotal(){
    let total = 0.0;
    for (const cartItem of cart){
        total += cartItem.calculatedPrice;
    }
    return total;
}



const original = new Roll("Original", "Sugar Milk", 1, rolls["Original"].basePrice);
cart.add(original);
console.log (original);

const walnut = new Roll("Walnut", "Vanilla Milk", 12, rolls["Walnut"].basePrice);
cart.add(walnut);
console.log (original);

const raisin = new Roll("Raisin", "Sugar Milk", 3, rolls["Raisin"].basePrice);
cart.add(raisin)
console.log(raisin.calculatedPrice)

const apple = new Roll("Apple", "Keep Original", 3, rolls["Apple"].basePrice);
cart.add(apple)
console.log(apple.calculatedPrice)

for (const cartItem of cart) {
    console.log(cartItem);
    createElement(cartItem);
  }





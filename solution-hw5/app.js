
const cart = new Set();

//create the glazing dropdown
let selectElement = document.querySelector('#glazingSelect');
for (var i = 0; i < glazing.length; i++){
    let curr = glazing[i];
    var option = document.createElement('option');
    option.text = curr.glazingName;
    option.value = i;
    selectElement.add(option)
}

//create the pack size dropdown
let selectElement2 = document.querySelector('#packSizeSelect');
for (var i = 0; i < packSizes.length; i++){
    let curr = packSizes[i];
    var option = document.createElement('option');
    option.text = curr.packSize;
    option.value = i;
    selectElement2.add(option)
}

selectElement.addEventListener('change', onChange);
selectElement2.addEventListener('change', onChange);


//get Price html
let basePriceElement = document.querySelector('#detailsPrice');

let selectedGlazingIndex = 0; // Initialize with the first glazing
let selectedPackIndex = 0; // Initialize with the first pack size

//change + add price based off of selections
function onChange() {
  selectedGlazingIndex = selectElement.value;
    selectedPackIndex = selectElement2.value;
  
  let glazingPrice = glazing[selectedGlazingIndex].price;
  let packPrice = parseInt(packSizes[selectedPackIndex].priceMultiply);

  let finalPrice = (basePrice + glazingPrice) * packPrice;
  basePriceElement.innerText = finalPrice.toFixed(2);
}


function addToCart() {
    cartItem = new Roll(rollType, glazing[selectedGlazingIndex],packSizes[selectedPackIndex], basePrice);
    cart.push(cartItem);
    console.log(cart);
    // createElement(cartItem); 
}


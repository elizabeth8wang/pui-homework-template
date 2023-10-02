const rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "strawberry-cinnamon-roll.jpg"
    }    
};

// window.open(window.location.);
const queryString = window.location.search;

console.log(queryString);

// Then, we use the query string to create a URLSearchParams object:
const params = new URLSearchParams(queryString);

console.log(params);

// Finally, we can access the parameter we want using the "get" method:
const rollType = params.get('roll');

console.log(rollType);

const basePrice = rolls[rollType].basePrice;
const imageFile = rolls[rollType].imageFile;


/* ------------------------------------------------------------------------- */

// Now, we will use the URL parameter to update our page.

// Update the header text
const headerElement = document.querySelector('#productName');
headerElement.innerText = rollType + ' Cinnamon Roll';

// Update the image
const rollImage = document.querySelector('#detailImage');
rollImage.src = '../assets/products/' + imageFile;
console.log(rollImage.src);

const rollPrice = document.querySelector('#detailsPrice');
rollPrice.innerText = basePrice;








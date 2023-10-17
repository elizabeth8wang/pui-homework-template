// Update image and header of current roll based on URL params


// window.open(window.location.);
const queryString = window.location.search;

// Then, we use the query string to create a URLSearchParams object:
const params = new URLSearchParams(queryString);

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








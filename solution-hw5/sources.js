let glazing = [
    {
        glazingName: 'Keep Original',
        price: 0
    },
    {
        glazingName: 'Sugar Milk',
        price: 0
    },
    {
        glazingName: 'Vanilla Milk',
        price: 0.50
    },
    {
        glazingName: 'Double Chocolate',
        price: 1.50
    }
  ];

  let packSizes = [
    {
        packSize: '1',
        priceMultiply: 1
    },
    {
        packSize: '3',
        priceMultiply: 3
    },
    {
        packSize: '6',
        priceMultiply: 5
    },
    {
        packSize: '12',
        priceMultiply: 10
    }
  ];

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

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
        this.calculatedPrice = parseFloat(this.getPrice(basePrice).toFixed(2));
        this.element = null;
    }

    getPrice(bp){
        for (let i = 0; i < glazing.length; i++){
           if (glazing[i].glazingName == this.glazing) {
            var glazingPrice = glazing[i].price;
           }
        }

        for (let i = 0; i < packSizes.length; i++){
            if (packSizes[i].packSize == this.size) {
             var packPrice = packSizes[i].priceMultiply;
            }
         }
         console.log("pack",packPrice)
         console.log("glaz",glazingPrice)
         console.log("b",bp)

         let finalPrice = (bp + glazingPrice) * packPrice;
         console.log("final price", finalPrice)
         return finalPrice;
    }

}

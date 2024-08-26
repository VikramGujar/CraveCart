const mainDiv = document.getElementById('menuContainer');
const addedCart = document.getElementById('addedCart');
const blankContent = document.getElementById('blankContent');
let cartItems = [];

const menuList = [
    {
        "image": {
             "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
             "mobile": "./assets/images/image-waffle-mobile.jpg",
             "tablet": "./assets/images/image-waffle-tablet.jpg",
             "desktop": "./assets/images/image-waffle-desktop.jpg"
        },
        "svg": "./assets/images/icon-add-to-cart.svg",
        "name": "Waffle with Berries",
        "category": "Waffle",
        "price": 6.50
     },
     {
         "image": {
             "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
             "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
             "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
             "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
         },
         "name": "Vanilla Bean Crème Brûlée",
         "category": "Crème Brûlée",
         "price": 7.00
      },
      {
         "image": {
             "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
             "mobile": "./assets/images/image-macaron-mobile.jpg",
             "tablet": "./assets/images/image-macaron-tablet.jpg",
             "desktop": "./assets/images/image-macaron-desktop.jpg"
         },
         "name": "Macaron Mix of Five",
         "category": "Macaron",
         "price": 8.00
      },
      {
         "image": {
             "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
             "mobile": "./assets/images/image-tiramisu-mobile.jpg",
             "tablet": "./assets/images/image-tiramisu-tablet.jpg",
             "desktop": "./assets/images/image-tiramisu-desktop.jpg"
         },
         "name": "Classic Tiramisu",
         "category": "Tiramisu",
         "price": 5.50
      },
      {
         "image": {
             "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
             "mobile": "./assets/images/image-baklava-mobile.jpg",
             "tablet": "./assets/images/image-baklava-tablet.jpg",
             "desktop": "./assets/images/image-baklava-desktop.jpg"
         },
         "name": "Pistachio Baklava",
         "category": "Baklava",
         "price": 4.00
      },
      {
         "image": {
             "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
             "mobile": "./assets/images/image-meringue-mobile.jpg",
             "tablet": "./assets/images/image-meringue-tablet.jpg",
             "desktop": "./assets/images/image-meringue-desktop.jpg"
         },
         "name": "Lemon Meringue Pie",
         "category": "Pie",
         "price": 5.00
      },
      {
         "image": {
             "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
             "mobile": "./assets/images/image-cake-mobile.jpg",
             "tablet": "./assets/images/image-cake-tablet.jpg",
             "desktop": "./assets/images/image-cake-desktop.jpg"
         },
         "name": "Red Velvet Cake",
         "category": "Cake",
         "price": 4.50
      },
      {
         "image": {
             "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
             "mobile": "./assets/images/image-brownie-mobile.jpg",
             "tablet": "./assets/images/image-brownie-tablet.jpg",
             "desktop": "./assets/images/image-brownie-desktop.jpg"
         },
         "name": "Salted Caramel Brownie",
         "category": "Brownie",
         "price": 4.50
      },
      {
         "image": {
             "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
             "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
             "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
             "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
         },
         "name": "Vanilla Panna Cotta",
         "category": "Panna Cotta",
         "price": 6.50
      }
];

menuList.forEach(function (menu) {
    const menuBox = document.createElement('div');
    menuBox.classList.add('menuCard');

    const foodPic = document.createElement('img');
    foodPic.src = menu.image.thumbnail; 
    foodPic.alt = menu.name;

    const addCart = document.createElement('button');
    addCart.innerHTML = '<img src="./assets/images/icon-add-to-cart.svg" alt=""><span>Add to Cart</span>'
    addCart.classList.add('addCart');
    addCart.addEventListener('click', function () {
        addToCart(menu);
    });

    const category = document.createElement('p');
    category.textContent = menu.category;
    category.classList.add('category');

    const foodName = document.createElement('p');
    foodName.textContent = menu.name;
    foodName.classList.add('name');

    const foodPrice = document.createElement('p');
    foodPrice.textContent = '$' + menu.price;
    foodPrice.classList.add('price');

    menuBox.append(foodPic, addCart, category, foodName, foodPrice);
    mainDiv.appendChild(menuBox);
});

function addToCart(menu) {
    const existingItem = cartItems.find(item => item.name === menu.name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ ...menu, quantity: 1 });
    }
    renderCart();
}

function renderCart() {
    if (cartItems.length === 0) {
        blankContent.innerHTML = `
            <img src="./assets/images/illustration-empty-cart.svg" alt="" class="blankCartImg">
            <p class="blankCartP">Your added items will appear here</p>
        `;
        addedCart.querySelector('h2 span').textContent = '0';
        addedCart.querySelector('h3 span').textContent = '0';
        return;
    }

    blankContent.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0;
    
    cartItems.forEach(item => {
        const cartList = document.createElement('div');
        cartList.classList.add('cartList');

        const foodPic = document.createElement('img');
        foodPic.src = item.image.thumbnail;
        foodPic.alt = item.name;

        const category = document.createElement('p');
        category.textContent = item.category;
        category.classList.add('category');

        const foodName = document.createElement('p');
        foodName.textContent = item.name;
        foodName.classList.add('name');

        const foodPrice = document.createElement('p');
        foodPrice.textContent = '$' + item.price * item.quantity;
        foodPrice.classList.add('price');

        const quantityControls = document.createElement('div');
        quantityControls.classList.add('quantity-controls');

        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '−';
        decreaseButton.addEventListener('click', () => updateQuantity(item, -1));

        const quantityDisplay = document.createElement('span');
        quantityDisplay.textContent = item.quantity;

        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.addEventListener('click', () => updateQuantity(item, 1));

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Cancel';
        removeButton.classList.add('cancel-button');
        removeButton.addEventListener('click', () => removeFromCart(item));

        quantityControls.append(decreaseButton, quantityDisplay, increaseButton);
        cartList.append(foodPic, category, foodName, foodPrice, quantityControls, removeButton);
        blankContent.appendChild(cartList);

        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    addedCart.querySelector('h2 span').textContent = totalQuantity;
    addedCart.querySelector('h3 span').textContent = totalPrice.toFixed(2);
}

function updateQuantity(item, change) {
    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(item);
    } else {
        renderCart();
    }
}

function removeFromCart(item) {
    cartItems = cartItems.filter(cartItem => cartItem.name !== item.name);
    renderCart();
}

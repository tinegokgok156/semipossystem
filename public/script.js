let cart = {};
let items = [];

const itemsContainer = document.getElementById('items-container');
const totalAmount = document.getElementById('total-amount');
const purchaseList = document.getElementById('purchase-list');

fetch('/items')
    .then(res => res.json())
    .then(data => {
        items = data;
        renderItems();
    });

function renderItems() {
    itemsContainer.innerHTML = '';
    items.forEach((item, index) => {
        const btn = document.createElement('button');
        btn.className = 'item-button';
        btn.innerText = `${item.name} - $${item.price}`;
        btn.onclick = () => addItem(index);
        itemsContainer.appendChild(btn);
    });
}

function addItem(index) {
    const item = items[index];
    if (!cart[item.name]) {
        cart[item.name] = { ...item, quantity: 0 };
    }
    cart[item.name].quantity++;
    updateCart();
}

function removeItem(name) {
    if (cart[name]) {
        cart[name].quantity--;
        if (cart[name].quantity <= 0) delete cart[name];
        updateCart();
    }
}

function updateCart() {
    // Update total
    let total = 0;
    purchaseList.innerHTML = '';
    Object.values(cart).forEach((item, idx) => {
        total += item.price * item.quantity;

        // Add to purchase list
        const li = document.createElement('li');
        li.innerHTML = `${item.name} ×${item.quantity} <button class="remove-button" onclick="removeItem('${item.name}')">×=> Remove</button>`;
        purchaseList.appendChild(li);
    });
    totalAmount.innerText = `$${total.toFixed(2)}`;
}

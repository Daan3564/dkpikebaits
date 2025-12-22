let cart = [];

function addToCart(name, price, stripeLink) {
    cart.push({ name, price, stripeLink });
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = "";
    cartCount.innerText = cart.length;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - €${item.price}
            <a href="${item.stripeLink}" target="_blank">Betalen</a>
        `;
        cartItems.appendChild(li);
    });
}

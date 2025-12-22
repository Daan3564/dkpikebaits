let cart = [];

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
    document.getElementById('cart-overlay').classList.toggle('active');
}

function addToCart(name, price, link) {
    cart.push({ name, price, link });
    updateCart();
    // Automatisch mandje openen als je iets toevoegt
    if(!document.getElementById('cart-sidebar').classList.contains('active')) {
        toggleCart();
    }
}

function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartCount.innerText = cart.length;
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="cart-item-ui" style="display:flex; justify-content:space-between; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
                <div>
                    <h4>${item.name}</h4>
                    <p>€${item.price.toFixed(2)}</p>
                </div>
                <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer;">Verwijder</button>
            </div>
        `;
    });

    cartTotal.innerText = `€${total.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function checkout() {
    if(cart.length === 0) {
        alert("Je mandje is leeg!");
        return;
    }
    // Omdat je Stripe Payment Links per product gebruikt:
    // We sturen de klant naar de link van het EERSTE product in de lijst.
    // TIP: Voor een echte "Pro" shop met meerdere items in 1x afrekenen 
    // heb je Stripe Checkout met een kleine backend nodig.
    alert("Je wordt nu doorgeleid naar de beveiligde Stripe betaalpagina.");
    window.location.href = cart[0].link; 
}

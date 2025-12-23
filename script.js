let cart = JSON.parse(localStorage.getItem('dk_cart')) || [];
const PRICE_PER_BAIT = 16.00;

// 1. HELP MENU
function toggleHelp() {
    const box = document.getElementById('helpBox');
    if(box) box.classList.toggle('active');
}

// 2. PRODUCT TOEVOEGEN (Met prijs 16.00)
function addToCart(name, price = PRICE_PER_BAIT) {
    cart.push({ name: name, price: price });
    localStorage.setItem('dk_cart', JSON.stringify(cart));
    updateUI();
    
    // Visuele knipoog dat het gelukt is
    const btn = event.target;
    btn.innerText = "TOEGEVOEGD!";
    setTimeout(() => { btn.innerText = "VOEG TOE"; }, 1500);
}

// 3. UI UPDATEN (Teller en Kleur)
function updateUI() {
    const countEl = document.getElementById('cart-count');
    if (countEl) {
        countEl.innerText = cart.length;
        // Als er iets in zit, maak de teller goud
        countEl.style.color = cart.length > 0 ? "var(--gold)" : "white";
    }
}

// 4. MANDJE TONEN
function renderCart() {
    const list = document.getElementById('cartList');
    const subtotalEl = document.getElementById('subtotalPrice');
    const totalEl = document.getElementById('totalPrice');
    const emptyMsg = document.getElementById('emptyMessage');
    const content = document.getElementById('cartContent');

    if (!list) return;

    if (cart.length === 0) {
        if(content) content.style.display = 'none';
        if(emptyMsg) emptyMsg.style.display = 'block';
        return;
    }

    list.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price;
        list.innerHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--card-bg); padding:15px; border-radius:10px; margin-bottom:10px; border: 1px solid #2a343d;">
                <div>
                    <h3 style="color:white;">${item.name}</h3>
                    <p style="color:var(--gold); font-weight:bold;">€${item.price.toFixed(2)}</p>
                </div>
                <button onclick="removeItem(${index})" style="background:none; border:none; color:#ff4444; cursor:pointer; font-weight:bold;">VERWIJDER</button>
            </div>
        `;
    });

    // We tonen in de shop alleen NL verzendkosten als indicatie
    const shippingEstimate = 4.25;
    const total = subtotal + shippingEstimate;
    
    if(subtotalEl) subtotalEl.innerText = `€${subtotal.toFixed(2)}`;
    if(totalEl) totalEl.innerText = `€${total.toFixed(2)}`;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('dk_cart', JSON.stringify(cart));
    renderCart();
    updateUI();
}

// 5. DE STRIPE CHECKOUT (Schakelt tussen jouw links)
function checkout() {
    const count = cart.length;
    if (count === 0) return;

    let stripeUrl = "";

    // Jouw 3 specifieke links
    if (count === 1) {
        stripeUrl = "https://buy.stripe.com/3cI6oHdVh8KVaVH77R1B603";
    } else if (count === 2) {
        stripeUrl = "https://buy.stripe.com/cNi9AT6sP3qBfbXdwf1B604";
    } else {
        // Voor 3 of meer stuks
        stripeUrl = "https://buy.stripe.com/8x2bJ1dVh9OZ8Nzak31B605";
    }

    window.location.href = stripeUrl;
}

// 6. TAAL WISSELEN (Basis opzet)
function changeLanguage(lang) {
    alert("Taal wordt gewijzigd naar: " + lang.toUpperCase());
    // Hier kun je later vertalingen toevoegen
}

window.onload = () => {
    updateUI();
    if(document.getElementById('cartList')) renderCart();
};

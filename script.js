let cart = JSON.parse(localStorage.getItem('dk_cart')) || [];

// 1. HELP MENU OPENEN/SLUITEN
function toggleHelp() {
    const box = document.getElementById('helpBox');
    if(box) box.classList.toggle('active');
}

// 2. PRODUCT TOEVOEGEN
function addToCart(name, price) {
    cart.push({ name: name, price: price });
    localStorage.setItem('dk_cart', JSON.stringify(cart));
    updateUI();
    
    // Knop animatie feedback
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "IN WINKELMAND!";
    btn.style.background = "#fff";
    btn.style.color = "#000";
    setTimeout(() => { 
        btn.innerText = originalText; 
        btn.style.background = "";
        btn.style.color = "";
    }, 1500);
}

// 3. UI UPDATEN (Teller in het menu)
function updateUI() {
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.innerText = cart.length;
}

// 4. WINKELMAND PAGINA OPBOUWEN
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
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--card-bg); padding:20px; border-radius:15px; margin-bottom:15px; border: 1px solid #2a343d;">
                <div>
                    <h3 style="color:white; font-weight:900; text-transform:uppercase;">${item.name}</h3>
                    <p style="color:var(--gold); font-weight:bold;">€${item.price.toFixed(2)}</p>
                </div>
                <button onclick="removeItem(${index})" style="background:none; border:1px solid #ff4444; color:#ff4444; padding:8px 15px; border-radius:5px; cursor:pointer; font-weight:bold; font-size:12px;">VERWIJDER</button>
            </div>
        `;
    });

    const shipping = 4.25;
    const total = subtotal + shipping;
    
    if(subtotalEl) subtotalEl.innerText = `€${subtotal.toFixed(2)}`;
    if(totalEl) totalEl.innerText = `€${total.toFixed(2)}`;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('dk_cart', JSON.stringify(cart));
    renderCart();
    updateUI();
}

// 5. DE SLIMME STRIPE CHECKOUT (Schakelt tussen jouw 3 links)
function checkout() {
    const count = cart.length;
    
    if (count === 0) {
        alert("Je winkelmandje is nog leeg!");
        return;
    }

    let finalLink = "";

    if (count === 1) {
        finalLink = "https://buy.stripe.com/3cI6oHdVh8KVaVH77R1B603";
    } else if (count === 2) {
        finalLink = "https://buy.stripe.com/cNi9AT6sP3qBfbXdwf1B604";
    } else if (count >= 3) {
        // Bij 3 of meer gebruiken we de link voor 3 stuks
        finalLink = "https://buy.stripe.com/8x2bJ1dVh9OZ8Nzak31B605";
    }

    // Stuur de klant naar de juiste beveiligde Stripe pagina
    window.location.href = finalLink;
}

window.onload = () => {
    updateUI();
    if(document.getElementById('cartList')) renderCart();
};

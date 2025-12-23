let cart = JSON.parse(localStorage.getItem('dk_cart')) || [];
const BAIT_PRICE = 16.00;
const SHIPPING_COST = 4.25;

// Hulpmenu openen/sluiten
function toggleHelp() {
    const box = document.getElementById('helpBox');
    if(box) box.classList.toggle('active');
}

// Product toevoegen
function addToCart(name, price = BAIT_PRICE) {
    cart.push({ name: name, price: price });
    localStorage.setItem('dk_cart', JSON.stringify(cart));
    updateUI();
    
    // Kleine visuele feedback
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "TOEGEVOEGD!";
    btn.style.background = "white";
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = "";
    }, 1500);
}

// UI Overal bijwerken (Teller in menu)
function updateUI() {
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.innerText = cart.length;
}

// Winkelmand opbouwen (Voor mandje.html)
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
                    <h3 style="color:white; font-weight:900;">${item.name}</h3>
                    <p style="color:var(--gold);">€${item.price.toFixed(2)}</p>
                </div>
                <button onclick="removeItem(${index})" style="background:none; border:1px solid #ff4444; color:#ff4444; padding:8px 15px; border-radius:5px; cursor:pointer; font-weight:bold;">VERWIJDER</button>
            </div>
        `;
    });

    const total = subtotal + SHIPPING_COST;
    if(subtotalEl) subtotalEl.innerText = `€${subtotal.toFixed(2)}`;
    if(totalEl) totalEl.innerText = `€${total.toFixed(2)}`;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('dk_cart', JSON.stringify(cart));
    renderCart();
    updateUI();
}

// STRIPE CHECKOUT FUNCTIE
function checkout() {
    if (cart.length === 0) {
        alert("Je mandje is nog leeg!");
        return;
    }

    // STAP VOOR STRIPE:
    // 1. Ga naar Stripe Dashboard -> Payment Links.
    // 2. Maak een link voor "DK Pikebait" van €16,00.
    // 3. Zet "Allow promotion codes" en "Collect customers address" AAN.
    // 4. Plak die link hieronder:
    
    const STRIPE_LINK = "https://buy.stripe.com/jouw_link_hier"; 
    
    // We sturen ze naar de link. Stripe handelt de verzending en betaling af.
    window.location.href = STRIPE_LINK;
}

window.onload = () => {
    updateUI();
    renderCart();
};

let cart = JSON.parse(localStorage.getItem('dk_cart')) || [];
const SHIPPING_COST = 4.25; // Eenmalige verzendkosten voor NL

function toggleHelp() {
    document.getElementById('helpBox').classList.toggle('active');
}

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('dk_cart', JSON.stringify(cart));
    updateUI();
    // Een subtiele melding in plaats van een irritante pop-up
    console.log(name + " toegevoegd");
}

function updateUI() {
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.innerText = cart.length;
}

function renderCart() {
    const list = document.getElementById('cartList');
    const subtotalEl = document.getElementById('subtotalPrice');
    const shippingEl = document.getElementById('shippingCost');
    const totalEl = document.getElementById('totalPrice');
    
    if (!list) return;

    if (cart.length === 0) {
        document.getElementById('cartContent').style.display = 'none';
        document.getElementById('emptyMessage').style.display = 'block';
        return;
    }

    list.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price;
        list.innerHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--card-bg); padding:20px; border-radius:12px; margin-bottom:15px; border: 1px solid #2a343d;">
                <div>
                    <h3 style="font-size:1.1rem; color:white;">${item.name}</h3>
                    <p style="color:var(--gold); font-weight:bold;">€${item.price.toFixed(2)}</p>
                </div>
                <button onclick="removeItem(${index})" style="background:#ff4444; color:white; border:none; padding:8px 12px; border-radius:5px; cursor:pointer; font-weight:900;">X</button>
            </div>
        `;
    });

    // Hier gebeurt het: Totaal = Subtotaal + eenmalig 4.25
    let total = subtotal + SHIPPING_COST;

    subtotalEl.innerText = `€${subtotal.toFixed(2)}`;
    shippingEl.innerText = `€${SHIPPING_COST.toFixed(2)}`;
    totalEl.innerText = `€${total.toFixed(2)}`;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('dk_cart', JSON.stringify(cart));
    renderCart();
    updateUI();
}

function checkout() {
    if (cart.length === 0) return;
    // Hier plak je jouw Stripe link
    window.location.href = "https://buy.stripe.com/jouw_link";
}

window.onload = () => {
    updateUI();
    if (document.getElementById('cartList')) renderCart();
};
2. mandje.html (De prijstabel)
Zorg dat dit gedeelte in je mandje.html staat, zodat de klant precies ziet wat er gebeurt:

HTML

<div id="cartContent">
    <div id="cartList"></div>
    
    <div style="margin-top: 40px; background: #000; padding: 30px; border-radius: 15px; border: 2px solid var(--gold);">
        <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size: 1.1rem;">
            <span>Aantal artikelen:</span>
            <span id="itemCount">0</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size: 1.1rem;">
            <span>Subtotaal:</span>
            <span id="subtotalPrice">€0.00</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom: 1px solid #333; padding-bottom:15px; font-size: 1.1rem;">
            <span>Verzendkosten (NL):</span>
            <span id="shippingCost">€4.25</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-top:15px;">
            <h2 style="font-size: 2rem; font-weight: 900;">TOTAAL:</h2>
            <h2 id="totalPrice" style="color: var(--gold); font-size: 2.2rem; font-weight: 900;">€0.00</h2>
        </div>
        <br>
        <button class="cta-btn" onclick="checkout()" style="width: 100%; letter-spacing: 2px;">AFREKENEN VIA STRIPE</button>
    </div>
</div>

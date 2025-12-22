let cart = JSON.parse(localStorage.getItem('dk_cart')) || [];

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

function addToCart(name, price, link) {
    cart.push({ name, price, link });
    saveCart();
    renderCart();
    // Optioneel: Open de winkelwagen automatisch
    document.getElementById('cart-sidebar').classList.add('active');
}

function saveCart() {
    localStorage.setItem('dk_cart', JSON.stringify(cart));
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('total-price');
    const countEl = document.getElementById('cart-count');
    
    container.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        container.innerHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; background:#1a1a1a; padding:10px; border-radius:4px;">
                <div>
                    <div style="font-weight:bold; font-size:14px;">${item.name}</div>
                    <div style="color:#d4af37">€${item.price.toFixed(2)}</div>
                </div>
                <button onclick="removeItem(${index})" style="color:#ff4444; background:none; border:none; cursor:pointer; font-weight:bold;">Verwijder</button>
            </div>
        `;
    });
    
    totalEl.innerText = `€${total.toFixed(2)}`;
    if(countEl) countEl.innerText = cart.length;
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-nl]');
    elements.forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });
    localStorage.setItem('dk_lang', lang);
}

function goToCheckout() {
    if(cart.length === 0) {
        alert("Winkelmand is leeg!");
        return;
    }
    // We sturen de klant naar de betaallink van het eerste product.
    // Voor meerdere producten in één keer is een Stripe Checkout-sessie nodig.
    window.location.href = cart[0].link;
}

// Laden van voorkeuren
window.onload = () => {
    renderCart();
    const savedLang = localStorage.getItem('dk_lang') || 'nl';
    changeLanguage(savedLang);
};

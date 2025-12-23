let cart = JSON.parse(localStorage.getItem('dk_cart')) || [];

function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-nl]');
    elements.forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });
    localStorage.setItem('dk_lang', lang);
}

function toggleHelp() {
    document.getElementById('helpBox').classList.toggle('active');
}

function addToCart(name, price, link) {
    cart.push({ name, price, link });
    localStorage.setItem('dk_cart', JSON.stringify(cart));
    updateUI();
    alert(name + " added!");
}

function updateUI() {
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.innerText = cart.length;

    const cartList = document.getElementById('cartList');
    const totalEl = document.getElementById('totalPrice');
    if (cartList) {
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            cartList.innerHTML += `
                <div style="display:flex; justify-content:space-between; background:#161e24; padding:20px; margin-bottom:10px; border-radius:10px; border:1px solid #2a343d;">
                    <div><h3>${item.name}</h3><p style="color:#d4af37; font-weight:bold;">€${item.price.toFixed(2)}</p></div>
                    <button onclick="removeItem(${index})" style="background:red; color:white; border:none; padding:10px; cursor:pointer; border-radius:5px;">X</button>
                </div>`;
        });
        totalEl.innerText = `€${total.toFixed(2)}`;
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('dk_cart', JSON.stringify(cart));
    updateUI();
}

function checkout() {
    if (cart.length === 0) return alert("Leeg!");
    window.location.href = cart[0].link; 
}

window.onload = () => {
    updateUI();
    const savedLang = localStorage.getItem('dk_lang') || 'nl';
    changeLanguage(savedLang);
};

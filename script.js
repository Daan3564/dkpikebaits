let cart = JSON.parse(localStorage.getItem('dk_cart')) || [];

function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-nl]');
    elements.forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });
    localStorage.setItem('dk_lang', lang);
}

function toggleContact() {
    document.getElementById('contact-slide').classList.toggle('active');
}

function addToCart(name, price, link) {
    cart.push({ name, price, link });
    localStorage.setItem('dk_cart', JSON.stringify(cart));
    updateUI();
    alert(name + " toegevoegd!");
}

function updateUI() {
    const count = document.getElementById('cart-count');
    if(count) count.innerText = cart.length;

    // Als we op de mandje pagina zijn
    const cartList = document.getElementById('cart-list');
    if(cartList) {
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            cartList.innerHTML += `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <span>€${item.price.toFixed(2)} <button onclick="removeItem(${index})">X</button></span>
                </div>`;
        });
        document.getElementById('total-price').innerText = `€${total.toFixed(2)}`;
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('dk_cart', JSON.stringify(cart));
    updateUI();
}

function goToCheckout() {
    if(cart.length > 0) window.location.href = cart[0].link;
}

window.onload = () => {
    updateUI();
    const savedLang = localStorage.getItem('dk_lang') || 'nl';
    changeLanguage(savedLang);
};

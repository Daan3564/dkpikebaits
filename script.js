let cart = JSON.parse(localStorage.getItem('dk_cart')) || [];

// TAAL WISSELEN
function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-nl]');
    elements.forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });
    localStorage.setItem('dk_lang', lang);
}

// HELP BOX TOGGLE
function toggleHelp() {
    document.getElementById('helpBox').classList.toggle('active');
}

// ZOEKEN
function searchProduct() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('card');
    
    for (let i = 0; i < cards.length; i++) {
        let name = cards[i].getAttribute('data-name');
        if (name.includes(input)) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }
}

// WINKELWAGEN
function addToCart(name, price, link) {
    cart.push({ name, price, link });
    localStorage.setItem('dk_cart', JSON.stringify(cart));
    alert(name + " added!");
    updateUI();
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('dk_cart', JSON.stringify(cart));
    updateUI();
}

function updateUI() {
    const countEl = document.getElementById('cart-count');
    if(countEl) countEl.innerText = cart.length;

    const cartList = document.getElementById('cartList');
    const totalEl = document.getElementById('totalPrice');
    
    if(cartList) {
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            cartList.innerHTML += `
                <div class="cart-item">
                    <div><h3>${item.name}</h3><p>€${item.price.toFixed(2)}</p></div>
                    <button onclick="removeItem(${index})" style="background:red; color:white; border:none; padding:5px 10px; cursor:pointer;">X</button>
                </div>`;
        });
        totalEl.innerText = `€${total.toFixed(2)}`;
    }
}

function checkout() {
    if(cart.length === 0) return alert("Empty cart!");
    // Stuur naar de Stripe link van het eerste item
    window.location.href = cart[0].link;
}

window.onload = () => {
    updateUI();
    const savedLang = localStorage.getItem('dk_lang') || 'nl';
    changeLanguage(savedLang);
};

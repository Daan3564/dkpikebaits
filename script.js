let cart = JSON.parse(localStorage.getItem('dk_cart')) || [];

function toggleHelp() {
    document.getElementById('helpBox').classList.toggle('active');
}

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('dk_cart', JSON.stringify(cart));
    alert(name + " is toegevoegd!");
}

function updateCartCount() {
    const count = document.getElementById('cart-count');
    if (count) count.innerText = cart.length;
}

window.onload = updateCartCount;

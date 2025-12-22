let cart = [];

function addToCart(name, price, stripeLink) {
    cart.push({name, price, stripeLink});
    renderCart();
}

function removeItem(index) {
    cart.splice(index,1);
    renderCart();
}

function renderCart() {
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("total");
    const countEl = document.getElementById("count");

    container.innerHTML = "";
    let total = 0;

    cart.forEach((item,i)=>{
        total += item.price;
        container.innerHTML += `
        <div class="cart-item">
            <div>${item.name} – €${item.price.toFixed(2)}</div>
            <div>
                <a href="${item.link}" target="_blank">Betalen</a>
                <button onclick="removeItem(${i})">X</button>
            </div>
        </div>`;
    });

    totalEl.innerText = total.toFixed(2);
    countEl.innerText = cart.length;
}

// Dit is je winkelmandje in het geheugen van de browser
let cart = [];

function addToCart(productId, priceId) {
    cart.push({
        price: priceId, // Stripe heeft de Price ID nodig (bijv. price_123...)
        quantity: 1
    });
    alert("Product toegevoegd aan mandje!");
    localStorage.setItem('cart', JSON.stringify(cart)); // Opslaan voor de mandje-pagina
}

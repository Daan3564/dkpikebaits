// Jouw publieke sleutel
const stripe = Stripe('pk_test_51ShbijDKBwjX9ElPpXBRbO4BjbScRaXuaxNQeKeDF50Isnyw00K8a79HvgsU3JVkeWfdaai0Z1NpjV5uKXfjF6w700Mp1j02QU');

function addToCart(priceId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // We voegen het product toe aan de lijst
    cart.push({
        price: priceId,
        quantity: 1
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Product toegevoegd aan winkelmandje!");
}

async function checkout() {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    
    if (!savedCart || savedCart.length === 0) {
        alert("Je winkelmandje is leeg!");
        return;
    }

    // Stuur de klant naar de Stripe betaalpagina
    const { error } = await stripe.redirectToCheckout({
        lineItems: savedCart,
        mode: 'payment',
        shippingOptions: [
            { shipping_rate: 'shr_1ShcPvDKBwjX9ElPl5mAZOQG' } // Jouw verzend ID
        ],
        successUrl: window.location.origin + '/success.html',
        cancelUrl: window.location.origin + '/cancel.html',
    });

    if (error) {
        alert("Stripe fout: " + error.message);
    }
}

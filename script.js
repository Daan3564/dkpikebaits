// Jouw publieke sleutel
const stripe = Stripe('pk_test_51ShbijDKBwjX9ElPpXBRbO4BjbScRaXuaxNQeKeDF50Isnyw00K8a79HvgsU3JVkeWfdaai0Z1NpjV5uKXfjF6w700Mp1j02QU');

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({
        price: productId, // In Stripe Checkout client-side wordt de Product ID hier verwacht
        quantity: 1
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Product toegevoegd aan je mandje!");
}

async function checkout() {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    
    if (!savedCart || savedCart.length === 0) {
        alert("Je winkelmandje is nog leeg!");
        return;
    }

    const { error } = await stripe.redirectToCheckout({
        lineItems: savedCart,
        mode: 'payment',
        // Hier gebruik ik jouw verzend ID: shr_1ShcPvDKBwjX9ElPl5mAZOQG
        shippingOptions: [
            { shipping_rate: 'shr_1ShcPvDKBwjX9ElPl5mAZOQG' }
        ],
        successUrl: window.location.origin + '/success.html',
        cancelUrl: window.location.origin + '/cancel.html',
    });

    if (error) {
        alert("Er ging iets mis: " + error.message);
    }
}

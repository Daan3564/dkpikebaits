// Initialiseer Stripe met je Openbare sleutel uit je screenshot
const stripe = Stripe('pk_test_51ShbijDKBwjX9ElPpXBRbo4BjbScRaXuanQeKeDF50Isnyw00K8a79HvgsU3JVkewfdaai0Z1NpjV5uKXfjF6w700Mp1j02QU');

// 1. Functie om product toe te voegen
function voegToe(priceId, naam, prijs) {
    let mandje = JSON.parse(localStorage.getItem('dk_cart')) || [];
    mandje.push({ id: priceId, naam: naam, prijs: prijs });
    localStorage.setItem('dk_cart', JSON.stringify(mandje));
    alert(naam + " is toegevoegd aan je mandje!");
    
    if (document.getElementById('mandje-inhoud')) {
        toonMandje();
    }
}

// 2. Functie om het mandje te laten zien
function toonMandje() {
    const display = document.getElementById('mandje-inhoud');
    const totaalSectie = document.getElementById('totaal-sectie');
    const leegMelding = document.getElementById('lege-melding');
    
    if (!display) return;

    let mandje = JSON.parse(localStorage.getItem('dk_cart')) || [];

    if (mandje.length === 0) {
        display.innerHTML = "";
        totaalSectie.style.display = "none";
        leegMelding.style.display = "block";
        return;
    }

    leegMelding.style.display = "none";
    totaalSectie.style.display = "block";
    
    display.innerHTML = mandje.map((item, index) => `
        <div style="display:flex; justify-content:space-between; align-items:center; background:#111; padding:15px; margin-bottom:10px; border:1px solid #333; color:white;">
            <div>
                <strong style="color:#d4af37;">${item.naam}</strong><br>
                <span>€ ${item.prijs.toFixed(2)}</span>
            </div>
            <button onclick="verwijderItem(${index})" style="background:#ff4444; color:white; border:none; padding:5px 10px; cursor:pointer; border-radius:4px;">Verwijder</button>
        </div>
    `).join('');
}

// 3. Item verwijderen
function verwijderItem(index) {
    let mandje = JSON.parse(localStorage.getItem('dk_cart'));
    mandje.splice(index, 1);
    localStorage.setItem('dk_cart', JSON.stringify(mandje));
    toonMandje();
}

// 4. Naar Stripe Kassa
function naarKassa() {
    let mandje = JSON.parse(localStorage.getItem('dk_cart')) || [];
    if (mandje.length === 0) return;

    const lineItems = mandje.map(item => ({
        price: item.id, 
        quantity: 1
    }));

    stripe.redirectToCheckout({
        lineItems: lineItems,
        mode: 'payment',
        successUrl: window.location.origin + '/succes.html',
        cancelUrl: window.location.origin + '/mandje.html',
        shippingOptions: [
            { shipping_rate: 'shr_1ShcPvDKBwjX9ElPl5mAZOQG' }
        ],
    }).then(result => {
        if (result.error) alert(result.error.message);
    });
}

// Zorg dat alles laadt
window.addEventListener('DOMContentLoaded', toonMandje);

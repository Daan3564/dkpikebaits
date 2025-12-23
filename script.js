const stripe = Stripe('pk_test_51ShbijDKBwjX9ElPpXBRbo4BjbScRaXuanQeKeDF50Isnyw00K8a79HvgsU3JVkewfdaai0Z1NpjV5uKXfjF6w700Mp1j02QU');

function voegToe(priceId, naam, prijs) {
    // Haal mandje op of maak een nieuwe
    let mandje = JSON.parse(localStorage.getItem('dk_cart')) || [];
    
    // Voeg product toe
    mandje.push({ id: priceId, naam: naam, prijs: prijs });
    
    // Opslaan
    localStorage.setItem('dk_cart', JSON.stringify(mandje));
    
    alert(naam + " is toegevoegd!");
    
    // Als we op de mandje pagina zijn, direct verversen
    if (document.getElementById('mandje-inhoud')) {
        toonMandje();
    }
}

function toonMandje() {
    const display = document.getElementById('mandje-inhoud');
    const totaalSectie = document.getElementById('totaal-sectie');
    const leeg = document.getElementById('lege-melding');
    
    if (!display) return;

    let mandje = JSON.parse(localStorage.getItem('dk_cart')) || [];

    if (mandje.length === 0) {
        display.innerHTML = "";
        totaalSectie.style.display = "none";
        leeg.style.display = "block";
    } else {
        leeg.style.display = "none";
        totaalSectie.style.display = "block";
        display.innerHTML = mandje.map((item, index) => `
            <div style="display:flex; justify-content:space-between; background:#111; padding:15px; margin-bottom:10px; border:1px solid #333; color:white;">
                <span>${item.naam} - €${item.prijs}</span>
                <button onclick="verwijderItem(${index})" style="color:red; background:none; border:none; cursor:pointer;">Verwijder</button>
            </div>
        `).join('');
    }
}

function verwijderItem(index) {
    let mandje = JSON.parse(localStorage.getItem('dk_cart'));
    mandje.splice(index, 1);
    localStorage.setItem('dk_cart', JSON.stringify(mandje));
    toonMandje();
}

function naarKassa() {
    let mandje = JSON.parse(localStorage.getItem('dk_cart')) || [];
    const items = mandje.map(item => ({ price: item.id, quantity: 1 }));

    stripe.redirectToCheckout({
        lineItems: items,
        mode: 'payment',
        successUrl: window.location.origin + '/succes.html',
        cancelUrl: window.location.origin + '/mandje.html',
        shippingOptions: [{ shipping_rate: 'shr_1ShcPvDKBwjX9ElPl5mAZOQG' }],
    });
}

// Start de weergave
window.onload = toonMandje;

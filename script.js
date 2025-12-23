// Initialiseer Stripe met jouw Openbare Sleutel
const stripe = Stripe('pk_test_51ShbijDKBwjX9ElPpXBRbo4BjbScRaXuanQeKeDF50Isnyw00K8a79HvgsU3JVkewfdaai0Z1NpjV5uKXfjF6w700Mp1j02QU');

// 1. Product toevoegen aan mandje
function voegToe(id, naam, prijs) {
    let mandje = JSON.parse(localStorage.getItem('dk_pikes_cart')) || [];
    mandje.push({ id: id, naam: naam, prijs: prijs });
    localStorage.setItem('dk_pikes_cart', JSON.stringify(mandje));
    alert(naam + " is toegevoegd aan je winkelmandje!");
}

// 2. Mandje weergeven op mandje.html
function toonMandje() {
    const display = document.getElementById('mandje-inhoud');
    const totaalSectie = document.getElementById('totaal-sectie');
    const leegMelding = document.getElementById('lege-melding');
    
    if (!display) return; // Stop als we niet op de mandje pagina zijn

    let mandje = JSON.parse(localStorage.getItem('dk_pikes_cart')) || [];

    if (mandje.length === 0) {
        display.innerHTML = "";
        totaalSectie.style.display = "none";
        leegMelding.style.display = "block";
        return;
    }

    leegMelding.style.display = "none";
    totaalSectie.style.display = "block";
    
    display.innerHTML = mandje.map((item, index) => `
        <div style="background: #111; padding: 15px; margin-bottom: 10px; border: 1px solid #333; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <strong style="color: gold;">${item.naam}</strong><br>
                <span>€ ${item.prijs.toFixed(2)}</span>
            </div>
            <button onclick="verwijderItem(${index})" style="background: red; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px;">Verwijder</button>
        </div>
    `).join('');
}

// 3. Item verwijderen
function verwijderItem(index) {
    let mandje = JSON.parse(localStorage.getItem('dk_pikes_cart'));
    mandje.splice(index, 1);
    localStorage.setItem('dk_pikes_cart', JSON.stringify(mandje));
    toonMandje();
}

// 4. De betaling starten bij Stripe
function naarKassa() {
    let mandje = JSON.parse(localStorage.getItem('dk_pikes_cart')) || [];
    
    // Maak de lijst klaar voor Stripe
    const items = mandje.map(item => ({
        price: item.id, // Dit gebruikt je prod_ ID
        quantity: 1
    }));

    stripe.redirectToCheckout({
        lineItems: items,
        mode: 'payment',
        successUrl: window.location.origin + '/succes.html',
        cancelUrl: window.location.origin + '/mandje.html',
        shippingOptions: [
            { shipping_rate: 'shr_1ShcPvDKBwjX9ElPl5mAZOQG' } // Jouw € 4,50 verzendkosten
        ],
    }).then(function(result) {
        if (result.error) alert(result.error.message);
    });
}

// Hulpschermpje toggle
function toggleHelp() {
    const box = document.getElementById('helpBox');
    if(box) box.style.display = box.style.display === 'block' ? 'none' : 'block';
}

// Automatisch mandje laden als de pagina opent
window.onload = function() {
    if (document.getElementById('mandje-inhoud')) {
        toonMandje();
    }
};

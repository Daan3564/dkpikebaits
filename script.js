Ik ga alles nu voor je samenvoegen. We gaan ervoor zorgen dat wanneer je op "Shop" klikt en een bait toevoegt, de website dit onthoudt en op de mandje.html pagina het totaal uitrekent inclusief de verzendkosten van € 4,50.

Omdat je geen maandelijkse kosten wilt, gebruiken we de browser van de klant om het mandje te onthouden (localStorage).

1. Het nieuwe script.js
Vervang de volledige inhoud van je script.js door deze code. Hierin staat de logica voor het mandje en de koppeling met Stripe.

JavaScript

// Initialiseer Stripe met jouw sleutel
const stripe = Stripe('pk_test_51ShbijDKBwjX9ElPpXBRbo4BjbScRaXuanQeKeDF50Isnyw00K8a79HvgsU3JVkewfdaai0Z1NpjV5uKXfjF6w700Mp1j02QU');

// Functie om product toe te voegen (werkt op producten.html)
function voegToe(priceId, naam, prijs) {
    let mandje = JSON.parse(localStorage.getItem('winkelmand')) || [];
    mandje.push({ price: priceId, name: naam, amount: prijs });
    localStorage.setItem('winkelmand', JSON.stringify(mandje));
    alert(naam + " is toegevoegd aan je mandje!");
}

// Functie om mandje te tonen (werkt op mandje.html)
function toonMandje() {
    const container = document.getElementById('mandje-inhoud');
    const leegMelding = document.getElementById('lege-melding');
    const totaalSectie = document.getElementById('totaal-sectie');
    let mandje = JSON.parse(localStorage.getItem('winkelmand')) || [];

    if (mandje.length === 0) {
        if(leegMelding) leegMelding.style.display = 'block';
        if(totaalSectie) totaalSectie.style.display = 'none';
        return;
    }

    if(leegMelding) leegMelding.style.display = 'none';
    if(totaalSectie) totaalSectie.style.display = 'block';
    
    container.innerHTML = '';
    mandje.forEach((item, index) => {
        container.innerHTML += `
            <div style="background:#222; margin:10px; padding:15px; border:1px solid #333; display:flex; justify-content:space-between;">
                <span>${item.name}</span>
                <span>€ ${item.amount.toFixed(2)}</span>
                <button onclick="verwijderItem(${index})" style="background:red; color:white; border:none; cursor:pointer;">X</button>
            </div>`;
    });
}

function verwijderItem(index) {
    let mandje = JSON.parse(localStorage.getItem('winkelmand'));
    mandje.splice(index, 1);
    localStorage.setItem('winkelmand', JSON.stringify(mandje));
    toonMandje();
}

// De functie die alles doorstuurt naar Stripe
function naarKassa() {
    let mandje = JSON.parse(localStorage.getItem('winkelmand')) || [];
    
    // Maak de lijst klaar voor Stripe (Stripe wil alleen price en quantity)
    const lineItems = mandje.map(item => ({
        price: item.price,
        quantity: 1
    }));

    stripe.redirectToCheckout({
        lineItems: lineItems,
        mode: 'payment',
        successUrl: window.location.origin + '/succes.html',
        cancelUrl: window.location.origin + '/mandje.html',
        shippingOptions: [
            { shipping_rate: 'shr_1ShcPvDKBwjX9ElPl5mAZOQG' } // Jouw €4,50 verzendkosten
        ],
    });
}

// Helpbox toggle
function toggleHelp() {
    const box = document.getElementById('helpBox');
    box.style.display = box.style.display === 'block' ? 'none' : 'block';
}

// Als we op de mandje pagina zijn, toon de inhoud direct
if (window.location.pathname.includes('mandje.html')) {
    window.onload = toonMandje;
}

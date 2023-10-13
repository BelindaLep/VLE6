(function () {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function () {

        let c = document.getElementById("clock");

        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);

        function updateClock() {

            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let pool = "EL"

            if (h > 12) {
                h -= 12
                pool = "PL"
            }

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + pool;

        };

    });

    // forms

    document.getElementById("form").addEventListener("submit", estimateDelivery);

    let e = document.getElementById("delivery");
    let priceTallinn = 0; // Hind Tallinnas
    let priceTartu = 2.5; // Hind Tartus
    let priceNarva = 2.5; // Hind Narvas
    let priceParnu = 3; // Hind Pärnus
    let priceGift = 5; // Kingituse hind
    let priceContactless = 1; // Kontaktivaba tarnetasu

    e.innerHTML = "0,00 &euro;";

    function estimateDelivery(event) {
        event.preventDefault();

        let linn = document.getElementById("linn");
        let enimi = document.getElementById("fname");
        let pnimi = document.getElementById("lname");

        let express = document.getElementById("express");
        let standard = document.getElementById("standard");
        let deliveryPrice = 0; // Vaikimisi tarnehind

        if (enimi.value === "") {
            alert("Palun sisestage oma eesnimi");
            linn.focus();
            return;
        }
        if (/\d/.test(enimi.value)) {
            alert("Eesnimi ei tohi sisaldada numbreid.");
            return;
        }

        if (pnimi.value === "") {
            alert("Palun sisestage oma perekonnanimi");
            linn.focus();
            return;
        }

        if (/\d/.test(pnimi.value)) {
            alert("Perekonnanimi ei tohi sisaldada numbreid.");
            return;
        }

        if (pnimi.value === "") {
            alert("Palun sisestage oma perekonnanimi");
            linn.focus();
            return;
        }


        if (linn.value === "") {
            alert("Palun valige linn nimekirjast");
            linn.focus();
            return;
        }

        if (!standard.checked && !express.checked) {
            alert("Palun valige tarne");
            standard.focus();
            express.focus();
            return;
        }

        if (document.getElementById("v1").checked) {
            deliveryPrice += priceGift;
        }

        if (document.getElementById("v2").checked) {
            deliveryPrice += priceContactless;
        }

        switch (linn.value) {
            case "tln":
                deliveryPrice += priceTallinn;
                break;
            case "trt":
                deliveryPrice += priceTartu;
                break;
            case "nrv":
                deliveryPrice += priceNarva;
                break;
            case "prn":
                deliveryPrice += priceParnu;
                break;
            default:
                break;
        }

        // Raadionupu valik
        if (express.checked) {
            deliveryPrice += 5;

        }

        e.innerHTML = deliveryPrice.toFixed(2) + " &euro;";
    }


})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {

    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
        58.5590982,
        26.627582
    );

    let point1 = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );

    let point2 = new Microsoft.Maps.Location(
        58.737156335805,
        26.535243987382
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 9,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    let pushpin = new Microsoft.Maps.Pushpin(point1, {
        title: 'Tartu Ülikool',
        //subTitle: 'Hea koht',
        //text: 'UT'
    });

    let pushpin2 = new Microsoft.Maps.Pushpin(point2, {
        title: 'Kuremaa loss',
    });

    let infobox1 = new Microsoft.Maps.Infobox(point1, { title: 'Tartu Ülikool', description: 'Tuntud ülikool Eestis.' });
    let infobox2 = new Microsoft.Maps.Infobox(point2, { title: 'Kuremaa loss', description: 'Ajalooline loss Eestis.' });

    Microsoft.Maps.Events.addHandler(pushpin, 'click', function () {
        infobox1.setOptions({ visible: true });
    });

    Microsoft.Maps.Events.addHandler(pushpin2, 'click', function () {
        infobox2.setOptions({ visible: true });
    });

    map.entities.push(pushpin);
    map.entities.push(pushpin2);


}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE


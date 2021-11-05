
//obtengo los elementos (inputs) segun el id
var btcMount = document.getElementById("btc_mount");
var usdMount = document.getElementById("usd_mount");

//les agrego un una escucha al evento de 
//levantar una tecla presionada
btcMount.addEventListener("keyup", btcToUsd);
usdMount.addEventListener("keyup", usdToBtc);

//las funciones de calculo
function btcToUsd() {
    let calculo = parseFloat(btcMount.value) * valorBTC();       //convierto a float el dato recibido
    if (isNaN(calculo)) {
        usdMount.value = 0;
    } else {
        usdMount.value = calculo.toFixed(2);
    }
}
function usdToBtc() {
    let calculo = parseFloat(usdMount.value) / valorBTC();
    if (isNaN(calculo)) {
        btcMount.value = 0;
    } else {
        btcMount.value = calculo.toFixed(8);
    }
}

//tasa de cambio usd/btc
function valorBTC() {

    //crypo-price dependencia
    let price = require('crypto-price')
    price.getCryptoPrice("USD", "BTC").then(obj => { // Base for ex - USD, Crypto for ex - ETH 
        console.log(obj.price)
    }).catch(err => {
        console.log(err)
    })

    return 60000;                           //temporal el 60k
}


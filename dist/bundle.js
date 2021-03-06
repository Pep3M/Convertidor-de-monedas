(function () { function r(e, n, t) { function o(i, f) { if (!n[i]) { if (!e[i]) { var c = "function" == typeof require && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = "MODULE_NOT_FOUND", a } var p = n[i] = { exports: {} }; e[i][0].call(p.exports, function (r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) } return n[i].exports } for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)o(t[i]); return o } return r })()({
    1: [function (require, module, exports) {

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

        //crypo-price dependencia
        var precio = '';
        obtenerPrecioReal();
        function obtenerPrecioReal() {
            let price = require('crypto-price')
            price.getCryptoPrice("USD", "BTC").then(obj => { // Base for ex - USD, Crypto for ex - ETH 
                console.log(obj.price);
                precio = obj.price;
            }).catch(err => {
                console.log(err)
                return 0;
            }
            )
        }
        setInterval(obtenerPrecioReal,20000);


        //tasa de cambio usd/btc
        function valorBTC() {
            return parseFloat(precio);
        }

        //---------------------------- Modulos ------------------------------//

    }, { "crypto-price": 2 }], 2: [function (require, module, exports) {
        (function (global) {
            (function () {
                let price = require('./lib/price')

                if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
                    global.fetch = require('node-fetch');
                }

                module.exports = price
            }).call(this)
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, { "./lib/price": 3, "node-fetch": 4 }], 3: [function (require, module, exports) {
        let api = 'https://api.cryptonator.com/api/ticker/'

        function getPrice() {
            return new Promise((done, err) => {
                err('Use One of Our Methods, Please Check API for reference on Methods')
            })
        }

        getPrice.getCryptoPrice = ((base, crypto) => {
            return new Promise((done, err) => {
                if (typeof base === 'undefined' && typeof crypto === 'undefined') {
                    err(`You forgot to provide Base / Cryptic Currency Name`)
                } else {
                    let cApi = api + crypto + '-' + base
                    fetch(cApi)
                        .then(response => {
                            if (response.status === 200) {
                                return response.json()
                            } else {
                                err(`Sorry, We couldn't get the Price. Bad response code : ` + response.status)
                            }
                        })
                        .then(json => done(json.ticker))
                        .catch(error => console.error(`Sorry, We couldn't get the Price. Error: ` + error))
                }
            })
        })

        getPrice.getBasePrice = ((base, crypto) => {
            return new Promise((done, err) => {
                if (typeof base === 'undefined' && typeof crypto === 'undefined') {
                    err('You forgot to provide Base / Cryptic Currency Name')
                } else {
                    let cApi = api + base + '-' + crypto
                    fetch(cApi)
                        .then(response => {
                            if (response.status === 200) {
                                return response.json()
                            } else {
                                err(`Sorry, We couldn't get the Price. Bad response code : ` + response.status)
                            }
                        })
                        .then(json => done(json.ticker))
                        .catch(error => console.error(`Sorry, We couldn't get the Price. Error: ` + error))
                }
            })
        })

        module.exports = getPrice
    }, {}], 4: [function (require, module, exports) {
        (function (global) {
            (function () {
                "use strict";

                // ref: https://github.com/tc39/proposal-global
                var getGlobal = function () {
                    // the only reliable means to get the global object is
                    // `Function('return this')()`
                    // However, this causes CSP violations in Chrome apps.
                    if (typeof self !== 'undefined') { return self; }
                    if (typeof window !== 'undefined') { return window; }
                    if (typeof global !== 'undefined') { return global; }
                    throw new Error('unable to locate global object');
                }

                var global = getGlobal();

                module.exports = exports = global.fetch;

                // Needed for TypeScript and Webpack.
                if (global.fetch) {
                    exports.default = global.fetch.bind(global);
                }

                exports.Headers = global.Headers;
                exports.Request = global.Request;
                exports.Response = global.Response;
            }).call(this)
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}]
}, {}, [1]);

"use strict";
let raio = undefined;
raio = 10;
function calcularAreaCirculo(raio) {
    return Math.PI * Math.pow(raio, 2);
}
console.log(`A área do círculo é: ${calcularAreaCirculo(raio)}`);

let raio: number | undefined = undefined;
raio = 10;

function calcularAreaCirculo(raio: number): number {
    return Math.PI * Math.pow(raio, 2);
}

console.log(`A área do círculo é: ${calcularAreaCirculo(raio)}`);


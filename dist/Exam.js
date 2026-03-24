"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answer = exports.Weight = void 0;
class Weight {
    constructor(Pesos) {
        this.Pesos = Pesos;
    }
}
exports.Weight = Weight;
class Answer {
    constructor(nome, Respostas) {
        this.nome = nome;
        this.Respostas = Respostas;
    }
}
exports.Answer = Answer;
class Exam {
    constructor(weight, answer) {
        this.gabarito = [];
        this.answer = answer;
        this.weight = weight;
    }
    add(gabarito) {
        this.gabarito.push(gabarito);
    }
    calcularNota(estudante) {
        let grade = 0;
        for (let i = 0; i < this.answer.Respostas.length; i++) {
            if (estudante.Respostas[i] === this.answer.Respostas[i]) {
                grade += this.weight.Pesos[i];
            }
        }
        return grade;
    }
    avg() {
        const totalPontos = this.gabarito.reduce((acc, estudante) => {
            return acc + this.calcularNota(estudante);
        }, 0);
        return totalPontos / this.gabarito.length;
    }
    min(count = 1) {
        const todasAsNotas = [];
        for (const estudante of this.gabarito) {
            todasAsNotas.push(this.calcularNota(estudante));
        }
        todasAsNotas.sort((a, b) => a - b);
        const resultado = [];
        for (let i = 0; i < count && i < todasAsNotas.length; i++) {
            resultado.push(todasAsNotas[i]);
        }
        return resultado;
    }
    max(count = 1) {
        const todasAsNotas = [];
        for (const estudante of this.gabarito) {
            todasAsNotas.push(this.calcularNota(estudante));
        }
        todasAsNotas.sort((a, b) => b - a);
        const resultado = [];
        for (let i = 0; i < count && i < todasAsNotas.length; i++) {
            resultado.push(todasAsNotas[i]);
        }
        return resultado;
    }
    lt(limit) {
        const res = [];
        for (const e of this.gabarito) {
            const nota = this.calcularNota(e);
            if (nota < limit)
                res.push(nota);
        }
        return res;
    }
    // Maior que (gt)
    gt(limit) {
        const res = [];
        for (const e of this.gabarito) {
            const nota = this.calcularNota(e);
            if (nota > limit)
                res.push(nota);
        }
        return res;
    }
}
// 1. Definir os Pesos (5 questões, cada uma vale 2.0)
const pesosDaProva = new Weight([2.0, 2.0, 2.0, 2.0, 2.0]);
// 2. Definir o Gabarito Oficial (Respostas corretas)
const gabaritoOficial = new Answer("Gabarito", ['a', 'b', 'a', 'c', 'd']);
// 3. Criar a instância do Exame
const provaMatematica = new Exam(pesosDaProva, gabaritoOficial);
// 4. Criar Estudantes com diferentes respostas
const aluno1 = new Answer("João", ['a', 'b', 'b', 'b', 'b']); // Acertou 2 (Nota 4.0)
const aluno2 = new Answer("Maria", ['a', 'b', 'a', 'c', 'd']); // Acertou todas (Nota 10.0)
const aluno3 = new Answer("Pedro", ['b', 'b', 'a', 'b', 'b']); // Acertou 2 (Nota 4.0)
const aluno4 = new Answer("Ana", ['a', 'b', 'a', 'b', 'b']); // Acertou 3 (Nota 6.0)
// 5. Adicionar os estudantes ao exame
provaMatematica.add(aluno1);
provaMatematica.add(aluno2);
provaMatematica.add(aluno3);
provaMatematica.add(aluno4);
// --- Realizando as Chamadas ---
console.log("--- RESULTADOS DO EXAME ---");
// Média da turma
console.log(`Média da Turma: ${provaMatematica.avg()}`);
// Esperado: (4 + 10 + 4 + 6) / 4 = 6.0
// As 2 maiores notas
console.log(`Top 2 Notas:`, provaMatematica.max(2));
// Esperado: [10, 6]
// A menor nota
console.log(`Pior Nota:`, provaMatematica.min(1));
// Esperado: [4]
// Notas acima de 5.0
console.log(`Notas acima de 5.0 (GT):`, provaMatematica.gt(5));
// Esperado: [10, 6]
// Notas abaixo de 5.0
console.log(`Notas abaixo de 5.0 (LT):`, provaMatematica.lt(5));
// Esperado: [4, 4]

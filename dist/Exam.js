"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answer = exports.Weight = void 0;
class Weight {
    constructor(pesos) {
        this.pesos = pesos;
    }
}
exports.Weight = Weight;
class Answer {
    constructor(estudante, respostas) {
        this.estudante = estudante;
        this.respostas = respostas;
    }
}
exports.Answer = Answer;
class Exam {
    constructor(weight, answer) {
        this.weight = weight;
        this.answer = answer;
        this.answers = [];
    }
    add(answers) {
        this.answers.push(answers);
    }
    calcularNota(estudante) {
        let nota = 0;
        for (let i = 0; i < this.answer.respostas.length; i++) {
            if (estudante.respostas[i] === this.answer.respostas[i]) {
                nota += this.weight.pesos[i];
            }
        }
        return nota;
    }
    avg() {
        let totalPontos = 0;
        for (const estudante of this.answers) {
            totalPontos += this.calcularNota(estudante);
        }
        if (this.answers.length === 0) {
            return 0;
        }
        return totalPontos / this.answers.length;
    }
    min(count = 1) {
        const todasAsNotas = [];
        for (const estudante of this.answers) {
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
        for (const estudante of this.answers) {
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
        const resultado = [];
        for (const e of this.answers) {
            const nota = this.calcularNota(e);
            if (nota < limit)
                resultado.push(nota);
        }
        return resultado;
    }
    gt(limit) {
        const resultado = [];
        for (const aluno of this.answers) {
            const nota = this.calcularNota(aluno);
            if (nota > limit)
                resultado.push(nota);
        }
        return resultado;
    }
}
const pesosDaProva = new Weight([2.0, 2.0, 2.0, 2.0, 2.0]);
const gabaritoOficial = new Answer("Gabarito", ['a', 'b', 'a', 'c', 'd']);
const provaMatematica = new Exam(pesosDaProva, gabaritoOficial);
const aluno1 = new Answer("João", ['a', 'b', 'b', 'b', 'b']);
const aluno2 = new Answer("Maria", ['a', 'b', 'a', 'c', 'd']);
const aluno3 = new Answer("Pedro", ['b', 'b', 'a', 'b', 'b']);
const aluno4 = new Answer("Ana", ['a', 'b', 'a', 'b', 'b']);
provaMatematica.add(aluno1);
provaMatematica.add(aluno2);
provaMatematica.add(aluno3);
provaMatematica.add(aluno4);
// --- Chamadas ---
console.log("--- RESULTADOS DO EXAME ---");
console.log(`Média da Turma: ${provaMatematica.avg()}`);
console.log(`Top 2 Notas:`, provaMatematica.max(2));
console.log(`Pior Nota:`, provaMatematica.min(1));
console.log(`Notas acima de 5.0 (GT):`, provaMatematica.gt(5));
console.log(`Notas abaixo de 5.0 (LT):`, provaMatematica.lt(5));

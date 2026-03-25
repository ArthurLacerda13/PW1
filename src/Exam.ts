export class Weight { 
    constructor(public pesos: number[]) {}
 }

export class Answer { 
    constructor(public estudante: string, public respostas: string[]) {}
}

class Exam { 
    private answers: Array<Answer> = []; 
    constructor(
        private weight: Weight, 
        private answer: Answer
    ) {}
    
    public add(answers: Answer): void {
        this.answers.push(answers);
    }
    
    private calcularNota(estudante: Answer): number {
        let nota = 0;
        for (let i = 0; i < this.answer.respostas.length; i++) {
            if (estudante.respostas[i] === this.answer.respostas[i]) {
                nota += this.weight.pesos[i];
            }
        }
        return nota;
    }
    
    public avg(): number {
    let totalPontos = 0;
    if (this.answers.length === 0) {
        return 0;
    }
    for (const estudante of this.answers) {
        totalPontos += this.calcularNota(estudante);
    }
    return totalPontos / this.answers.length;
    }

    public min(limite: number): number[] {
    const todasAsNotas: number[] = [];
    for (const estudante of this.answers) {
        todasAsNotas.push(this.calcularNota(estudante));
    }
    todasAsNotas.sort((a, b) => a - b);
    const resultado: number[] = [];
    for (let i = 0; i < limite && i < todasAsNotas.length; i++) {
        resultado.push(todasAsNotas[i]);
    }
    return resultado;
    }

    public max(qtd: number): number[] {
    const todasAsNotas: number[] = [];
    for (const estudante of this.answers) {
        todasAsNotas.push(this.calcularNota(estudante));
    }
    todasAsNotas.sort((a, b) => b - a);
    const resultado: number[] = [];

    for (let i = 0; i < qtd && i < todasAsNotas.length; i++) {
        resultado.push(todasAsNotas[i]);
    }
    return resultado;
    }

    public lt(limite: number): number[] {
        const resultado: number[] = [];

        for (const estudante of this.answers) {
            const nota = this.calcularNota(estudante);
            if (nota < limite) resultado.push(nota);
        }

        return resultado;
    }


    public gt(limite: number): number[] {
        const resultado: number[] = [];

        for (const estudante of this.answers){
            const nota = this.calcularNota(estudante);
            if (nota > limite) resultado.push(nota);
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
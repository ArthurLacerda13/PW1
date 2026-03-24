export class Weight { 
    constructor(
        public pesos: number[]
    ) {}
 }

export class Answer { 
    constructor(
        public estudante: string,
        public respostas: string[]
    ) {}
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
    for (const estudante of this.answers) {
        totalPontos += this.calcularNota(estudante);
    }
    if (this.answers.length === 0) {
        return 0;
    }
    return totalPontos / this.answers.length;
    }

    public min(count: number = 1): number[] {
    const todasAsNotas: number[] = [];
    for (const estudante of this.answers) {
        todasAsNotas.push(this.calcularNota(estudante));
    }
    todasAsNotas.sort((a, b) => a - b);
    const resultado: number[] = [];
    for (let i = 0; i < count && i < todasAsNotas.length; i++) {
        resultado.push(todasAsNotas[i]);
    }
    return resultado;
    }

    public max(count: number = 1): number[] {
    const todasAsNotas: number[] = [];
    for (const estudante of this.answers) {
        todasAsNotas.push(this.calcularNota(estudante));
    }
    todasAsNotas.sort((a, b) => b - a);
    const resultado: number[] = [];
    
    for (let i = 0; i < count && i < todasAsNotas.length; i++) {
        resultado.push(todasAsNotas[i]);
    }
    return resultado;
    }

    public lt(limit: number): number[] {
        const resultado: number[] = [];

        for (const e of this.answers) {
            const nota = this.calcularNota(e);
            if (nota < limit) resultado.push(nota);
        }

        return resultado;
    }


    public gt(limit: number): number[] {
        const resultado: number[] = [];

        for (const aluno of this.answers){
            const nota = this.calcularNota(aluno);
            if (nota > limit) resultado.push(nota);
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
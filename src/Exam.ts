export class Weight { //Pesos das notas
    constructor(
        public Pesos: number[]
    ) {}
 }

export class Answer { 
    constructor(
        public estudante: string,
        public Respostas: string[]
    ) {}
}

class Exam { 
    private weight: Weight; // peso
    private answer: Answer; //gabarito
    private answers: Array<Answer> = []; //array de notas de alunos
    constructor(weight: Weight, answer: Answer) {
        this.answer = answer;
        this.weight = weight;
    }
    public add(answers: Answer): void {
        this.answers.push(answers);
    }
    private calcularNota(estudante: Answer): number {
        let grade = 0;
        for (let i = 0; i < this.answer.Respostas.length; i++) {
            if (estudante.Respostas[i] === this.answer.Respostas[i]) {
                grade += this.weight.Pesos[i];
            }
        }
        return grade;
    }
    
    public avg(): number {
        const totalPontos = this.answers.reduce((acc, estudante) => {
            return acc + this.calcularNota(estudante);
        }, 0);

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
        const res: number[] = [];
        for (const e of this.answers) {
            const nota = this.calcularNota(e);
            if (nota < limit) res.push(nota);
        }
        return res;
    }

    // Maior que (gt)
    public gt(limit: number): number[] {
        const res: number[] = [];
        for (const e of this.answers) {
            const nota = this.calcularNota(e);
            if (nota > limit) res.push(nota);
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
const aluno4 = new Answer("Ana", ['a', 'b', 'a', 'b', 'b']);   // Acertou 3 (Nota 6.0)

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
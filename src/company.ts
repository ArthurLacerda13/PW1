class Company {
    constructor(
        private name: string, 
        private founded: number, 
        private industry: string, 
        private kind: string = "Internet Company"
    ) {
    }
    public toString(): string {
        return `${ (this.name).padEnd(15, ".") } ${ (this.founded) }`;
    }
}

const amazon: Company = new Company("Amazon", 1994, "E-commerce, Cloud");

console.log(amazon.toString().padEnd(15, "."));
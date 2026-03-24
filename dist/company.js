"use strict";
class Company {
    constructor(name, founded, industry, king = "Internet Company") {
        this.name = name;
        this.founded = founded;
        this.industry = industry;
        this.king = king;
    }
    toString() {
        return `${(this.name).padEnd(15, ".")} ${(this.founded)}`;
    }
}
const amazon = new Company("Amazon", 1994, "E-commerce, Cloud");
console.log(amazon.toString().padEnd(15, "."));

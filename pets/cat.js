class Cat extends Pet {
    
    constructor(name, age, size, isVaccinated) {
        super(name, age, size);
        this.isVaccinated = isVaccinated;
    }

    showInfo() {
        alert(`I'm a cat, my name is ${this.name}\nI'm ${this.age} years old,\nmy size is ${this.size}\nand I'm${(this.isVaccinated? '' : ' not')} vaccinated`);
    }

}
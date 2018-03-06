class Dog extends Pet {
    
    constructor(name, age, size, family) {
        super(name, age, size);
        this.family = family;
    }

    showInfo() {
        alert(`I'm a dog, my name is ${this.name};\nI'm ${this.age} years old,\nmy size is ${this.size}\nand my familiy are ${this.family}`);
    }

}
class Pet {
    
    constructor(name, age, size) {
        this.name = name;
        this.age = age;
        this.size = size;
    }

    showInfo() {
        alert(`I'm a pet, my name is ${this.name}\nI'm ${this.age} years old,\nmy size is ${this.size}`);
    }

}
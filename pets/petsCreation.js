function getSpecies() {
    let speciesSelect = document.getElementById("petSpecies"); 
    return speciesSelect.options[speciesSelect.selectedIndex].value;
}

function getValueFroInput(id, propertyName) {
    return document.getElementById(id)[propertyName];
}

function getPetData() {
    let name = getValueFroInput("name", 'value');
    let age = getValueFroInput("age", 'value');
    let size = getValueFroInput("size", 'value');
    return {
        name,
        age,
        size
    };
}

function validateData() {
    const species = getSpecies();
    const petData = getPetData();
    let isValid = true;
    isValid = isValid && petData.name.length > 0;
    isValid = isValid && petData.age >= 0;
    isValid = isValid && petData.size >= 0.01;
    console.log(petData, isValid);
    switch(species) {
        case 'dog':
        const family = getValueFroInput('family', 'value');
        isValid = isValid && family.length;
        break;
    }
    document.getElementById('btnShowInfo').disabled = !isValid;
}

function showInfo() {
    const species = getSpecies();
    const petData = getPetData();
    let pet;
    switch(species) {
        case 'dog':
        const family = getValueFroInput('family', 'value');
        pet = new Dog(petData.name, petData.age, petData.size, family);
        break;
        case 'cat':
        const isVaccinated = getValueFroInput('isVaccinated', 'checked');
        console.log({isVaccinated});
        pet = new Cat(petData.name, petData.age, petData.size, isVaccinated);
        break;
        case 'other':
        pet = new Pet(petData.name, petData.age, petData.size);
        break;
    }
    pet.showInfo();
}

function enableFields() {
    let species = getSpecies();
    document.getElementById("family").style.display = (species === 'dog')? 'block' : 'none';
    document.getElementById("labelIsVaccinated").style.display = (species === 'cat')? 'block' : 'none';
    validateData();
}

const URL_BASE = `https://ex1-ces4.firebaseio.com/`;

class instrument {
    constructor(id, type, finish, facturer, model) {
        this.id = id;
        this.type = type;
        this.finish = finish;
        this.facturer = facturer;
        this.model = model;
    }
};


function loadData() {
    const resource = 'instruments.json';
    console.log(URL_BASE + resource);
    getData(URL_BASE + resource);
}

function getForm() {
    let form = getElementById('form');
    let index = getElementById('index');
    let id = getElementById('instrumentId');
    let type = getElementById('type');
    let model = getElementById('model');
    let facturer = getElementById('facturer');
    let finish = getElementById('finish');
    let btnSave = getElementById('btnSave');
    return {
        form,
        index,
        id,
        type,
        model,
        facturer,
        finish,
        btnSave
    }
}

function saveInstrument() {
    let form = getForm();
    let id = form.id.innerHTML;
    let type = form.type.value;
    let index = form.index.value;
    let model = form.model.value;
    let facturer = form.facturer.value;
    let finish = form.finish.value;
    let instrument = {index, id, type, finish, facturer, model};
    postData(instrument)
    .then(() => {
        setTimeout(() => {
            loadData();
        }, 10);
        form.form.style.display = 'none';
    })
    .catch(() => {
        alert('Ha ocurrido un error');
    });
}

function showForm(instrument, index) {
    let form = getForm();
    form.form.style.display = 'block';
    form.id.innerHTML = instrument.id;
    form.type.value = instrument.type;
    form.model.value = instrument.model;
    form.facturer.value = instrument.facturer;
    form.finish.value = instrument.finish;
    form.index.value = index;
    form.btnSave.onclick = () => {saveInstrument()};
}

function getData(url) {
    const table = getElementById('instruments');
    fetch(url)
    .then((resp) => resp.json())
    .then(function (instruments) {
        table.innerHTML = '';
        console.log(instruments);
        return instruments.forEach(function (instrument, index) {
            tr = createNode('tr'),
            tdId = createNode('td'),
            tdType = createNode('td'),
            tdFacturer = createNode('td'),
            tdModel = createNode('td'),
            tdFinish = createNode('td'),
            tdActions = createNode('td'),
            btnEdit = createNode('input');
            tdId.innerHTML = instrument.id;
            tdType.innerHTML = instrument.type;
            tdFacturer.innerHTML = instrument.facturer;
            tdModel.innerHTML = instrument.model;
            tdFinish.innerHTML = instrument.finish;
            btnEdit.type = 'button';
            btnEdit.onclick = () => {
                console.log(instrument);
                showForm(instrument, index);
            };
            btnEdit.value = 'Edit';
            btnEdit.className = 'btn btn-secondary btn-block';
            append(tr, tdId);
            append(tr, tdType);
            append(tr, tdFacturer);
            append(tr, tdModel);
            append(tr, tdFinish);
            append(tr, tdActions);
            append(tdActions, btnEdit);
            append(table, tr);
        })
    })
    .catch(function (error) {
        console.log(JSON.stringify(error));
    });
}

function postData(instrument) {
    const mysite = 'ex1-ces4';

    const url = `https://${mysite}.firebaseio.com/instruments/${instrument.index}.json`;
    
    console.log(url);

    delete instrument.index;

    console.log('instrument is', instrument);
    
    let fetchData = {
        method: 'PATCH',
        body: JSON.stringify(instrument),
        headers: new Headers()
    }
    return new Promise((resolve, reject) => {
        fetch(url, fetchData)
        .then(function (response) {
            console.log(response);
            resolve();
        }).catch(err => {
            console.error(err);
            reject();
        })
    });
}

function getElementById(id) {
    return document.getElementById(id);
}

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}
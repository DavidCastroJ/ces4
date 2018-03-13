

function loadDataFromFireBase() {
    const url = `https://ex1-ces4.firebaseio.com/httpStatusCodes.json`;
    getData(url);
}

function getData(url) {
    const tableBody = getElementById('tableBody');
    tableBody.innerHTML = '';
    fetch(url)
        .then(r => r.json())
        .then((data) => {
            data.forEach((httpCode) => {
                let tr = createNode('tr');
                let tdStatus = createNode('td');
                let tdMessage = createNode('td');
                let tdLink = createNode('td');
                let aLink = createNode('a');
                console.log("http://127.0.0.1:3030/?status=" + httpCode.status);
                aLink.innerHTML = "Show";
                aLink.href = `http://127.0.0.1:3030/?status=${httpCode.status}&message=${httpCode.message}`;
                console.log(aLink); 
                console.log(aLink.href);
                tdStatus.innerHTML = httpCode.status;
                tdMessage.innerHTML = httpCode.message;
                console.log(httpCode)
                append(tdLink, aLink);
                append(tr, tdStatus);
                append(tr, tdMessage);
                append(tr, tdLink);
                append(tableBody, tr);
            })
        })
        .catch(function (error) {
            console.log(JSON.stringify(error));
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


function loadDataFromFireBase() {
  const mysite = 'status-e47c2';
  const url = `https://${mysite}.firebaseio.com/Status.json`;
  getData(url);
}

function getData(url) {
  const table = document.getElementById('status');
  table.innerHTML = '';
  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      return data.forEach(function (status) {
        let tr = createNode("tr");
        let tdcode = createNode("td");
        let tdmessage = createNode("td");
        let tdlink = createNode("td");
        let alink = createNode("a");
        tdcode.innerHTML = status.status;
        tdmessage.innerHTML = status.message;
        alink.innerHTML = "Show";
        alink.href = `http://127.0.0.1:3030/?status=${status.status}&message=${status.message}`;
        append(tdlink, alink);
        append(tr, tdcode);
        append(tr, tdmessage);
        append(tr, tdlink);
        append(table, tr);
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

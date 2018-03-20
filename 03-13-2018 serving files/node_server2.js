var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

function send404(response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('Error 404: Resource not found.');
    response.end();
}

var mimeLookup = {
    '.js': 'application/javascript',
    '.html': 'text/html',
    '.css': 'text/css'
};

var server = http.createServer(function (req, res) {
    console.log(req.url, req.method);
    if (req.url.includes('?')) {
        proccessStatus(req, res);
    } else{
        returnIndex(req, res);
    }
    
}).listen(3030);

function proccessStatus(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var q = url.parse(req.url, true).query;
    console.log(q);
    res.write(`<h1>${q.status}</h1>
      <p>${q.message}</p>
      <input type="button" value="Volver" onclick="regresar()"/>
      <script type="text/javascript">
      function regresar() {
        window.history.back();
      };
      </script>`);
    res.end();
}

function returnIndex(req, res) {

    if (req.method == 'GET') {
        var fileurl = '/index.html';
        if (req.url == '/') {
            fileurl = '/index.html';
        } else {
            fileurl = req.url;
        }
        var filepath = path.resolve('./' + fileurl);

        var fileExt = path.extname(filepath);
        var mimeType = mimeLookup[fileExt];
        if (!mimeType) {
            send404(res);
            return;
        }
        fs.exists(filepath, function (exists) {
            if (!exists) {
                send404(res);
                return;
            };
            res.writeHead(200, { 'content-type': mimeType });
            fs.createReadStream(filepath).pipe(res);
        });
    } else {
        send404(res);
    }
}
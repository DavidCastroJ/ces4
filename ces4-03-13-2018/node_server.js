var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  var q = url.parse(req.url, true).query;
  console.log(q);
  fs.readFile('ex1.html', function (err, html) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`<h1>${q.status}</h1>
      <p>${q.message}</p>
      <input type="button" value="back" onclick="goBack()"/>
      <script type="text/javascript">
      function goBack() {
        console.log('calls');
        window.history.back();
      };
      </script>`);
      res.end();
  });
}).listen(3030);
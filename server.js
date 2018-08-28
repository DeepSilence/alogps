const http = require('http');
const fs = require('fs');


// Loads the HTML file to be served
fs.readFile('resources/index.html', function (err, html) {
    if (err) {
        throw err;
    }

    this.createServer(html);
});


// Creates the server
const server = http.createServer((req, res) => {
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write(html);
    res.end();
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000);

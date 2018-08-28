const http = require('http');
const fs = require('fs');

const port = process.env.PORT || 8000;

/**
 *  Main class of the server
 */
class Server {

  constructor() {
    this.html = 'Not loaded yet';
    this.loadHtml();
  }

  start(){
    this.createServer();
  }

  // Loads the HTML file to be served
  loadHtml() {
    fs.readFile('resources/index.html', function(err, html) {
      if (err) {
        throw err;
      }

      this.html = html;
    }.bind(this));
  }


  // Creates the server
  createServer(html) {
    const server = http.createServer((req, res) => {
      res.writeHeader(200, {
        "Content-Type": "text/html"
      });
      res.write(this.html);
      res.end();
    });
    server.on('clientError', (err, socket) => {
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    });
    server.listen(port);
  }
}

new Server().start();

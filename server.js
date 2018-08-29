const http = require('http');
const fs = require('fs');

const port = process.env.PORT || 8000;
const api_key = process.env.GOOGLE_API_KEY;

/**
 *  Main class of the server
 */
class Server {

  start() {
    // Creates the server
    const server = http.createServer(this.handleRequest.bind(this));
    server.on('clientError', (err, socket) => {
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    });
    server.listen(port);
  }

  // Loads the resources file to be served
  loadResource(fileName, callback) {
    // minimal security
    fileName = fileName.replace('..', '');
    try {
      // HTML
      fs.readFile(`resources${fileName}`, function(err, file) {
        if (err) {
          callback('Error when loading the resource');
          return;
        }

        // adds the google API key
        file = file.toString().replace('API_KEY', api_key);

        callback(file);
      }.bind(this));
    } catch (error) {
      callback('Error when loading the resource');
    }
  }

  guessContentType(fileName) {
    if (fileName.endsWith('.html')) {
      return 'text/html'
    }
    if (fileName.endsWith('.css')) {
      return 'text/css'
    }
    if (fileName.endsWith('.js')) {
      return 'text/javascript'
    }
  }


  // Handles the incomming requests
  handleRequest(req, res) {
    let fileName = req.url;
    // main page
    if (fileName === '/') {
      fileName = '/index.html';
    }

    this.loadResource(fileName, (data => {
      res.writeHeader(200, {
        "Content-Type": this.guessContentType(fileName)
      });
      res.write(data);
      res.end();
    }).bind(this));
  }
}

new Server().start();

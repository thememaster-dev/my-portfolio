const http = require('http');

const app = require('./app');

const port = process.env.API_PORT || 4000;

console.log('Creating server...');

http.createServer(app).listen(port, () => {
  console.log('Server is up and running on port ', port);
});

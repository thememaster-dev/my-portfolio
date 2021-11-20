const http = require('http');

const app = require('./src/app');

const port = process.env.PORT || 4000;

console.log('Creating server...');

http.createServer(app).listen(port, () => {
  console.log('Server is up and running on port ', port);
});

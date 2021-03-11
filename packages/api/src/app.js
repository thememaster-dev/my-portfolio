const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handle CORS errors
app.use(cors());

// Logger
app.use(morgan('dev'));

function ignoreFavicon(req, res, next) {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end();
  }
  next();
}

app.use(ignoreFavicon);

// Error handling
// General 404 error
app.use('/', (req, res, next) => {
  const error = new Error('Not found.');
  error.status = 404;
  next(error);
});

// All other errors
app.use((error, req, res) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message || 'Unhandled error occured',
      status: error.status || 500,
    },
  });
});

module.exports = app;

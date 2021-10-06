/**
 * Server for CRUD API
 */

'use strict';

const editor = require('./routes/editor.js');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const database = require('./db/database');

const app = express();
const port = process.env.PORT || 1337;

app.use(cors());
app.listen(port, () => console.log(`Editor API listening on port ${port}`));

// Don't show log when it is test
if (process.env.NODE_ENV !== 'test') {
  // use morgan to log at command line
  app.use(morgan('combined')); // 'combined' outputs the apache style logs
}

app.use((req, res, next) => {
  console.info(`Method: ${req.method}`);
  console.info(`Path: ${req.path}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/', editor);

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    'errors': [
      {
        'status': err.status,
        'message': err.message,
      }
    ]
  });
});

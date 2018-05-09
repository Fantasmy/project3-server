'use strict';

// require npm packages

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// require your own modules (router, models)

const index = require('./routes/index');

// connect to db

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/project3', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// -- setup/create the app
const app = express();

// -- middlewares

app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// -- routes

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'not found' });
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).json({ error: 'unexpected' });
  }
});

module.exports = app;

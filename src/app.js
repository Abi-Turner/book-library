const express = require('express');

const readerRouter = require('./routes/readers');

const bookRouter = require('./routes/book');

const app = express();

app.use(express.json());

app.use('/readers', readerRouter);

app.use('/book', bookRouter);

module.exports = app;

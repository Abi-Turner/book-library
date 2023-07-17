const express = require('express');

const readerRouter = require('./routes/readers');

const bookRouter = require('./routes/book');

const authorRouter = require('./routes/author');

const genreRouter = require('./routes/genre');

const app = express();

app.use(express.json());

app.use('/readers', readerRouter);

app.use('/book', bookRouter);

app.use('/author', authorRouter);

app.use('/genre', genreRouter);

module.exports = app;

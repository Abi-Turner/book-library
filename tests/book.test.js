const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('/book', () => {

  let author;
  let genre;

  before(async () => {

    await Book.sequelize.sync({ force: true });

    author = await request(app).post('/authors').send({ author: 'Harper Lee' });
    genre = await request(app).post('/genre').send({ genre: 'Southern Gothic' });
    author = await request(app).post('/authors').send({ author: 'Charles Dickens' });
    genre = await request(app).post('/genre').send({ genre: 'Novel' });    
    author = await request(app).post('/authors').send({ author: 'J.R.R. Tolkien' });
    genre = await request(app).post('/genre').send({ genre: 'Fantasy' });
    
  });

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('POST /book', () => {
      it('creates a new book in the database', async () => {
        const response = await request(app).post('/book').send({
          title: 'To Kill a Mockingbird',
          authorId: author.body.id,
          genreId: genre.body.id,
          ISBN: '12345',
        });

        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal('To Kill a Mockingbird');
        expect(newBookRecord.author).to.equal(author.body.id);
        expect(newBookRecord.genre).to.equal(author.body.id);
        expect(newBookRecord.ISBN).to.equal('12345');
      });

      it('creates an error if there is no title or author', async () => {
        const response = await request(app).post('/book').send({});
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(newBookRecord).to.equal(null);
      });
    });
  });

  describe('with records in the database', () => {
    let books;

    beforeEach(async () => {

      books = await Promise.all([
        Book.create({
          title: 'Great Expectations',
          authorId: 1,
          genreId: 1,
          ISNB: '12345',
        }),
        Book.create({
          title: 'Animal Farm',
          authorId: 2,
          genreId: 2,
          ISBN: '678910',
        }),
        Book.create({
          title: 'The Fellowship of the Ring',
          authorId: 3,
          genreId: 3,
          ISBN: '111213',
        }),
      ]);
    });

    describe('GET /book', () => {
      it('gets all book records', async () => {
        const response = await request(app).get('/book');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((book) => {
          const expected = books.find((a) => a.id === book.id);

          expect(book.title).to.equal(expected.title);
          expect(book.authorId).to.equal(expected.authorId);
          expect(book.genreId).to.equal(expected.genreId);
          expect(book.ISBN).to.equal(expected.ISBN);
        });
      });
    });
    describe('GET /book/:id', () => {
      it('gets book record by id', async () => {
        const book = books[0];
        const response = await request(app).get(`/book/${book.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(book.title);
        expect(response.body.authorId).to.equal(book.authorId);
        expect(response.body.genreId).to.equal(book.genreId);
      });

      it('returns a 404 if the book does not exist', async () => {
        const response = await request(app).get('/book/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.');
      });
    });
    describe('PATCH /book/:id', () => {
      it('updates book record by id', async () => {
        const book = books[0];
        const response = await request(app)
          .patch(`/book/${book.id}`)
          .send({
            title: 'Some other title',
          });
        const updatedBookRecord = await Book.findByPk(book.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedBookRecord.title).to.equal(response.body.title);
      });

      it('returns a 404 if the book does not exist', async () => {
        const response = await request(app)
          .patch('/book/12345')
          .send({ title: 'A better title' });
        
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.');
      });
    });

    describe('DELETE /book/:id', () => {
      it('deletes book record by id', async () => {
        const book = books[0];
        const response = await request(app).delete(`/book/${book.id}`);
        const deletedBook = await Book.findByPk(book.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedBook).to.equal(null);
      });

      it('returns a 404 if the reader does not exist', async () => {
        const response = await request(app).delete('/book/12345');
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.');
      });
    });
  });
});

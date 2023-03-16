const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('/book', () => {
  before(async () => Book.sequelize.sync());

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('POST /book', () => {
      it('creates a new book in the database', async () => {
        const response = await request(app).post('/book').send({
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          genre: 'Southern Gothic',
          ISBN: '12345',
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal('To Kill a Mockingbird');
        expect(newBookRecord.author).to.equal('Harper Lee');
        expect(newBookRecord.genre).to.equal('Southern Gothic');
        expect(newBookRecord.ISBN).to.equal('12345');
      });

      it('creates an error if there is no title', async () => {
        const response = await request(app)
          .post('/book')
          .send({
            author: 'Harper Lee',
            genre: 'Southern Gothic',
            ISBN: '12345',
          });
        const newBookRecord = await Book.findByPk(response.body.id, { raw: true, });

        expect(response.status).to.equal(400);
        expect(newBookRecord).to.equal(null);
      });

      it('creates an error if there is no author', async () => {
        const response = await request(app)
          .post('/book')
          .send({
            title: 'To Kill a Mockingbird',
            genre: 'Southern Gothic',
            ISBN: '12345'
          });
        const newBookRecord = await Book.findByPk(response.body.id, { raw: true, });

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
          author: 'Charles Dickens',
          genre: 'Bildungsroman',
          ISNB: '12345',
        }),
        Book.create({
          title: 'Animal Farm',
          author: 'George Orwell',
          genre: 'Political Satire',
          ISBN: '678910',
        }),
        Book.create({
          title: 'The Fellowship of the Ring',
          author: 'J.R.R. Tolkien',
          genre: 'Fantasy',
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
          expect(book.author).to.equal(expected.author);
          expect(book.genre).to.equal(expected.genre);
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
        expect(response.body.author).to.equal(book.author);
        expect(response.body.genre).to.equal(book.genre);
      });

      it('returns a 404 if the book does not exist', async () => {
        const response = await request(app).get('/book/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.');
      });
    });
    describe('PATCH /book/:id', () => {
      it('updates book title by id', async () => {
        const book = books[0];
        const response = await request(app)
          .patch(`/book/${book.id}`)
          .send({ title: 'Some other title' });
        const updatedBookRecord = await Book.findByPk(book.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedBookRecord.title).to.equal('Some other title');
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

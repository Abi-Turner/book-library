const { expect } = require('chai');
const request = require('supertest');
const { Author } = require('../src/models');
const app = require('../src/app');

describe('/author', () => {
    before(async () => {
        await Author.sequelize.sync({ force: true });
    });

    beforeEach(async () => {
        await Author.destroy({ where: {} });
    });

    describe('with no records in the database', () => {
        describe('POST /author', () => {
            it('creates a new author in the database', async () => {
                const response = await request(app).post('/author').send({ author: 'Charles Dickens', });
                const newAuthorRecord = await Author.findByPk(response.body.id, { raw: true, });

                expect(response.status).to.equal(201);
                expect(response.body.author).to.equal('Charles Dickens');
                expect(newAuthorRecord.author).to.equal('Charles Dickens');

            });

            it('will error if there is no author submitted', async () => {
                const response = await request(app).post('/author').send({});
                const newAuthorRecord = await Author.findByPk(response.body.id, { raw: true, });

                expect(response.status).to.equal(400);
                expect(newAuthorRecord).to.equal(null);

            });
        });
    });

    describe('with records in the database', () => {
        let authors;

        beforeEach(async () => {
            await Author.destroy({ where: {} });

            authors = await Promise.all([
                Author.create({
                    author: 'Charles Dickens',
                }),
                Author.create({
                    author: 'Emily Bronte',
                }),
                Author.create({
                    author: 'J.R.R Tolkien',
                }),
            ]);
        });

        describe('GET /author', () => {
            it('gets all author records', async () => {
                const response = await request(app).get('/author');

                expect(response.status).to.equal(200);
                expect(response.body.length).to.equal(3);

                response.body.forEach((author) => {
                    const expected = authors.find((a) => a.id === author.id);

                    expect(author.author).to.equal(expected.author);
                });
            });
        });

        describe('GET /author/:id', () => {
            it('gets author by id', async () => {
                const author = authors[0];
                const response = await request(app).get(`/author/${author.id}`);

                expect(response.status).to.equal(200);
                expect(response.body.author).to.equal(author.author);
            });

            it('returns a 404 if the author does not exist', async () => {
                const response = await request(app).get('/author/12345');

                expect(response.status).to.equal(404);
                expect(response.body.error).to.equal('The author could not be found.');
            });
        });

        describe('PATCH /author/:id', () => {
            it('updates author by id', async () => {
                const author = authors[0];
                const response = await request(app)
                    .patch(`/author/${author.id}`)
                    .send({ author: 'Anthony Horowitz' });
                const updatedAuthorRecord = await Author.findByPk(author.id, { raw: true, });

                expect(response.status).to.equal(200);
                expect(updatedAuthorRecord.author).to.equal(response.body.author);
            });

            it('returns a 404 if the author does not exist', async () => {
                const response = await request(app)
                    .patch('/author/12345')
                    .send({ author: 'Someone' });
                
                
                expect(response.status).to.equal(404);
                expect(response.body.error).to.equal('The author could not be found.');
            });
        });

        describe('DELETE /author/:id', () => {
            it('deletes a author record', async () => {
                const author = authors[0];
                const response = await request(app).delete(`/author/${author.id}`);
                const deletedAuthor = await Author.findByPk(author.id, { raw: true });

                expect(response.status).to.equal(204);
                expect(deletedAuthor).to.equal(null);
            });
        });
    });
});
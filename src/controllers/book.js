const {
  getAllItems,
  createItem,
  updateItem,
  getItemById,
  deleteItem,
  getAllBooks,
} = require('./helper');

const getBooks = (_, res) => getAllItems(res, 'book');

const createBook = (req, res) => createItem(res, 'book', req.body);

const updateBook = (req, res) => updateItem(res, 'book', req.body, req.params.id);

const getBookById = (req, res) => getItemById(res, 'book', req.params.id);

const deleteBook = (req, res) => deleteItem(res, 'book', req.params.id);

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
 


// exports.createBook = async (req, res) => {
//   try {
//     const { title, author, genre, ISBN } = req.body;
//     const newBook = await Book.create({ title, author, genre, ISBN });
//     res.status(201).json(newBook);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err.message);
//   }
// };

// exports.findBooks = async (req, res) => {
//   try {
//     const books = await Book.findAll();
//     if (books.length === 0) {
//       return res.status(404).send('The books could not be found.');
//     }
//     return res.status(200).json(books);
//   } catch (err) {
//     return res.status(400).json(err.message);
//   }
// };

// exports.findBookById = async (req, res) => {
//   try {
//     const bookId = req.params.id;
//     const book = await Book.findByPk(bookId);

//     if (!book) {
//       res.status(404).json({ error: 'The book could not be found.' });
//     }
//     res.status(200).json(book);
//   } catch (err) {
//     return res.status(400).json(err.message);
//   }
// };

// exports.updateBook = async (req, res) => {
//   try {
//     const bookId = req.params.id;
//     const { title, author, genre, ISBN } = req.body;

//     const [rowsUpdated, [updatedBook]] = await Book.update(
//       {
//         title: title,
//         author: author,
//         genre: genre,
//         ISBN: ISBN,
//       },
//       {
//         returning: true,
//         where: {
//           id: bookId,
//         },
//       }
//     );

//     if (rowsUpdated === 0) {
//       return res.status(404).json({ error: 'The book could not be found.' });
//     }

//     return res.status(200).json(updatedBook);
//   } catch (err) {
//     return res.status(400).json(err.message);
//   }
// };

// exports.destroyBook = async (req, res) => {
//   try {
//     const bookId = req.params.id;
//     const validId = await Book.findByPk(bookId);
//     const deletedRows = await Book.destroy({ where: { id: bookId } });

//     if (!validId) {
//       res.status(404).json({ error: 'The book could not be found.' });
//     }

//     res.status(204).json(deletedRows);
//   } catch (err) {
//     res.status(400).json(err.message);
//   }
// };

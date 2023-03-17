const {
  getAllItems,
  createItem,
  updateItem,
  getItemById,
  deleteItem,

} = require('./helper');

const getReaders = (_, res) => getAllItems(res, 'reader');

const createReader = (req, res) => createItem(res, 'reader', req.body);

const updateReader = (req, res) => updateItem(res, 'reader', req.body, req.params.id);

const getReaderById = (req, res) => getItemById(res, 'reader', req.params.id);

const deleteReader = (req, res) => deleteItem(res, 'reader', req.params.id);

module.exports = {
  getReaders,
  createReader,
  updateReader,
  getReaderById,
  deleteReader,
};

//const { Reader } = require('../models');

// exports.createReader = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const newReader = await Reader.create({ name, email, password });
//     res.status(201).json(newReader);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json(err.message);
//   }
// };

// exports.findReaders = async (req, res) => {
//   try {
//     const readers = await Reader.findAll();
//     if (readers.length === 0) {
//       return res.status(404).send('There are no readers in the database.');
//     }
//     return res.status(200).json(readers);
//   } catch (err) {
//     return res.status(400).json(err.message);
//   }
// };

// exports.findReaderById = async (req, res) => {
//   try {
//     const readerId = req.params.id;
//     const reader = await Reader.findByPk(readerId);

//     if (!reader) {
//       res.status(404).json({ error: 'The reader could not be found.' });
//     }
//     res.status(200).json(reader);
//   } catch (err) {
//     res.status(400).json(err.message);
//   }
// };

// exports.updateReader = async (req, res) => {
//   try {
//     const readerId = req.params.id;
//     const { name, email, password } = req.body;

//     const [rowsUpdated, [updatedReader]] = await Reader.update(
//       {
//         name: name,
//         email: email,
//         password: password,
//       },
//       {
//         returning: true,
//         where: {
//           id: readerId,
//         },
//       }
//     );

//     if (rowsUpdated === 0) {
//       return res.status(404).json({ error: 'The reader could not be found.' });
//     }

//     return res.status(200).json(updatedReader);
//   } catch (err) {
//     res.status(400).json(err.message);
//   }
// };

// exports.destroyReader = async (req, res) => {
//   try {
//     const readerId = req.params.id;
//     const validId = await Reader.findByPk(readerId);
//     const deletedRows = await Reader.destroy({ where: { id: readerId } });

//     if (!validId) {
//       res.status(404).json({ error: 'The reader could not be found.' });
//     }

//     res.status(204).json(deletedRows);
//   } catch (err) {
//     res.status(400).json(err.message);
//   }
// };

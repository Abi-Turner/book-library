const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');

router.post('/', bookController.createBook);

router.get('/', bookController.findBooks);

router.get('/:id', bookController.findBookById);

router.patch('/:id', bookController.updateBook);

router.delete('/:id', bookController.destroyBook);

module.exports = router;

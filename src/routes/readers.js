const express = require('express');
const router = express.Router();
const readerController = require('../controllers/readers');

router.post('/', readerController.createReader);

router.get('/', readerController.getReaders);

router.get('/:id', readerController.getReaderById);

router.patch('/:id', readerController.updateReader);

router.delete('/:id', readerController.deleteReader);

module.exports = router;

const express = require('express');
const router = express.Router();
const readerController = require('../controllers/readers');

router.post('/', readerController.createReader);

router.get('/', readerController.findReaders);

router.get('/:id', readerController.findReaderById);

router.patch('/:id', readerController.updateReader);

router.delete('/:id', readerController.destroyReader);

module.exports = router;

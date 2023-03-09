const express = require('express');
const router = express.Router();
const readerController = require('../controllers/readers');

router.post('/', readerController.create);

module.exports = router;
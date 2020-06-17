const express = require('express');
const router = express.Router();

const { mainController } = require('../controller');

router.get('/older', mainController.older.get);

module.exports = router;

const express = require('express');
const router = express.Router();

const { pointController } = require('../controller');

// * POST /minosPoint
router.post('/', pointController.minosPoint.post);

module.exports = router;

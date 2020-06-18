const express = require('express');
const router = express.Router();

const { mainController } = require('../controller');

router.get('/older', mainController.older.get);

router.get('/randomUsers', mainController.randomUsers.get);

router.get('/recently', mainController.recently.get);

router.get('/hobby', mainController.hobby.get);

router.get('/personality', mainController.personality.get);

router.get('/idealType', mainController.idealType.get);

module.exports = router;

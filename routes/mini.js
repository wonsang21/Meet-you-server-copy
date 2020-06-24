const express = require('express');
const router = express.Router();

const { miniGameController } = require('../controller');

/* GET /mini/getMiniGame */
router.get('/getMiniGame', miniGameController.getMiniGame.get);

/* POST /mini/updateMiniGame */
router.post('/completedMiniGame', miniGameController.completedMiniGame.post);

module.exports = router;

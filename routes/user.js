const express = require('express');
const router = express.Router();

const { userController } = require('../controller');

// * POST /user/signup
router.post('/signup', userController.signup.post);

// * POST /user/login
router.post('/login', userController.login.post);

// * POST /user/logout
router.post('/logout', userController.logout.post);

module.exports = router;

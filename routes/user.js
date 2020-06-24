const express = require('express');
const router = express.Router();

const { userController } = require('../controller');
const { authenticateToken } = require('../controller/authenticate');
const authController = require('../controller/user/auth');

// * POST /user/signup
router.post('/signup', userController.signup.post);

// * POST /user/login
router.post('/login', userController.login.post);

// * POST /user/auth
router.post('/auth', authController.postauth);

// * POST /user/auth/verify
router.post('/auth/verify', authController.postverify);

// * GET /user/information
router.get('/information', authenticateToken, userController.information.get);

// * POST /user/profile
router.post('/profile', userController.profile.post);

// * POST /user/logout
router.post('/logout', userController.logout.post);

// * GET /user/deleteUser
router.get('/deleteUser', userController.deleteUser.get);

module.exports = router;

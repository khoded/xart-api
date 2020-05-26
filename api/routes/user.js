const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const UserController = require('../controllers/user');

// sign up
router.post('/signup', UserController.user_signup);

// sign in
router.post('/login', UserController.user_signin);

// delete user
router.delete('/:userId', checkAuth, UserController.user_delete_user);

module.exports = router;

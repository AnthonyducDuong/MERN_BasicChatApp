const express = require('express');
const {
    getAllUsers,
    googleLogin,
    register,
    login,
} = require('../controllers/user');
const {
    verify
} = require('../middlewares/authMiddleware');
const router = express.Router();

//@route    POST api/user/login
//@desc     login to system
//@asccess  Public
router.post('/login', login);

//@route    POST api/user/google-login
//@desc     login to system with google
//@asccess  Public
router.post('/google-login', googleLogin);

//@route    POST api/user/register
//@desc     create new account & user
//@asccess  Public
router.post('/register', register);


//@route    GET api/user/
//@desc     verify token to get all users
//@asccess  Private
router.route('/').get(verify, getAllUsers);

module.exports = router;
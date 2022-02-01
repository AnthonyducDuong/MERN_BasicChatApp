const express = require('express');
const {
    verifyConfirmEmail,
    refreshToken,
} = require('../controllers/authen');
const router = express.Router();

//@route    GET api/authen/confirmation/:token
//@desc     confirm email to verify token
//@asccess  Public
router.get('/confirmation/:token', verifyConfirmEmail);

//@route    POST api/authen/refresh
//@desc     when accessToken expired but refreshToken not yet --> verify and create new accessToken
//@asccess  Public
router.post('/refresh', refreshToken);

module.exports = router;
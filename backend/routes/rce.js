const express = require('express');
const {
   rce
} = require('../controllers/rce');
const router = express.Router();

//@route    GET api/rce
//@desc     confirm email to verify token
//@asccess  Public
router.get('/', rce);

module.exports = router;
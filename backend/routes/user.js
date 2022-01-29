const express = require('express');
const {
    model
} = require('mongoose');
const {
    register,
    verifyConfirmEmail,
    login,
} = require('../controllers/user');
const router = express.Router();

router.route('/confirmation/:token').get(verifyConfirmEmail);
router.post('/login', login);
router.route('/register').post(register);

module.exports = router;
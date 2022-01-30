const express = require('express');
const {
    model
} = require('mongoose');
const {
    register,
    verifyConfirmEmail,
    login,
    getAllUsers,
} = require('../controllers/user');
const {
    verify
} = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/confirmation/:token', verifyConfirmEmail);
router.post('/login', login);
router.post('/register', register);
router.route('/').get(verify, getAllUsers);


module.exports = router;
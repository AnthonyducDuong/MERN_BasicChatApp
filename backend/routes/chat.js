const express = require('express');
const {
    accessChat,
    createGroupChat,
    fetchDataChat,
} = require('../controllers/chat');
const {
    verify
} = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').post(verify, accessChat);
router.route('/').get(verify, fetchDataChat);
router.route('/group').post(verify, createGroupChat);
// router.route('/rename-group').put(verify, renameGroup);
// router.route('/remove-group').delete(verify, removeFromGroup);
// router.route('/group-add').put(verify, addMemberToGroup);

module.exports = router;
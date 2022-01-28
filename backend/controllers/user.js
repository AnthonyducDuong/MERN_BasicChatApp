const asyncHandler = require('express-async-handler');
const User = require('../models/user.js');

const register = asyncHandler(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        username,
        password,
        picture
    } = req.body;

    if (!firstName || !lastName || !email || !username || !password) {
        res.status(400).json({
            message: 'Some fields invalid',
        });
        throw new Error('Please enter all the fields');
    }

    //check user in system
    const userExisted = await User.findOne({
        email
    });

    if (userExisted) {
        res.status(400).json({
            message: 'User already exists in the system'
        });
    }

    const newUser = await User.create({
        firstName,
        lastName,
        email,
        username,
        password,
        image,
    });

    if (newUser) {
        res.status(201).json({
            ...newUser,
            token: generateToken(newUser._id),
        });
    } else {
        res.status(400).json({
            message: 'Something wrong, can\'t create new user',
        });
        throw new Error('Failed to create new user');
    }
});

module.exports = {
    register
};
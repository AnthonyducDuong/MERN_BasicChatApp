const asyncHandler = require('express-async-handler');
const User = require('../models/user.js');
const token = require('../configs/token.js');
const emailService = require('../services/emailService.js');
const jwt = require('jsonwebtoken');

const getAllUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [{
                firstName: {
                    $regex: req.query.search,
                    $options: 'i'
                }
            },
            {
                lastName: {
                    $regex: req.query.search,
                    $options: 'i'
                }
            },
            {
                username: {
                    $regex: req.query.search,
                    $options: 'i'
                }
            },
            {
                email: {
                    $regex: req.query.search,
                    $options: 'i'
                }
            },
        ]
    } : {};

    const users = await (await User.find(keyword)).find({
        _id: {
            $ne: req.user._id
        }
    });

    res.send(users);
});

const login = asyncHandler(async (req, res) => {
    const {
        username,
        password
    } = req.body;
    const user = await User.findOne({
        username
    });

    if (user && (await user.matchPassword(password))) {
        if (user.isActive) {
            const accessToken = token.generateAccessToken(user);
            const refreshToken = token.generateRefreshToken(user.email);
            // response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
            // response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
            // response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
            // response.headers.add('Access-Control-Allow-Credentials', 'true')
            res.cookie('accessToken', accessToken, {
                httpOnly: true
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true
            });

            res.status(200).json({
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    image: user.image,
                    role: user.role,
                },
                message: 'successfully',
            })
        } else {
            res.status(409).json({
                message: 'Account is not active',
            });
        }
    } else {
        res.status(401).json({
            message: 'Invalid username or password',
        });
    }
});

const register = asyncHandler(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        username,
        password,
        image
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
        emailService.sendConfirmationEmail(newUser)
        res.status(201).json({
            'message': 'successfully'
        });
    } else {
        res.status(400).json({
            message: 'Something wrong, can\'t create new user',
        });
        throw new Error('Failed to create new user');
    }
});

const verifyConfirmEmail = asyncHandler(async (req, res, next) => {
    let confirmToken = req.params.token;
    try {
        let decoded = jwt.verify(confirmToken, process.env.JWT_SECRET);
        let {
            email
        } = decoded;

        const userExisted = await User.findOne({
            email
        });

        if (userExisted) {
            //update user to active account
            userExisted.isActive = true;
            const updateUser = await User.findOneAndUpdate(email, {
                ...userExisted,
                email,
            }, {
                new: true,
            });

            //create accessToken and refreshToken
            const accessToken = token.generateAccessToken(userExisted);
            const refreshToken = token.generateRefreshToken(email);

            res.cookie('accessToken', accessToken, {
                httpOnly: true
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true
            });

            res.redirect('http://localhost:3000/chat');
        } else {
            res.status(401).json({
                message: 'user not existed in system',
            });
        }
    } catch (err) {
        res.status(401).json({
            message: err.message,
        });
    }
});

module.exports = {
    getAllUsers,
    login,
    register,
    verifyConfirmEmail,
};
const asyncHandler = require('express-async-handler');
const User = require('../models/user.js');
const token = require('../configs/token.js');
const jwt = require('jsonwebtoken');


const refreshToken = asyncHandler(async (req, res) => {
    //take the refresh token 
    const refreshToken = req.body.token;

    if (!refreshToken)
        return res.status(401).json({
            message: 'You are not authenticated',
        });

    if (!refreshToken.includes(refreshToken)) {
        return res.status(403).json({
            message: 'Refresh token is not valid!',
        })
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                message: 'Token is not valid',
            });
        }

        const email = decoded.email;
        const user = User.findOne({
            email
        });

        const data = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            image: user.image,
            role: user.role,
        };
        const accessToken = token.generateAccessToken(data);

        res.cookie('accessToken', accessToken, {
            httpOnly: true
        });

        res.status(200).json({
            message: 'Refresh token successfully!',
        });
    })
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

            const data = {
                _id: updateUser._id,
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                email: updateUser.email,
                username: updateUser.username,
                image: updateUser.image,
                role: updateUser.role,
            };

            //create accessToken and refreshToken
            const accessToken = token.generateAccessToken(data);
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
    refreshToken,
    verifyConfirmEmail,
};
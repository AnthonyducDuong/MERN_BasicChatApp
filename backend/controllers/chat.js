const expressAsyncHandler = require("express-async-handler");
const Chat = require('../models/chat.js');
const User = require("../models/user");

const accessChat = expressAsyncHandler(async (req, res) => {
    const {
        userId
    } = req.body;

    if (!userId) {
        return res.status(400).json({
            message: 'Email param not sent with request',
        });
    }

    var isChat = await Chat.find({
            isGroupChat: false,
            $and: [{
                    users: {
                        $elemMatch: {
                            $eq: req.user._id
                        }
                    }
                },
                {
                    users: {
                        $elemMatch: {
                            $eq: userId
                        }
                    }
                },
            ],
        }).populate('users', '-password')
        .populate('lastestMessage');

    isChat = await User.populate(isChat, {
        path: 'lastestMessage.sender',
        select: 'username image email',
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);

            const FullChat = await Chat.findOne({
                    _id: createdChat._id
                })
                .populate(
                    'users',
                    '-password',
                );

            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400).json({
                message: error.message,
            })
        }
    }
});

const createGroupChat = expressAsyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).json({
            message: 'Something is valid',
        });
    }
    console.log(typeof req.body.users);
    // var users = JSON.parse(req.body.users);
    // console.log(users);
    var users = req.body.users.split(',');
    console.log(users);
    console.log(typeof users);

    if (users.length < 2) {
        return res.status(400).json({
            message: 'More than 2 users required',
        });
    }

    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({
                _id: groupChat._id,
            })
            .populate('users', '-password')
            .populate('groupAdmin', '-password');

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
});

const fetchDataChat = expressAsyncHandler(async (req, res) => {
    console.log(req);
    try {
        Chat.find({
                users: {
                    $elemMatch: {
                        $eq: req.user._id
                    }
                }
            })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')
            .populate('lastestMessage')
            .sort({
                updatedAt: -1
            })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: 'lastestMessage.sender',
                    select: 'username image email',
                });

                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
});

module.exports = {
    accessChat,
    createGroupChat,
    fetchDataChat,
};
const mongoose = require('mongoose');
const ROLES = require('../constants/roles.js');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.education-cube.com%2Fblog%2Finsert_comment&psig=AOvVaw3TojtANUeRKrVxvi-NSCye&ust=1643216268390000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOjUmdyvzfUCFQAAAAAdAAAAABAO',
    },
    role: {
        type: String,
        default: ROLES.USER,
    },
    isActive: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

userSchema.methods.matchPassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();


    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const dotenv = require('dotenv');

dotenv.config();

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email');
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (value.length < 5) {
                throw new Error('Password must be at least 5 chars long');
            }
        }
    },
    tokens: [{
        token: {
            type: String
        }
    }]
});

userSchema.methods.toJSON = function () {
    const user = this;
    const userObj = user.toObject();

    delete userObj.password;

    return userObj;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Email or password is incorrect');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Email or password is invalid');
    }

    return user;
}

userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;
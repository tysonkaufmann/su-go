// Boilerplate https://github.com/Intro-to-SE-Spring-2020/Chirpr/blob/master/backend/models/user.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    fullname: {
        type: String,
        required: true
    },
    profilepic: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    totalroutetime: {
        type: String,
        required: true
    },
    totaldistancecomplete: {
        type: Number,
        required: true
    },
    totalroutescomplete: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
});

// methods
userSchema.methods = {}

// Makes the user model.
const User = mongoose.model('User', userSchema);

module.exports = User;

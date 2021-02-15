// Boilerplate https://github.com/Intro-to-SE-Spring-2020/Chirpr/blob/master/backend/models/user.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// User schema with only a username for now.
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

// methods
userSchema.methods = {}

// Makes the user model.
const User = mongoose.model('User', userSchema);

module.exports = User;

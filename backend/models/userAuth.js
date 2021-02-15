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
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

// methods
userSchema.methods = {
  authenticate: function (password) {
    return password === this.password
  },
  changepassword: function (password) {
    this.password = password
  }
}

// Makes the user model.
const UserAuth = mongoose.model('UserAuth', userSchema);

module.exports = UserAuth;

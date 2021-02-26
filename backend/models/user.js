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
  },
  updateInfo: function (userInfo) {
      this.fullname = userInfo.fullname
      this.email = userInfo.email
      this.profilepic = userInfo.profilepic
  }
}

// Makes the user model.
const User = mongoose.model('User', userSchema);

module.exports = User;

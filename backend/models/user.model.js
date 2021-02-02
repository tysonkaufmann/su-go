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
}, {
    timestamps: true,
});
// Makes the user model.
const User = mongoose.model('User', userSchema);

module.exports = User;
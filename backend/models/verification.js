// Boilerplate https://github.com/Intro-to-SE-Spring-2020/Chirpr/blob/master/backend/models/user.js
const mongoose = require('mongoose')

const Schema = mongoose.Schema
// verification schema with only a username for now.
const verificationSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  code: {
    type: String,
    required: true
  },
  expire: { // https://www.albertgao.xyz/2019/02/07/how-to-auto-delete-mongodb-records-after-certain-time-with-mongoose/
    type: Date,
    default: Date.now,
    index: { expires: '5m' }
  }
}, {
  timestamps: true
})

// methods
verificationSchema.methods = {
  verify: function (code) {
    return code === this.code
  }
}

// Makes the Verification model.
const Verification = mongoose.model('Verification', verificationSchema)

module.exports = Verification

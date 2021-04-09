// Boilerplate https://github.com/Intro-to-SE-Spring-2020/Chirpr/blob/master/backend/models/user.js
const mongoose = require('mongoose')

const Schema = mongoose.Schema
// traffic schema with only a username for now.
const trafficSchema = new Schema({
  trafficid: {
    type: String,
    required: true,
    unique: true
  },
  routeid: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  starttime: {
    type: String,
    required: true
  },
  expire: { // https://www.albertgao.xyz/2019/02/07/how-to-auto-delete-mongodb-records-after-certain-time-with-mongoose/
    type: Date,
    default: Date.now,
    index: { expires: '600m' }
  }
}, {
  timestamps: true
})

// Makes the traffic model.
const Traffic = mongoose.model('Traffic', trafficSchema)

module.exports = Traffic

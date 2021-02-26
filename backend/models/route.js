const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  routeid: {
    type: Number,
    required: true,
    unique: true,
  },
  routedescription: {
    type: String,
    required: true
  },
  routetitle: {
    type: String,
    required: true
  },
  routetype: {
    type: String,
    required: true
  },
  routetime: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  routedistance: {
    type: Number,
    required: true
  },
  photos: [String],
  // using GeoJSON Point schema to store mapdata for now
  // will update once finalize details
  mapdata: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number]
    }
  }
}, {
    timestamps: true,
});

// methods
userSchema.methods = {}

// Makes the user model.
const User = mongoose.model('Route', userSchema);

module.exports = User;

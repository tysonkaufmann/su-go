const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const routeSchema = new Schema({
  routeid: {
    type: String,
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
  mapdata: {}
}, {
    timestamps: true,
});

// methods
routeSchema.methods = {}

// Makes the user model.
const Route = mongoose.model('Route', routeSchema);

module.exports = Route;

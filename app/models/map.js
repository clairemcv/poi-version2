'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const mapSchema = Schema({
  lat: Number,
  lng: Number,
});


mapSchema.statics.findByEmail = function(email) {
  return this.findOne({ email : email});
};



module.exports = Mongoose.model('Map', mapSchema);
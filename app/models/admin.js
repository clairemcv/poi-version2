'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const adminSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

adminSchema.statics.findByEmail = function(email) {
  return this.findOne({ email : email});
};

adminSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

server.route({
  method: 'GET',
  path: '/admin',
  config: {
    auth: {
      strategy: 'session',
      scope: 'admin'
    },
    handler: (request, h) => {
      return h.view('admin')
    }
  }
})

module.exports = Mongoose.model('User', userSchema);
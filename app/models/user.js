'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

//public List<Playlist> playlists = new ArrayList<Playlist>(); I need this is javascript poidetail


userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email : email});
};

userSchema.methods.comparePassword = async function(categoryPassword) {
    const isMatch = await bcrypt.compare(categoryPassword, this.password);
    return isMatch;
};

module.exports = Mongoose.model('User', userSchema);
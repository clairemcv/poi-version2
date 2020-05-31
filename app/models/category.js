'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const categorySchema = Schema({
    title: String,
});

module.exports = Mongoose.model('Category', categorySchema);
'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const poiDetailSchema = new Schema({
    name: String,
    location: String,
    description: String,

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category:  {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    map:  {
       type: Schema.Types.ObjectId,
       ref: 'Map',
  },
});

  poiDetailSchema.statics.findByCreator = function(creator) {
        return this.findOne({ creator : creator});
    };
/*
    userSchema.methods.comparePassword = async function(candidatePassword) {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    };
*/




module.exports = Mongoose.model('poi detail', poiDetailSchema);
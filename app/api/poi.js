'use strict';

const PoiDetail = require('../models/poidetail');
const Boom = require('@hapi/boom');
const Category = require('../models/category');
const utils = require('./utils.js');

const Poi = {
  findAll: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const poi = await PoiDetail.find();
      return poi;
    }
  },
  findByCategory: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const poi = await PoiDetail.find({ category: request.params.id });
      return poi;
    }
  },
  makePoiDetail: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      let poiDetail = new PoiDetail(request.payload);
      const category = await Category.findOne({ _id: request.params.id });
      if (!category) {
        return Boom.notFound('No Category with this id');
      }
      poiDetail.category = category._id;
      poiDetail = await poiDetail.save();
      return poiDetail;
    }
  },


  deleteAll: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      await PoiDetail.deleteMany({});
      return { success: true };
    }
  }

};
module.exports = Poi;
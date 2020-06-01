'use strict';

const PoiDetail = require('../models/poidetail');
const Boom = require('@hapi/boom');

const Poi = {
  findAll: {
    auth: false,
    handler: async function(request, h) {
      const poi = await PoiDetail.find();
      return poi;
    }
  },
  findByCategory: {
    auth: false,
    handler: async function(request, h) {
      const poi = await PoiDetail.find({ category: request.params.id });
      return poi;
    }
  },
  makePoiDetail: {
    auth: false,
    handler: async function(request, h) {
      let poiDetail = new poiDetail(request.payload);
      const category = await Category.findOne({ _id: request.params.id });
      if (!category) {
        return Boom.notFound('No Candidate with this id');
      }
      poiDetail.category = category._id;
      poiDetail = await poiDetail.save();
      return poiDetail;
    }
  },


  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      await PoiDetail.deleteMany({});
      return { success: true };
    }
  }

};
module.exports = Poi;
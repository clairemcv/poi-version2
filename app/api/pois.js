'use strict';

const PoiDetail = require('../models/poidetail');

const Pois = {
  find: {
    auth: false,
    handler: async function(request, h) {
      const pois = await PoiDetail.find();
      return pois;
    }
  },
  findOne: {
    auth: false,
    handler: async function(request, h) {
      try {
        const poidetail = await PoiDetail.findOne({ _id: request.params.id });
        if (!poidetail) {
          return Boom.notFound('No Poi with this id');
        }
        return poidetail;
      } catch (err) {
        return Boom.notFound('No Poi with this id');
      }
    }
  },
  create: {
    auth: false,
    handler: async function(request, h) {
      const newPoiDetail = new PoiDetail(request.payload);
      const poiDetail = await newPoiDetail.save();
      if (poiDetail) {
        return h.response(poiDetail).code(201);
      }
      return Boom.badImplementation('error creating poi');
    }
  },
  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      await PoiDetail.remove({});
      return { success: true };
    }
  },
  deleteOne: {
    auth: false,
    handler: async function(request, h) {
      const response = await PoiDetail.deleteOne({ _id: request.params.id });
      if (response.deletedCount == 1) {
        return { success: true };
      }
      return Boom.notFound('id not found');
    }
  }
};


module.exports = Pois;
"use strict";

const accounts = require("./accounts.js");
const PoiDetail = require('../models/poidetail');
const User = require('../models/user');
const Category = require('../models/category');

//const logger = require("../utils/logger");
//const playlistStore = require("../models/playlist-store");
//const uuid = require("uuid");

const Dashboard = {

  index: {
    auth:false,
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id).lean();

        const PoiUser = await PoiDetail.findByEmail(email)
        return h.view('dashboard', { title: 'Your Poi', user: user });
      } catch (err) {
        return h.view('login', { errors: [{ message: err.message }] });
      }
    }
  },


  deleteOne: {
    auth: false,
    handler: async function(request, h) {
      const poiDetail = await PoiDetail.deleteOne({ _id: request.params.id });
      if (poiDetail) {
        return h.redirect('/locations');
      }
      return Boom.notFound('id not found');
    }
  },

  addPoi: {
    handler: async function (request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;

        const rawCategory = request.payload.category;
        const category = await Category.findOne({
          title: rawCategory
        });

        const newPoiDetail = new PoiDetail({
          name: data.name,
          location: data.location,
          description: data.description,
          creator: user._id,
          category: category._id

        });
        await newPoiDetail.save();
        PoiDetail.addPoi(newPoiDetail);
        return h.redirect('/dashboard');
      } catch (err) {
        return h.view('main', {errors: [{message: err.message}]});
      }
    }
  },


};

module.exports = Dashboard;
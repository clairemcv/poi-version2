"use strict";

const Accounts = require("./accounts.js");
const PoiDetail = require('../models/poidetail');
const User = require('../models/user');
const Category = require('../models/category');

const Dashboard = {
  index: {
    auth: false,
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id).lean();
        const poiDetail = await PoiDetail({ _id: request.params.id });
        return h.view('dashboard', { title: 'Your Dashboard', user: user, poiDetail: poiDetail });
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
        return h.redirect('/dashboard'); //was locations
      }
      return Boom.notFound('id not found');
    }
  },


};

module.exports = Dashboard;
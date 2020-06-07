'use strict';


const PoiDetail = require('../models/poidetail');
const User = require('../models/user');
const Category = require('../models/category');
const Map = require('../models/map');
const Accounts = require("./accounts.js");
const Joi = require('@hapi/joi');
const ImageStore = require('../utils/image-store');
const Boom = require('@hapi/boom');


const Poi = {
    home: {
        handler: async function(request, h) {
            const categories = await Category.find().lean();
            return h.view('home', { title: 'Add a POI', categories: categories });
        }
    },
    dashboard: { //was locations
        handler: async function(request, h)  {
            const _id = request.params.id;
            const id = request.auth.credentials.id;
            const user = await User.findById(id).lean();
            const loggedInUser = Accounts.getCurrentUser;
          //  const Userpoi = Accounts.getUserPoi;

            const poiUserDetail = await PoiDetail.findById(_id)
            //const poiDetail = await PoiDetail.deleteOne({ _id: request.params.id })
            //let user = await User.findByEmail(email);
            //const Userpoi = poiDetailSchema.findByCreator({ creator : creator});

            try {
                if (loggedInUser) {
                  const poi = await PoiDetail.find().populate('creator').populate('category').populate('map').lean();
                    return h.view('dashboard', { //was locations
                        title: 'Your Dashboard',
                        poi: poi,
                        poiUserDetail: poiUserDetail,


                    });
                }
            } catch (err) {
                    return h.view('main', {errors: [{message: err.message}]});
                }
            }
        },



    createPoi: {
        handler: async function (request, h) {
            try {
                const id = request.auth.credentials.id;
                const user = await User.findById(id); //this is creator
                const data = request.payload;

                const rawCategory = request.payload.category;
                const category = await Category.findOne({
                    title: rawCategory
                });

                /*const map = await Map.find({
                    lat: Map[0],
                    lng: Map[1]
                });*/

                const newPoiDetail = new PoiDetail({
                    name: data.name,
                    location: data.location,
                    description: data.description,
                    creator: user._id,
                    category: category._id,
                    lat: data.lat,
                    lng: data.lng


                });
                await newPoiDetail.save();
                return h.redirect('/dashboard'); //this was locations
            } catch (err) {
                return h.view('main', {errors: [{message: err.message}]});
            }
        }
    },



    deleteOne: {
        auth: false,
        handler: async function(request, h) {
            const poiDetail = await PoiDetail.deleteOne({ _id: request.params.id });
            if (poiDetail) {
                return h.redirect('/dashboard');
            }
            return Boom.notFound('id not found');
        }
    },

    gallery: {
            handler: async function(request, h) {
                try {
                    const allImages = await ImageStore.getAllImages();
                    return h.view('gallery', {
                        title: 'Gallery',
                        images: allImages
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        },



};




module.exports = Poi;


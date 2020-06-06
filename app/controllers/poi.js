'use strict';


const PoiDetail = require('../models/poidetail');
const User = require('../models/user');
const Category = require('../models/category');
const Map = require('../models/map');
const Accounts = require("./accounts.js");
const Joi = require('@hapi/joi');
const ImageStore = require('../utils/image-store');
const Boom = require('@hapi/boom');
//({ id: user.id })


const Poi = {
    home: {
        handler: async function(request, h) {
            const categories = await Category.find().lean();
            return h.view('home', { title: 'Add a POI', categories: categories });
        }
    },
    dashboard: { //was locations
        handler: async function(request, h)  {
            const _id = request.params.id
            const id = request.auth.credentials.id;
            const user = await User.findById(id).lean();
            const loggedInUser = Accounts.login;
            const poiUser = await PoiDetail({ _id: request.params.id });
            //const poiDetail = poiDetail.findByCreator({ creator : creator});

            
           // const userPoi = user.poiDetail;
            //request.cookieAuth.set({ id: user.id })
            try {
                if (loggedInUser.id || poiUser._id) {
                    const poi = await PoiDetail.find().populate('creator').populate('category').populate('map').lean();
                    return h.view('dashboard', { //was locations
                        title: 'Your Dashboard',
                        poi: poi,

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
                const user = await User.findById(id);
                const data = request.payload;
               // const category = await Category.findById(id);
                //const map = await Map.findById(id);

                const rawCategory = request.payload.category;
                const category = await Category.findOne({
                    title: rawCategory
                });

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


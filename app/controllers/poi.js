'use strict';


const PoiDetail = require('../models/poidetail');
const User = require('../models/user');
const Category = require('../models/category');
//const Joi = require('@hapi/joi');
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
            try {
                const poi = await PoiDetail.find().populate('creator').populate('category').populate('User').lean();
                const id = request.auth.credentials.id; //
                const user = await User.findById(id);//
                return h.view('dashboard', { //was locations
                    title: 'Dashboard to Date',
                    poi: poi,
                    user: user
                });
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },

    createPoi: {
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


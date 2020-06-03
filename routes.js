'use strict';

const Accounts = require('./app/controllers/accounts');
const Dashboard = require("./app/controllers/dashboard.js");
const Poi = require('./app/controllers/poi');
const Gallery = require('./app/controllers/gallery');


module.exports = [
    { method: 'GET', path: '/', config: Accounts.index },
    { method: 'GET', path: '/signup', config: Accounts.showSignup },
    { method: 'GET', path: '/login', config: Accounts.showLogin },
    { method: 'GET', path: '/logout', config: Accounts.logout },
    { method: 'POST', path: '/signup', config: Accounts.signup },
    { method: 'POST', path: '/login', config: Accounts.login },
    { method: 'GET', path: '/settings', config: Accounts.showSettings },
    { method: 'POST', path: '/settings', config: Accounts.updateSettings },

    { method: 'GET', path: '/home', config: Poi.home },
    { method: 'GET', path: '/locations', config: Poi.locations },
    { method: 'GET', path: '/gallery', config: Poi.gallery},
    //{ method: 'GET', path: '/deleteOne/{id}', config: Poi.deleteOne },
   // { method: 'POST', path: '/createPoi', config: Poi.createPoi },

    //{ method: 'GET', path: '/dashboard', config: Dashboard.index },
    { method: 'GET', path: '/deleteOne/{id}', config: Dashboard.deleteOne },
    { method: 'POST', path: '/addPoi', config: Dashboard.addPoi },



    { method: 'POST', path: '/uploadfile', config: Gallery.uploadFile },


        {
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: './public'
                }
            },
            options: { auth: false }
        },




];
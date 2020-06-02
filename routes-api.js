const Categories = require('./app/api/categories');
const Poi = require('./app/api/poi');
const Users = require('./app/api/users');

module.exports = [
  { method: 'GET', path: '/api/categories', config: Categories.find },
  { method: 'GET', path: '/api/categories/{id}', config: Categories.findOne },
  { method: 'POST', path: '/api/categories', config: Categories.create },
  { method: 'DELETE', path: '/api/categories/{id}', config: Categories.deleteOne },
  { method: 'DELETE', path: '/api/categories', config: Categories.deleteAll },

  { method: 'GET', path: '/api/poi', config: Poi.findAll },
  { method: 'GET', path: '/api/categories/{id}/poi', config: Poi.findByCategory },
  { method: 'POST', path: '/api/categories/{id}/poi', config: Poi.makePoiDetail },//makeDonation
  { method: 'DELETE', path: '/api/poi', config: Poi.deleteAll },


  { method: 'GET', path: '/api/users', config: Users.find },
  { method: 'GET', path: '/api/users/{id}', config: Users.findOne },
  { method: 'POST', path: '/api/users', config: Users.create },
  { method: 'DELETE', path: '/api/users/{id}', config: Users.deleteOne },
  { method: 'DELETE', path: '/api/users', config: Users.deleteAll },

  { method: 'POST', path: '/api/users/authenticate', config: Users.authenticate }
];
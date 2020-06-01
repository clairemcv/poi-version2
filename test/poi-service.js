'use strict';

const axios = require('axios');
const baseUrl = 'http://localhost:3000';

class PoiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getPois() {
    const response = await axios.get(this.baseUrl + '/api/pois');
    return response.data;
  }

  async getPoiDetail(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/pois/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createPoiDetail(newPoiDetail) {
    const response = await axios.post(this.baseUrl + '/api/pois', newPoiDetail);
    return response.data;
  }

  async deleteAllPois() {
    const response = await axios.delete(this.baseUrl + '/api/pois');
    return response.data;
  }

  async deleteOnePoiDetail(id) {
    const response = await axios.delete(this.baseUrl + '/api/pois/' + id);
    return response.data;
  }

  async getUsers() {
    const response = await axios.get(this.baseUrl + '/api/users');
    return response.data;
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/user/' + id);
      return response.data;
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createUser(newUser) {
    const response = await axios.post(this.baseUrl + '/api/users', newUser);
    return response.data;
  }
}

module.exports = PoiService;
'use strict';

const axios = require('axios');
//const baseUrl = 'http://localhost:3000';

class PoiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl + '/api/users');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/users/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createUser(newUser) {
    try {
      const response = await axios.post(this.baseUrl + '/api/users', newUser);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllUsers() {
    try {
      const response = await axios.delete(this.baseUrl + '/api/users');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneUser(id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/users/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

 async getCategories() {
  const response = await axios.get(this.baseUrl + '/api/categories');
  return response.data;
}

async getCategory(id) {
  try {
    const response = await axios.get(this.baseUrl + '/api/categories/' + id);
    return response.data;
  } catch (e) {
    return null;
  }
}

async createCategory(newCategory) {
  const response = await axios.post(this.baseUrl + '/api/categories', newCategory);
  return response.data;
}

async deleteAllCategories() {
  const response = await axios.delete(this.baseUrl + '/api/categories');
  return response.data;
}

async deleteOneCategory(id) {
  const response = await axios.delete(this.baseUrl + '/api/categories/' + id);
  return response.data;
}

  async makePoiDetail(id, poiDetail) {
    try {
      const response = await axios.post(this.baseUrl + '/api/categories/' + id + '/poi', poiDetail);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getPoi(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/categories/' + id + '/poi');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllPoi() {
    try {
      const response = await axios.delete(this.baseUrl + '/api/poi');
      return response.data;
    } catch (e) {
      return null;
    }
  }
};

module.exports = PoiService;
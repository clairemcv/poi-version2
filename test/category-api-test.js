'use strict';

const assert = require('chai').assert;
const PoiService = require('./poi-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Category API tests', function () {

  let categories = fixtures.categories;
  let newCategory = fixtures.newCategory;

  const poiService = new PoiService('http://localhost:3000');

  test('create a category', async function () {
    const returnedCategory = await poiService.createCategory(newCategory);
    assert(_.some([returnedCategory], newCategory), 'returnedCategory must be a superset of newCategory');
    assert.isDefined(returnedCategory._id);
  });
});
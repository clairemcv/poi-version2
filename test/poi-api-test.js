'use strict';

const assert = require('chai').assert;
const PoiService = require('./poi-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Poi API tests', function () {
  let poi = fixtures.poi;
  let newCategory = fixtures.newCategory;
  let newUser = fixtures.newUser;

  const poiService = new PoiService(fixtures.poiService);

  suiteSetup(async function() {
    await poiService.deleteAllUsers();
    const returnedUser = await poiService.createUser(newUser);
    const response = await poiService.authenticate(newUser);
  });

  suiteTeardown(async function() {
    await poiService.deleteAllUsers();
    poiService.clearAuth();
  });


  setup(async function() {
    poiService.deleteAllCategories();
    poiService.deleteAllPoi();
  });

  teardown(async function() {});

  test('create a poiDetail', async function() {
    const returnedCategory = await poiService.createCategory(newCategory);
    await poiService.makePoiDetail(returnedCategory._id, poi[0]);
    const returnedPoi = await poiService.getPoi(returnedCategory._id);
    console.log(returnedPoi);
    assert.equal(returnedPoi.length, 1);
    assert(_.some([returnedPoi[0]], poi[0]), 'returned poiDetail must be a superset of poiDetail');
  });

  test('create multiple poi', async function() {
    const returnedCategory = await poiService.createCategory(newCategory);
    for (var i = 0; i < poi.length; i++) {
      await poiService.makePoiDetail(returnedCategory._id, poi[i]);
    }

    const returnedPoi = await poiService.getPoi(returnedCategory._id);
    assert.equal(returnedPoi.length, poi.length);
    for (var i = 0; i < poi.length; i++) {
      assert(_.some([returnedPoi[i]], poi[i]), 'returned poiDetail must be a superset of poiDetail');
    }
  });

  test('delete all poi', async function() {
    const returnedCategory = await poiService.createCategory(newCategory);
    for (var i = 0; i < poi.length; i++) {
      await poiService.makePoiDetail(returnedCategory._id, poi[i]);
    }

    const d1 = await poiService.getPoi(returnedCategory._id);
    assert.equal(d1.length, poi.length);
    await poiService.deleteAllPoi();
    const d2 = await poiService.getPoi(returnedCategory._id);
    assert.equal(d2.length, 0);
  });
});


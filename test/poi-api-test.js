'use strict';

const assert = require('chai').assert;
const PoiService = require('./poi-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Poi API tests', function () {

  let poi = fixtures.poi;
  let newPoiDetail = fixtures.newPoiDetail;

  const poiService = new PoiService(fixtures.poiService);;

  setup(async function() {
    poiService.deleteAllPoiDetail();
    poiService.deleteAllPoi();
  });

  teardown(async function() {});

  test('create a poi', async function() {
    const returnedPoiDetail = await poiService.makePoiDetail(newPoiDetail);
    await poiService.makePoiDetail(returnedPoiDetail._id, poi[0]);
    const returnedPoi = await poiService.getPoi(returnedPoiDetail._id);
    assert.equal(returnedPoi.length, 1);
    assert(_.some([returnedPoi[0]], poi[0]), 'returned poiDetail must be a superset of poiDetail');
  });

});

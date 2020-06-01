'use strict';

const assert = require('chai').assert;
const PoiService = require('./poi-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Poi API tests', function () {

  let pois = fixtures.pois;
  let newPoiDetail = fixtures.newPoiDetail;

  const poiService = new PoiService('http://localhost:3000');

  test('create a poiDetail', async function () {
    const returnedPoiDetail = await poiService.createPoiDetail(newPoiDetail);
    assert(_.some([returnedPoiDetail], newPoiDetail), 'returnedPoiDetail must be a superset of newPoiDetail');
    assert.isDefined(returnedCategory._id);
  });
  test('delete a poiDetail', async function () {
    let c = await poiService.createPoiDetail(newPoiDetail);
    assert(c._id != null);
    await poiService.deleteOnePoiDetail(c._id);
    c = await poiService.getPoiDetail(c._id);
    assert(c == null);
  });

});
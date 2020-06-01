'use strict';

const assert = require('chai').assert;
const PoiService = require('./poi-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Poi API tests', function () {

  let pois = fixtures.pois;
  let newPoiDetail = fixtures.newPoiDetail;

  const poiService = new PoiService('http://localhost:3000');


  setup(async function () {
    await poiService.deleteAllPois();
  });

  teardown(async function () {
    await poiService.deleteAllPois();
  });

  test('create a poi', async function () {
    const returnedPoiDetail = await poiService.createPoiDetail(newPoiDetail);
    assert(_.some([returnedPoiDetail], newPoiDetail), 'returnedCandidate must be a superset of newCandidate');
    assert.isDefined(returnedPoiDetail._id);
  });

  test('get poi', async function () {
    const c1 = await poiService.createPoiDetail(newPoiDetail);
    const c2 = await poiService.getPoiDetail(c1._id);
    assert.deepEqual(c1, c2);
  });

  test('get invalid poi', async function () {
    const c1 = await poiService.getPoiDetail('1234');
    assert.isNull(c1);
    const c2 = await poiService.getPoiDetail('012345678901234567890123');
    assert.isNull(c2);
  });


  test('delete a poi', async function () {
    let c = await poiService.createPoiDetail(newPoiDetail);
    assert(c._id != null);
    await poiService.deleteOnePoiDetail(c._id);
    c = await poiService.getPoiDetail(c._id);
    assert(c == null);
  });

  test('get all pois', async function () { //not working - pois is not iterable
    for (let s of pois) {   //changed from c to s
      await poiService.createPoiDetail(s);
    }

    const allPois= await poiService.getPois();
    assert.equal(allPois.length, pois.length);
  });

  test('get poi detail', async function () { //not working -pois is not iterable
    for (let s of pois) {  //changed from c to s
      await poiService.createPoiDetail(s);
    }

    const allPois = await poiService.getPois();
    for (var i = 0; i < pois.length; i++) {
      assert(_.some([allPois[i]], pois[i]), 'returnedPoiDetail must be a superset of newPoiDetail');
    }
  });

  test('get all pois empty', async function () {
    const allPois = await poiService.getPois();
    assert.equal(allPois.length, 0);
  });

});

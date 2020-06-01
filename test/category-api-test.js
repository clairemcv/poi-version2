'use strict';

const assert = require('chai').assert;
const CategoryService = require('./category-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Category API tests', function () {

  let categories = fixtures.categories;
  let newCategory = fixtures.newCategory;

  const categoryService = new CategoryService('http://localhost:3000');

setup(async function () {
  await categoryService.deleteAllCategories();
});

teardown(async function () {
  await categoryService.deleteAllCategories();
});

test('create a category', async function () {
  const returnedCategory = await categoryService.createCategory(newCategory);
  assert(_.some([returnedCategory], newCategory), 'returnedCategory must be a superset of newCandidate');
  assert.isDefined(returnedCategory._id);
});

test('get category', async function () {
  const c1 = await categoryService.createCategory(newCategory);
  const c2 = await categoryService.getCategory(c1._id);
  assert.deepEqual(c1, c2);
});

test('get invalid category', async function () {
  const c1 = await categoryService.getCategory('1234');
  assert.isNull(c1);
  const c2 = await categoryService.getCategory('012345678901234567890123');
  assert.isNull(c2);
});


test('delete a category', async function () {
  let c = await categoryService.createCategory(newCategory);
  assert(c._id != null);
  await categoryService.deleteOneCategory(c._id);
  c = await categoryService.getCategory(c._id);
  assert(c == null);
});

test('get all categories', async function () {
  for (let c of categories) {
    await categoryService.createCategory(c);
  }

  const allCategories = await categoryService.getCategories();
  assert.equal(allCategories.length, categories.length);
});

test('get categories detail', async function () {
  for (let c of categories) {
    await categoryService.createCategory(c);
  }

  const allCategories = await categoryService.getCategories();
  for (var i = 0; i < categories.length; i++) {
    assert(_.some([allCategories[i]], categories[i]), 'returnedCategory must be a superset of newCategory');
  }
});

test('get all categories empty', async function () {
  const allCategories = await categoryService.getCategories();
  assert.equal(allCategories.length, 0);
});

});
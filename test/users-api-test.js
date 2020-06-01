'use strict';

const assert = require('chai').assert;
const CategoryService = require('./category-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('User API tests', function () {

  let users = fixtures.users;
  let newUser = fixtures.newUser;

  const categoryService = new CategoryService(fixtures.categoryService);

  setup(async function () {
    await categoryService.deleteAllUsers();
  });

  teardown(async function () {
    await categoryService.deleteAllUsers();
  });

  test('create a user', async function () {
    const returnedUser = await categoryService.createUser(newUser);
    assert(_.some([returnedUser], newUser), 'returnedUser must be a superset of newUser');
    assert.isDefined(returnedUser._id);
  });

  test('get user', async function () {
    const u1 = await categoryService.createUser(newUser);
    const u2 = await categoryService.getUser(u1._id);
    assert.deepEqual(u1, u2);
  });

  test('get invalid user', async function () {
    const u1 = await categoryService.getUser('1234');
    assert.isNull(u1);
    const u2 = await categoryService.getUser('012345678901234567890123');
    assert.isNull(u2);
  });


  test('delete a user', async function () {
    let u = await categoryService.createUser(newUser);
    assert(u._id != null);
    await categoryService.deleteOneUser(u._id);
    u = await categoryService.getUser(u._id);
    assert(u == null);
  });

  test('get all users', async function () {
    for (let u of users) {
      await categoryService.createUser(u);
    }

    const allUsers = await categoryService.getUsers();
    assert.equal(allUsers.length, users.length);
  });

  test('get users detail', async function () {
    for (let u of users) {
      await categoryService.createUser(u);
    }

    const allUsers = await categoryService.getUsers();
    for (var i = 0; i < users.length; i++) {
      assert(_.some([allUsers[i]], users[i]), 'returnedUser must be a superset of newUser');
    }
  });

  test('get all users empty', async function () {
    const allUsers = await categoryService.getUsers();
    assert.equal(allUsers.length, 0);
  });

});
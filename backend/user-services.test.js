const myFunctions = require('./user-services.js');
const mongoose = require("mongoose");
const userModel = require("./user");

test('test setup', () => {
    let p = 5;
    expect(p).toBeDefined();
  });
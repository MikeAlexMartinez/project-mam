'use strict';

function importTest(name, path) {
  describe(name, function () {
      require(path);
  });
}

var common = require("./common");

describe("top", function () {
  beforeEach(function () {
     console.log("running something before each test");
  });
  importTest("API Messages", './api/messages');
  after(function () {
      console.log("after all tests");
  });
});
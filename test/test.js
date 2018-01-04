'use strict';

function importTest(name, path) {
  describe(name, function () {
      require(path);
  });
}

require('./common');

describe('Testing...', function () {
  beforeEach(function () {
     console.log('==========');
  });
  importTest('API Messages', './api/messages');
  after(function () {
      console.log('^^^^^^^^^');
  });
});

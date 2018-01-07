'use strict';

function importTest(name, path) {
  describe(name, function () {
      require(path);
  });
}

require('./common');

describe('Testing...', function () {
  
  before(function() {
  
  });
  
  importTest('API Messages', './api/messages');
  
  
  after(function() {
  
  });
});

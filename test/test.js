'use strict';

const refreshDB = require('../scripts/mongodb.init');

process.env.NODE_ENV = 'test';

require('./common');

describe('Testing...', function() {
  
  before(function(done) {
    refreshDB()
    .then(() => {
      done();
    })
    .catch((err) => {
      console.error(err);
    });    
  });
  
  importTest('API Messages', './api/messages');
  
  after(function() {
    process.exit();
  });
  
});

// this function imports tests from other files.
function importTest(name, path) {
  describe(name, function () {
    require(path);
  });
}

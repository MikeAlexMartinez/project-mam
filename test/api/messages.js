'use strict';

const assert = require('chai').assert;
const rp = require('request-promise');

const api = `http://localhost:3030/api/`;


describe("top", function () {
  describe('Messages', function() {
    it('should return json', function(done) {
      
      const rpOptions = {
        method: 'GET',
        uri: `${api}messages`,
        resolveWithFullResponse: true
      };

      rp(rpOptions)
        .then((resp) => {
          
          assert(resp.headers["content-type"],/json/,'content-type should be JSON');

          done();
        })
        .catch((err) => {
          console.error(err);

          done(err);
        });
    });
  });
});
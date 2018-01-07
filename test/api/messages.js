'use strict';

const assert = require('chai').assert;
const rp = require('request-promise');

const logger = require('../../winston');

const api = `http://localhost:3030/api/`;

process.env.NODE_ENV = 'test';

require('../../app');

describe('top', function () {
  describe('Messages.fetchAll', function() {
    it('should return json', function(done) {
      
      const rpOptions = {
        method: 'GET',
        uri: `${api}messages`,
        resolveWithFullResponse: true
      };

      rp(rpOptions)
        .then((resp) => {
          
          assert(resp.headers['content-type'] ,/json/,'content-type should be JSON');

          done();
        })
        .catch((err) => {
          console.error(err);

          done(err);
        });
    });

    it('should fetch all messages', function(done) {
      
      const rpOptions = {
        method: 'GET',
        uri: `${api}messages`,
        json: true,
      };

      rp(rpOptions)
        .then((resp) => {
          
          const data = resp.data;

          assert.equal(resp.type, 'success');
          assert.typeOf(data, 'array');
          assert.lengthOf(data, 5);          

          done();
        })
        .catch((err) => {
          console.error(err);

          done(err);
        });
    });
  
    it('should fetch a filtered item', function(done) {

      const rpOptions = {
        method: 'GET',
        uri: `${api}messages?sender=Sender-1`,
        json: true,
      };

      rp(rpOptions)
        .then((resp) => {
          
          const data = resp.data;
          
          assert.equal(resp.type, 'success');
          assert.typeOf(data, 'array');
          assert.lengthOf(data, 1);
          assert.equal(data[0].sender, 'Sender-1');
          assert.equal(data[0].source, 'deft');

          done();
        })
        .catch((err) => {
          console.error(err);

          done(err);
        });
    });
  }); 
});
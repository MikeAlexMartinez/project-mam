'use strict';

const assert = require('chai').assert;
const rp = require('request-promise');

const encode = require('../../helpers/encode');

const api = `http://localhost:3030/api/`;

require('../../app');

describe('==== MESSAGES ====', function () {
  
  /**
   * FETCHALL expectations
   * 
   * - BASIC
   *    - returns json
   *    - fetch all messages
   * 
   * - FILTERS
   *    - fetch by sender
   *    - fetch by source
   *    - fetch within date range
   *    - sort by descending
   */
  describe('/messages route', function() {
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
  
    describe('should fetch a filtered item', function(done) {
      
      const rpOptions = function(qp) {
        return {
          method: 'GET',
          uri: `${api}messages?${qp}`,
          json: true,
        };
      };

      it('should filter by sender name', function(done) {

        const options = rpOptions('sender=Sender-1');
        
        rp(options)
          .then((resp) => {
            
            const data = resp.data;
            
            assert.equal(resp.type, 'success');
            assert.typeOf(data, 'array');
            assert.lengthOf(data, 1);
            assert.equal(data[0].sender, 'Sender-1');
            assert.equal(data[0].source, 'templates/deft');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
      });

      it('should filter messages by source', function(done) {
        
        const options = rpOptions('source=project-mam');
                
        rp(options)
          .then((resp) => {
            
            const data = resp.data;
            
            assert.equal(resp.type, 'success');
            assert.typeOf(data, 'array');
            assert.lengthOf(data, 3);
            assert.equal(data[0].sender, 'Sender-3');
            assert.equal(data[0].source, 'project-mam');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
      });

      it('should filter messages by date', function(done) {
        
        const qs = `startdate=${new Date(2017,9,1).toISOString()}&` +
                   `enddate=${new Date(2018,10,1).toISOString()}`;

        const options = rpOptions(qs);
        
        rp(options)
          .then((resp) => {
            
            const data = resp.data;
            
            assert.equal(resp.type, 'success');
            assert.typeOf(data, 'array');
            assert.lengthOf(data, 1);
            assert.equal(data[0].sender, 'Sender-4');
            assert.equal(data[0].source, 'project-mam');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });

      });

      it('should filter messages by date and sort in DESC order', function(done) {
        
        const qs = `startdate=${new Date(2014,9,1).toISOString()}&` +
                   `enddate=${new Date(2018,10,1).toISOString()}&` +
                   `sortdirection=-1`;

        const options = rpOptions(qs);
        
        rp(options)
          .then((resp) => {
            
            const data = resp.data;
            
            assert.equal(resp.type, 'success');
            assert.typeOf(data, 'array');
            assert.lengthOf(data, 3);
            assert.equal(data[0].sender, 'Sender-4');
            assert.equal(data[0].source, 'project-mam');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });

      });

    });


  }); 

  /**
   * .fetch expectations
   * 
   * - returns json
   * - fetch single message by id
   */
  describe('/message/:id (GET) route', function() {
    const id = `sender01-3c83-4b4b-9089-69362f729ae7`;
    
    it('should return json', function(done) {
      
      const rpOptions = {
        method: 'GET',
        uri: `${api}message/${id}`,
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

    it('should fetch specified message by ID', function(done) {
      
      findById(id)
        .then((resp) => {
          
          const data = resp.data;

          assert.equal(resp.type, 'success');
          assert.typeOf(data, 'object');
          assert.equal(data.sender, 'Sender-1', 'Expected sender to have value of Sender-1');
          assert.equal(data.subject, 'Hello One', 'Expected sender to have value of \'Hello One\'');

          done();
        })
        .catch((err) => {
          console.error(err);

          done(err);
        });
    });
  });

  /**
   * .submit expectations
   * 
   * creates the new user 
   * - returns json
   * - can fetch newly created user
   */
  describe('/message/:id (POST, PUT, DELETE) routes', function() {
    
    let _id;

    it('should create a new message (POST)', function(done) {
      const message = {
        source: 'test',
        sender: 'test-user',
        email: 'test-email@user.com',
        message: 'Hello from test-user!'
      };

      const options = {
        method: 'POST',
        uri: `${api}message`,
        headers: {
            'content-type': 'application/json'
        },
        json: message
      };

      rp(options)
        .then((resp) => {
          
          const data = resp.data;

          assert.equal(resp.type, 'success');
          assert.equal(resp.message, 'Message item created successfully');
          assert.typeOf(data, 'object');
          assert.equal(data.sender, 'test-user', 'Expected sender to have value of test');
          assert.equal(data.email, 'test-email@user.com', 'Expected sender to have value of \'test-email@user.com\'');
          assert.equal(data._id.length, 36, 'Expected _id to have a length of 36');

          _id = data._id; 

          done();
        })
        .catch((err) => {
          console.error(err);

          done(err);
        });
    });
    
    it('should retrieve the message that I just created', function(done) {
            
      findById(_id)
        .then((resp) => {
          
          const data = resp.data;

          assert.equal(resp.type, 'success');
          assert.typeOf(data, 'object');
          assert.equal(data.sender, 'test-user', 
            'Expected sender to have value of \'test-user\'');
          assert.equal(data.email, 'test-email@user.com', 
            'Expected sender to have value of \'test-email@user.com\'');

          done();
        })
        .catch((err) => {
          console.error(err);

          done(err);
        });
    });

    it('should edit the message that I just created', function(done) {

      const update = {
        important: true,
        validated: true,
        source: 'testing'
      };

      const options = {
        method: 'PUT',
        uri: `${api}message/${_id}`,
        headers: {
            'content-type': 'application/json'
        },
        json: update
      };

      rp(options)
        .then((resp) => {
          
          const data = resp.data;

          assert.equal(resp.type, 'success');
          assert.typeOf(data, 'object');
          assert.equal(data.sender, 'test-user', 
            'Expected sender to have value of \'test-user\'');
          assert.equal(data.important, true, 
            'Expected sender to have value of \'true\'');
          assert.equal(data.validated, true, 
            'Expected sender to have value of \'true\'');
            assert.equal(data.source, 'testing', 
              'Expected sender to have value of \'testing\'');

          done();
        })
        .catch((err) => {
          console.error(err);

          done(err);
        });
    });

    it('should delete the message that I just created', function(done) {

      const options = {
        method: 'DELETE',
        uri: `${api}message/${_id}`,
        json: true
      };

      rp(options)
        .then((resp) => {
          
          const data = resp.data;

          assert.equal(resp.type, 'success');
          assert.typeOf(data, 'object');
          assert.equal(resp.message, 'Message deleted successfully');

          done();
        })
        .catch((err) => {
          console.error(err);

          done(err);
        });
    });
  });
  
  
});


/**
 * @function findById
 * @param {String} _id - The _id of the item being fetched
 * @return {Object} - The document from the database that matches the _id
 */
function findById(_id) {
  return new Promise((res, rej) => {

    const rpOptions = {
      method: 'GET',
      uri: `${api}message/${_id}`,
      json: true,
    };
    
    rp(rpOptions)
    .then((resp) => {
      
      res(resp);
    })
    .catch((err) => {
      console.error(err);
      
      rej(err);
    });
  });

} 
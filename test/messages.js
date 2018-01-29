'use strict';

const assert = require('chai').assert;

const fetchMessages = require('../controllers/fetchMessages').fetchMessages;

describe('==== MESSAGES ====', function () {
  
  /**
   * FETCHALL expectations
   * 
   * - BASIC
   *    - returns array
   *    - fetch first 20 messages
   * 
   * - FILTERS
   *    - fetch by sender
   *    - fetch by source
   *    - fetch within date range
   *    - sort by descending
   *    - fetch by ID
   * 
   *  - Paging
   *    - fetches 5 items from page 1
   *    - fetches 5 items from page 2
   */
  describe('fetchMessages', function() {
    it('should return an array', function(done) {
      
      const query = {};

      fetchMessages(query)
        .then(({messages}) => {

          assert(Array.isArray(messages), true, 'should return an array');

          done();
        })
        .catch((err) => {
          console.error(err);

          done(err);
        });
    });

    it('should fetch first 20 messages', function(done) {
      
      const query = {};
      
      // fetch messages set to limit to 20.
      fetchMessages(query)
        .then(({messages}) => {
          
          assert(messages.length, 20, 'should return 20 messages');

          done();
        })
        .catch((err) => {
          console.error(err);

          done(err);
        });
    });
  
    describe('should fetch filtered items', function() {

      it('should filter by sender name', function(done) {

        const query = {
          startDate: null,
          endDate: null,
          filters: {
            sender: 'Sender-1'
          },
          sortDirection: 1
        };
        
        fetchMessages(query)
          .then(({messages}) => {
            
            assert.typeOf(messages, 'array');
            assert.lengthOf(messages, 3);
            assert.equal(messages[0].sender, 'Sender-1');
            assert.equal(messages[0].source, 'templates/deft');
            assert.equal(messages[1].source, 'project-mam');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
      });

      it('should filter messages by source', function(done) {
        
        const query = {
          filters: {
            source: 'templates/minifolio'
          },
          sortDirection: 1
        };
        
        fetchMessages(query)
          .then(({messages}) => {
            
            assert.typeOf(messages, 'array');
            assert.lengthOf(messages, 5);
            assert.equal(messages[0].sender, 'Sender-2');
            assert.equal(messages[0].source, 'templates/minifolio');
            assert.equal(messages[1].sender, 'Sender-12');
            assert.equal(messages[1].subject, 'Hello Twelve');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
      });

      it('should filter messages by date in ASC order', function(done) {
        
        const query = {
          startDate: new Date(2018,1,27).toISOString(),
          endDate: new Date(2018,1,30).toISOString(),
          sortDirection: 1
        };
        
        fetchMessages(query)
          .then(({messages}) => {
            
            assert.typeOf(messages, 'array');
            assert.lengthOf(messages, 2);
            assert.equal(messages[0].sender, 'Sender-7');
            assert.equal(messages[0].source, 'templates/minifolio');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });

      });

      it('should filter messages by date and sort in DESC order', function(done) {
        
        const query = {
          startDate: new Date(2018,1,27).toISOString(),
          endDate: new Date(2018,1,30).toISOString()
        };
        
        fetchMessages(query)
          .then(({messages}) => {
            
            assert.typeOf(messages, 'array');
            assert.lengthOf(messages, 2);
            assert.equal(messages[1].sender, 'Sender-7');
            assert.equal(messages[1].source, 'templates/minifolio');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
      });
      
      it('should find a message by id', (done) => {
  
        const query = {
          filters: {
            _id: 'sender03-3c83-4b4b-9089-69362f729ae7'
          }
        };
  
        fetchMessages(query)
          .then(({messages}) => {
            
            assert.typeOf(messages, 'array');
            assert.lengthOf(messages, 1);
            assert.equal(messages[0].sender, 'Sender-3');
            assert.equal(messages[0].email, 'test3@mail.com');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
  
      });
    });

    describe("Should create page specific data properly", () => {

      it('should return first 5 items (limit: 5, page: 1)', (done) => {

        const query = {
          limit: 5,
          page: 1,
        };
  
        fetchMessages(query)
          .then(({messages}) => {
            
            assert.typeOf(messages, 'array');
            assert.lengthOf(messages, 5);
            assert.equal(messages[0].sender, 'Sender-5');
            assert.equal(messages[0].email, 'test5@mail.com');
            assert.equal(messages[4].sender, 'Sender-6');
            assert.equal(messages[4].email, 'test6@mail.com');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
      });

      it('should return next 5 items (limit: 5, page: 2)', (done) => {
        
        const query = {
          limit: 5,
          page: 2,
        };
  
        fetchMessages(query)
          .then(({messages}) => {
            
            assert.typeOf(messages, 'array');
            assert.lengthOf(messages, 5);
            assert.equal(messages[0].sender, 'Sender-7');
            assert.equal(messages[0].email, 'test7@mail.com');
            assert.equal(messages[4].sender, 'Sender-1');
            assert.equal(messages[4].email, 'test1@mail.com');
            assert.equal(messages[4].subject, 'Hello One again');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
      });

    });
  }); 
});
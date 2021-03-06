'use strict';

const assert = require('chai').assert;

const { fetchMessages, countMessages } = require('../controllers/messages');

describe('==== MESSAGES ====', function () {
  
  /**
   * fetchMessage expectations
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
   * 
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
            assert.equal(messages[0].source, 'project-mam');
            
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
            assert.equal(messages[0].sender, 'Sender-12');
            assert.equal(messages[0].source, 'templates/minifolio');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
      });

      it('should filter messages by date in ASC order', function(done) {
        
        const query = {
          startDate: new Date(2018,0,27).toISOString(),
          endDate: new Date(2018,0,30).toISOString(),
          sortDirection: 1
        };
        
        fetchMessages(query)
          .then(({messages}) => {
            
            assert.typeOf(messages, 'array');
            assert.lengthOf(messages, 3);
            assert.equal(messages[0].sender, 'Sender-3');
            assert.equal(messages[0].source, 'project-mam');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });

      });

      it('should filter messages by date and sort in DESC order', function(done) {
        
        const query = {
          startDate: new Date(2018,0,27).toISOString(),
          endDate: new Date(2018,0,30).toISOString()
        };
        
        fetchMessages(query)
          .then(({messages}) => {
            
            assert.typeOf(messages, 'array');
            assert.lengthOf(messages, 3);
            assert.equal(messages[2].sender, 'Sender-3');
            assert.equal(messages[2].source, 'project-mam');
            
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

    describe('Should create page specific data properly', () => {

      it('should return first 5 items (limit: 5, page: 1)', (done) => {

        const query = {
          limit: 5,
          page: 1,
        };
  
        fetchMessages(query)
          .then(({messages}) => {
            
            assert.typeOf(messages, 'array');
            assert.lengthOf(messages, 5);
            assert.equal(messages[0].sender, 'Sender-1');
            assert.equal(messages[0].email, 'test1@mail.com');
            assert.equal(messages[4].sender, 'Sender-7');
            assert.equal(messages[4].email, 'test7@mail.com');
            
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
            assert.equal(messages[0].sender, 'Sender-9');
            assert.equal(messages[0].email, 'test9@mail.com');
            assert.equal(messages[4].sender, 'Sender-4');
            assert.equal(messages[4].email, 'test4@mail.com');
            
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
   * countMessage expectations
   * 
   * - Can count all messages
   * - Can cont messages that meet specific criteria
   * - Can count messages that fall within a specific date range
   */

  describe('countMessages', () => {

    it('should return count of total messages', (done) => {

      countMessages({})
        .then(({count}) => {
          assert.equal(count, 22, 'should count 22 messages in the DB');

          done();
        })
        .catch(err => {
          console.error(err);

          done(err);
        });
        
    }); 

    it('should return count of total unread messages', (done) => {
      
      const query = {
        read: false
      };

      countMessages(query)
        .then(({count}) => {
          assert.equal(count, 19, 'should find 19 unread messages in the DB');

          done();
        })
        .catch(err => {
          console.error(err);

          done(err);
        });
        
    });

    it('should return count of total messages within data range', (done) => {
      
      const query = {
        startDate: new Date(2017,11,1),
        endDate: new Date(2017,12,1),
      };

      countMessages(query)
        .then(({count}) => {
          assert.equal(count, 6, 'should find 6 messages within the date range');

          done();
        })
        .catch(err => {
          console.error(err);

          done(err);
        });
        
    });

  });
});
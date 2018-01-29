'use strict';

const assert = require('chai').assert;

const { fetchSubscribers, countSubscribers } = require('../controllers/subscribers');

describe('==== SUBSCRIBERS ====', function () {
  
  /**
   * fetchSubscribers expectations
   * 
   * - BASIC
   *    - returns array
   *    - fetch all subscribers (limit of 20)
   * 
   * - FILTERS
   *    - fetch by email
   *    - fetch by source
   *    - fetch within date range
   *    - sort by descending
   *    - fetch by ID
   * 
   *  - PAGING
   *    - fetches 5 items from page 1
   *    - fetches 5 items from page 2
   *    - fetch 1 from page 3
   */
  describe('fetchSubscribers', function() {
    it('should return an array', function(done) {
      
      const query = {};

      fetchSubscribers(query)
        .then(({subscribers}) => {

          assert(Array.isArray(subscribers), true, 'should return an array');

          done();
        })
        .catch((err) => {
          console.error(err);

          done(err);
        });
    });

    it('should fetch first 11 subscribers', function(done) {
      
      const query = {};
      
      // fetch subscribers set to limit to 10.
      fetchSubscribers(query)
        .then(({subscribers}) => {
          
          assert(subscribers.length, 11, 'should return 11 subscribers');

          done();
        })
        .catch((err) => {
          console.error(err);

          done(err);
        });
    });
  
    describe('should fetch filtered items', function() {

      it('should filter by email', function(done) {

        const query = {
          filters: {
            email: 'test9@mail.com'
          }
        };
        
        fetchSubscribers(query)
          .then(({subscribers}) => {
            
            assert.typeOf(subscribers, 'array');
            assert.lengthOf(subscribers, 1);
            assert.equal(subscribers[0].source, 'templates/deft');
            assert.equal(subscribers[0]._id, 'subscri09-3c83-4b4b-9089-69362f729ae7');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
      });

      it('should filter subscribers by active and validated status', function(done) {
        
        const query = {
          filters: {
            active: true,
            validated: true
          }
        };
        
        fetchSubscribers(query)
          .then(({subscribers}) => {

            assert.typeOf(subscribers, 'array');
            assert.lengthOf(subscribers, 2);
            assert.equal(subscribers[0].email, 'test2@mail.com');
            assert.equal(subscribers[0]._id, 'subscri02-3c83-4b4b-9089-69362f729ae7');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
      });

      it('should filter subscribers by date in ASC order', function(done) {
        
        const query = {
          startDate: new Date(2018,0,28).toISOString(),
          endDate: new Date(2018,0,30).toISOString(),
          sortDirection: 1
        };
        
        fetchSubscribers(query)
          .then(({subscribers}) => {
            
            assert.typeOf(subscribers, 'array');
            assert.lengthOf(subscribers, 2);
            assert.equal(subscribers[0].email, 'test3@mail.com');
            assert.equal(subscribers[1].email, 'test2@mail.com');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });

      });

      it('should filter subscribers by date and sort in DESC order', function(done) {
        
        const query = {
          startDate: new Date(2018,0,28).toISOString(),
          endDate: new Date(2018,0,30).toISOString()
        };
        
        fetchSubscribers(query)
          .then(({subscribers}) => {
            
            assert.typeOf(subscribers, 'array');
            assert.lengthOf(subscribers, 2);
            assert.equal(subscribers[0].email, 'test2@mail.com');
            assert.equal(subscribers[1].email, 'test3@mail.com');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
      });
      
      it('should find a Project by id', (done) => {
  
        const query = {
          filters: {
            _id: 'subscri04-3c83-4b4b-9089-69362f729ae7'
          }
        };
  
        fetchSubscribers(query)
          .then(({subscribers}) => {
            
            assert.typeOf(subscribers, 'array');
            assert.lengthOf(subscribers, 1);
            assert.equal(subscribers[0].email, 'test4@mail.com');
            
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
  
        fetchSubscribers(query)
          .then(({subscribers}) => {
            
            assert.typeOf(subscribers, 'array');
            assert.lengthOf(subscribers, 5);
            assert.equal(subscribers[0].email, 'test1@mail.com');
            assert.equal(subscribers[4].email, 'test5@mail.com');
            
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
  
        fetchSubscribers(query)
          .then(({subscribers}) => {
            
            assert.typeOf(subscribers, 'array');
            assert.lengthOf(subscribers, 5);
            assert.equal(subscribers[0].email, 'test6@mail.com');
            assert.equal(subscribers[4].email, 'test10@mail.com');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
      });

      it('should return next 5 items (limit: 5, page: 3)', (done) => {
        
        const query = {
          limit: 5,
          page: 3,
        };
  
        fetchSubscribers(query)
          .then(({subscribers}) => {
            
            assert.typeOf(subscribers, 'array');
            assert.lengthOf(subscribers, 1);
            assert.equal(subscribers[0].email, 'test11@mail.com');
            
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
   * countSubscribers expectations
   * 
   * - Can count all subscribers
   * - Can cont subscribers that meet specific criteria
   * - Can count subscribers that fall within a specific date range
   */

  describe('countSubscribers', () => {

    it('should return count of total subscribers', (done) => {

      countSubscribers({})
        .then(({count}) => {
          assert.equal(count, 11, 'should count 11 subscribers in the DB');

          done();
        })
        .catch(err => {
          console.error(err);

          done(err);
        });
        
    }); 

    it('should return count of total active subscribers', (done) => {
      
      const query = {
        active: true
      };

      countSubscribers(query)
        .then(({count}) => {
          assert.equal(count, 10, 'should find 10 unread subscribers in the DB');

          done();
        })
        .catch(err => {
          console.error(err);

          done(err);
        });
        
    });

    it('should return count of total subscribers within date range', (done) => {
      
      const query = {
        startDate: new Date(2018,0,28),
        endDate: new Date(2018,0,30),
      };

      countSubscribers(query)
        .then(({count}) => {
          assert.equal(count, 2, 'should find 2 subscribers within the date range');

          done();
        })
        .catch(err => {
          console.error(err);

          done(err);
        });
        
    });

  });
});
'use strict';

const assert = require('chai').assert;

const { fetchBugs, countBugs } = require('../controllers/bugs');

describe('==== BUGS ====', function () {
  
  /**
   * fetchBugs expectations
   * 
   * - BASIC
   *    - returns array
   *    - fetch all Bugs (limit of 20)
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
   *    - fetch 1 from page 3
   */
  describe('fetchBugs', function() {
    it('should return an array', function(done) {
      
      const query = {};

      fetchBugs(query)
        .then(({bugs}) => {

          assert(Array.isArray(bugs), true, 'should return an array');

          done();
        })
        .catch((err) => {
          console.error(err);

          done(err);
        });
    });

    it('should fetch first 11 bugs', function(done) {
      
      const query = {};
      
      // fetch bugs set to limit to 20.
      fetchBugs(query)
        .then(({bugs}) => {
          
          assert(bugs.length, 11, 'should return 11 bugs');

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
            sender: 'Bugger-1'
          },
          sortDirection: 1
        };
        
        fetchBugs(query)
          .then(({bugs}) => {
            
            assert.typeOf(bugs, 'array');
            assert.lengthOf(bugs, 2);
            assert.equal(bugs[0].sender, 'Bugger-1');
            assert.equal(bugs[0].source, 'project-mam');
            assert.equal(bugs[1].source, 'templates/deft');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
      });

      it('should filter bugs by source', function(done) {
        
        const query = {
          filters: {
            source: 'project-mam'
          },
          sortDirection: 1
        };
        
        fetchBugs(query)
          .then(({bugs}) => {

            assert.typeOf(bugs, 'array');
            assert.lengthOf(bugs, 8);
            assert.equal(bugs[0].sender, 'Bugger-1');
            assert.equal(bugs[0].source, 'project-mam');
            assert.equal(bugs[1].sender, 'Bugger-10');
            assert.equal(bugs[1].source, 'project-mam');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
      });

      it('should filter bugs by date in ASC order', function(done) {
        
        const query = {
          startDate: new Date(2018,1,27).toISOString(),
          endDate: new Date(2018,1,30).toISOString(),
          sortDirection: 1
        };
        
        fetchBugs(query)
          .then(({bugs}) => {
            
            assert.typeOf(bugs, 'array');
            assert.lengthOf(bugs, 3);
            assert.equal(bugs[0].sender, 'Bugger-3');
            assert.equal(bugs[0].source, 'templates/resume');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });

      });

      it('should filter bugs by date and sort in DESC order', function(done) {
        
        const query = {
          startDate: new Date(2018,1,27).toISOString(),
          endDate: new Date(2018,1,30).toISOString()
        };
        
        fetchBugs(query)
          .then(({bugs}) => {
            
            assert.typeOf(bugs, 'array');
            assert.lengthOf(bugs, 3);
            assert.equal(bugs[0].sender, 'Bugger-1');
            assert.equal(bugs[0].source, 'templates/deft');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
      });
      
      it('should find a Bug by id', (done) => {
  
        const query = {
          filters: {
            _id: 'bugger05-3c83-4b4b-9089-69362f729ae7'
          }
        };
  
        fetchBugs(query)
          .then(({bugs}) => {
            
            assert.typeOf(bugs, 'array');
            assert.lengthOf(bugs, 1);
            assert.equal(bugs[0].sender, 'Bugger-5');
            assert.equal(bugs[0].email, 'test5@mail.com');
            
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
  
        fetchBugs(query)
          .then(({bugs}) => {
            
            assert.typeOf(bugs, 'array');
            assert.lengthOf(bugs, 5);
            assert.equal(bugs[0].sender, 'Bugger-1');
            assert.equal(bugs[0].email, 'test1@mail.com');
            assert.equal(bugs[4].sender, 'Bugger-5');
            assert.equal(bugs[4].email, 'test5@mail.com');
            
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
  
        fetchBugs(query)
          .then(({bugs}) => {
            
            assert.typeOf(bugs, 'array');
            assert.lengthOf(bugs, 5);
            assert.equal(bugs[0].sender, 'Bugger-6');
            assert.equal(bugs[0].email, 'test6@mail.com');
            assert.equal(bugs[4].sender, 'Bugger-10');
            assert.equal(bugs[4].email, 'test10@mail.com');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
      });

      it('should return final item from last page (limit: 5, page: 3)', (done) => {
        
        const query = {
          limit: 5,
          page: 3,
        };
  
        fetchBugs(query)
          .then(({bugs}) => {
            
            assert.typeOf(bugs, 'array');
            assert.lengthOf(bugs, 1);
            assert.equal(bugs[0].sender, 'Bugger-1');
            assert.equal(bugs[0].email, 'test1@mail.com');
            
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
   * - Can count all bugs
   * - Can cont bugs that meet specific criteria
   * - Can count bugs that fall within a specific date range
   */

  describe('countBugs', () => {

    it('should return count of total bugs', (done) => {

      countBugs({})
        .then(({count}) => {
          assert.equal(count, 11, 'should count 11 bugs in the DB');

          done();
        })
        .catch(err => {
          console.error(err);

          done(err);
        });
        
    }); 

    it('should return count of total unread bugs', (done) => {
      
      const query = {
        read: false
      };

      countBugs(query)
        .then(({count}) => {
          assert.equal(count, 8, 'should find 8 unread bugs in the DB');

          done();
        })
        .catch(err => {
          console.error(err);

          done(err);
        });
        
    });

    it('should return count of total bugs within date range', (done) => {
      
      const query = {
        startDate: new Date(2018,1,19),
        endDate: new Date(2018,1,21),
      };

      countBugs(query)
        .then(({count}) => {
          assert.equal(count, 2, 'should find 2 bugs within the date range');

          done();
        })
        .catch(err => {
          console.error(err);

          done(err);
        });
        
    });

  });
});
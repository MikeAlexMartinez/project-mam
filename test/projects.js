'use strict';

const assert = require('chai').assert;

const { fetchProjects, countProjects } = require('../controllers/projects');

describe('==== PROJECTS ====', function () {
  
  /**
   * fetchProjects expectations
   * 
   * - BASIC
   *    - returns array
   *    - fetch all projects (limit of 20)
   * 
   * - FILTERS
   *    - fetch by sender
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
  describe('fetchProjects', function() {
    it('should return an array', function(done) {
      
      const query = {};

      fetchProjects(query)
        .then(({projects}) => {

          assert(Array.isArray(projects), true, 'should return an array');

          done();
        })
        .catch((err) => {
          console.error(err);

          done(err);
        });
    });

    it('should fetch first 6 projects', function(done) {
      
      const query = {};
      
      // fetch projects set to limit to 10.
      fetchProjects(query)
        .then(({projects}) => {
          
          assert(projects.length, 6, 'should return 6 projects');

          done();
        })
        .catch((err) => {
          console.error(err);

          done(err);
        });
    });
  
    describe('should fetch filtered items', function() {

      it('should filter by title', function(done) {

        const query = {
          filters: {
            title: 'Minifolio'
          }
        };
        
        fetchProjects(query)
          .then(({projects}) => {
            
            assert.typeOf(projects, 'array');
            assert.lengthOf(projects, 1);
            assert.equal(projects[0].title, 'Minifolio');
            assert.equal(projects[0]._id, 'minifo36-3d7a-40f4-8f06-ae03cc22f045');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
      });

      it('should filter projects by tags', function(done) {
        
        const query = {
          tags: { '$all': ['chartjs', 'Javascript']},
          sortDirection: 1
        };
        
        fetchProjects(query)
          .then(({projects}) => {

            assert.typeOf(projects, 'array');
            assert.lengthOf(projects, 2);
            assert.equal(projects[1].title, 'Fake');
            assert.equal(projects[1]._id, 'fakeme36-3d7a-40f4-8f06-ae03cc22f045');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
      });

      it('should filter projects by date in ASC order', function(done) {
        
        const query = {
          startDate: new Date(2017,11,30).toISOString(),
          endDate: new Date(2017,12,10).toISOString(),
          sortDirection: 1
        };
        
        fetchProjects(query)
          .then(({projects}) => {
            
            assert.typeOf(projects, 'array');
            assert.lengthOf(projects, 2);
            assert.equal(projects[0].title, 'Resume');
            assert.equal(projects[1].title, 'Minifolio');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });

      });

      it('should filter projects by date and sort in DESC order', function(done) {
        
        const query = {
          startDate: new Date(2017,11,30).toISOString(),
          endDate: new Date(2017,12,10).toISOString(),
        };
        
        fetchProjects(query)
          .then(({projects}) => {
            
            assert.typeOf(projects, 'array');
            assert.lengthOf(projects, 2);
            assert.equal(projects[0].title, 'Minifolio');
            assert.equal(projects[1].title, 'Resume');
            
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
            _id: 'ranger36-3d7a-40f4-8f06-ae03cc22f045'
          }
        };
  
        fetchProjects(query)
          .then(({projects}) => {
            
            assert.typeOf(projects, 'array');
            assert.lengthOf(projects, 1);
            assert.equal(projects[0].title, 'Ranger');
            
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
  
        fetchProjects(query)
          .then(({projects}) => {
            
            assert.typeOf(projects, 'array');
            assert.lengthOf(projects, 5);
            assert.equal(projects[0].title, 'Fake');
            assert.equal(projects[4].title, 'Minifolio');
            
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
  
        fetchProjects(query)
          .then(({projects}) => {
            
            assert.typeOf(projects, 'array');
            assert.lengthOf(projects, 1);
            assert.equal(projects[0].title, 'Resume');
            
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
   * countProjects expectations
   * 
   * - Can count all projects
   * - Can cont projects that meet specific criteria
   * - Can count projects that fall within a specific date range
   */

  describe('countProjects', () => {

    it('should return count of total projects', (done) => {

      countProjects({})
        .then(({count}) => {
          assert.equal(count, 6, 'should count 6 projects in the DB');

          done();
        })
        .catch(err => {
          console.error(err);

          done(err);
        });
        
    }); 

    it('should return count of total public projects', (done) => {
      
      const query = {
        public: true
      };

      countProjects(query)
        .then(({count}) => {
          assert.equal(count, 5, 'should find 5 unread projects in the DB');

          done();
        })
        .catch(err => {
          console.error(err);

          done(err);
        });
        
    });

    it('should return count of total projects within date range', (done) => {
      
      const query = {
        startDate: new Date(2018,1,28),
        endDate: new Date(2018,1,30),
      };

      countProjects(query)
        .then(({count}) => {
          assert.equal(count, 1, 'should find 1 projects within the date range');

          done();
        })
        .catch(err => {
          console.error(err);

          done(err);
        });
        
    });

  });
});
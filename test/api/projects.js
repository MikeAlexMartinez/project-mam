'use strict';

const assert = require('chai').assert;
const rp = require('request-promise');

const api = `http://localhost:3030/api/`;

require('../../app');

const plural = 'projects';
const singular = 'project';

describe('==== PROJECTS ====', function () {
  
  /**
   * FETCHALL expectations
   * 
   * - BASIC
   *    - returns json
   *    - fetch all messages
   * 
   * - FILTERS
   *    - fetch by title
   *    - fetch by type
   *    - fetch by type and subtype
   *    - fetch by tag
   *    - fetch by tags (multiple)
   *    - fetch within date range
   *    - sort by descending
   */
  describe(`/${plural} route`, function() {
    it('should return json', function(done) {
      
      const rpOptions = {
        method: 'GET',
        uri: `${api}${plural}`,
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

    it(`should fetch all ${plural}`, function(done) {
      
      const rpOptions = {
        method: 'GET',
        uri: `${api}${plural}`,
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
          uri: `${api}${plural}?${qp}`,
          json: true,
        };
      };

      it('should filter by project title', function(done) {

        const options = rpOptions('title=Minifolio');
        
        rp(options)
          .then((resp) => {
            
            const data = resp.data;
            
            assert.equal(resp.type, 'success');
            assert.typeOf(data, 'array');
            assert.lengthOf(data, 1);
            assert.equal(data[0].title, 'Minifolio');
            assert.equal(data[0].type, 'Templates');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
      });

      it('should filter projects by type', function(done) {
        
        const options = rpOptions('type=FreeCodeCamp');
                
        rp(options)
          .then((resp) => {
            
            const data = resp.data;
            
            assert.equal(resp.type, 'success');
            assert.typeOf(data, 'array');
            assert.lengthOf(data, 1);
            assert.equal(data[0].title, 'Project MaM');
            assert.equal(data[0].type, 'FreeCodeCamp');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
      });
      
      it('should filter projects by subtype', function(done) {
        
        const options = rpOptions('subtype=clone');
        
        rp(options)
        .then((resp) => {
          
          const data = resp.data;
          
          assert.equal(resp.type, 'success');
          assert.typeOf(data, 'array');
          assert.lengthOf(data, 1);
          assert.equal(data[0].title, 'Resume');
          assert.equal(data[0].type, 'P1xt');
          assert.equal(data[0].subtype, 'clone');
          
          done();
        })
        .catch((err) => {
          console.error(err);
          
          done(err);
        });
      });

      it('should filter projects by a tag', function(done) {
        
        const options = rpOptions('tags=chartjs');
                
        rp(options)
          .then((resp) => {
            
            const data = resp.data;
            
            assert.equal(resp.type, 'success');
            assert.typeOf(data, 'array');
            assert.lengthOf(data, 1);
            assert.equal(data[0].title, 'Resume');
            assert.equal(data[0].type, 'P1xt');
            assert.equal(data[0].subtype, 'clone');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
      });

      it('should filter projects by a tag(s) multiple', function(done) {
        
        const options = rpOptions('tags=Node,Puppeteer');
                
        rp(options)
          .then((resp) => {
            
            const data = resp.data;
            
            assert.equal(resp.type, 'success');
            assert.typeOf(data, 'array');
            assert.lengthOf(data, 3);
            assert.equal(data[0].title, 'Minifolio');
            assert.equal(data[0].type, 'Templates');
            assert.equal(data[0].subtype, null);
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });
      });

      it('should filter messages by date', function(done) {
        
        const qs = `startdate=${new Date(2017,12,14).toISOString()}&` +
                   `enddate=${new Date(2017,12,22).toISOString()}`;

        const options = rpOptions(qs);
        
        rp(options)
          .then((resp) => {
            
            const data = resp.data;
            
            assert.equal(resp.type, 'success');
            assert.typeOf(data, 'array');
            assert.lengthOf(data, 2);
            assert.equal(data[0].title, 'Ranger');
            assert.equal(data[0].type, 'Templates');
            
            done();
          })
          .catch((err) => {
            console.error(err);
            
            done(err);
          });

      });

      it('should filter messages by date and sort in DESC order', function(done) {
        
        const qs = `startdate=${new Date(2017,12,14).toISOString()}&` +
                   `enddate=${new Date(2017,12,22).toISOString()}&` +
                   `sortdirection=-1`;

        const options = rpOptions(qs);
        
        rp(options)
          .then((resp) => {
            
            const data = resp.data;
            
            assert.equal(resp.type, 'success');
            assert.typeOf(data, 'array');
            assert.lengthOf(data, 2);
            assert.equal(data[0].title, 'Deft');
            assert.equal(data[0].type, 'Templates');
            
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
    const id = `ai1cca36-3d7a-40f4-8f06-ae03cc22f045`;
    
    it('should return json', function(done) {
      
      const rpOptions = {
        method: 'GET',
        uri: `${api}${singular}/${id}`,
        resolveWithFullResponse: true,
        json: true
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
          assert.equal(data.title, 'Project MaM', 'Expected title to have value of \'Project MaM\'');
          assert.equal(data.type, 'FreeCodeCamp', 'Expected type to have value of \'FreeCodeCamp\'');

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
  describe(`/${singular}/:id (POST, PUT, DELETE) routes`, function() {
    
    let _id;

    const project = {
      title: 'test',
      link: 'http://www.link.com/',
      miniDetail: 'This is a test',
      git: 'https://github.com/test',
      type: 'test'
    };

    it(`should create a new ${singular} (POST)`, function(done) {

      const options = {
        method: 'POST',
        uri: `${api}${singular}`,
        headers: {
            'content-type': 'application/json'
        },
        json: project
      };

      rp(options)
        .then((resp) => {
          
          const data = resp.data;

          assert.equal(resp.type, 'success');
          assert.equal(resp.message, `Project item created successfully`);
          assert.typeOf(data, 'object');
          assert.equal(data.title, project.title, `Expected title to have value of ${project.title}`);
          assert.equal(data.link, project.link, `Expected link to have value of \'${project.link}\'`);
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
          assert.equal(data.title, project.title, `Expected title to have value of ${project.title}`);
          assert.equal(data.link, project.link, `Expected link to have value of \'${project.link}\'`);
          assert.equal(data._id.length, 36, 'Expected _id to have a length of 36');

          done();
        })
        .catch((err) => {
          console.error(err);

          done(err);
        });
    });

    it(`should edit the ${singular} that I just created`, function(done) {

      const update = {
        favourite: true,
        public: true,
        subtype: 'Project/Test'
      };

      const options = {
        method: 'PUT',
        uri: `${api + singular}/${_id}`,
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
          assert.equal(data.favourite, update.favourite, `Expected title to have value of ${update.favourite}`);
          assert.equal(data.public, update.public, `Expected link to have value of \'${update.public}\'`);
          assert.equal(data.subtype, update.subtype, `Expected subtype to have a value of \'${update.subtype}\'`);

          done();
        })
        .catch((err) => {
          console.error(err);

          done(err);
        });
    });

    it(`should delete the ${singular} that I just created`, function(done) {

      const options = {
        method: 'DELETE',
        uri: `${api + singular}/${_id}`,
        json: true
      };

      rp(options)
        .then((resp) => {
          
          const data = resp.data;

          assert.equal(resp.type, 'success');
          assert.typeOf(data, 'object');
          assert.equal(resp.message, `Project deleted successfully`);

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
      uri: `${api}${singular}/${_id}`,
      json: true
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
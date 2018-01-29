'use strict';

const assert = require('chai').assert;

const dashboard = require('../controllers/dashboard').dashboard;

describe('==== DASHBOARD ====', () => {

  let dashboardData;

  before((done) => {
    dashboard()
      .then((data) => {
        dashboardData = data;

        done();
      })
      .catch((err) => {
        console.error(err);
        process.exit();
      });
  });

  describe('-> Bug Data ->', () => {

    it('should return the number of open bugs in the database', (done) => {
      
      const {bugs} = dashboardData;
      
      assert.equal(bugs.open, 3, 
        'There should be 3 open bugs retrieved from the database'
      );

      done();
    });

  });
});
'use strict';

const assert = require('chai').assert;
const moment = require('moment');

const { match, lastWeek } = require('../helpers/dates');

describe('==== DATES ====', () => {

  describe('match()', () => {

    it('should identify two dates that are the same', () => {
      const dateA = new Date;
      const dateB = new Date;

      assert.equal(match(dateA, dateB), true, 'should match two dates that are the same');
    });

    it('should identify two dates that are the same day but with different times', () => {
      const dateA = new Date('December 31, 1975, 11:15:30 GMT+11:00');
      const dateB = new Date('December 31, 1975, 12:15:30 GMT+11:00');

      assert.equal(match(dateA, dateB), true, 'should match two dates that are the same');
    });

    it('should identify two dates that aren\'t the same', () => {
      const dateA = new Date(2017, 10, 1);
      const dateB = new Date(2017, 9, 1);

      assert.equal(match(dateA, dateB), false, 'Expected false');
    });

  });

  describe('lastWeek()', () => {

    it('should create 7 day date range from midnight tonight to midnight 6 days ago', (done) => {

      const sevenDays = lastWeek(moment('2018-01-29','YYYY-MM-DD'));

      assert.equal(sevenDays.startDate, '2018-01-23T00:00:00Z', 'date strings should match');
      assert.equal(sevenDays.endDate, '2018-01-30T00:00:00Z', 'date strings should match');
    
      done();
    });

    it('should create 7 day date range from midnight tonight to midnight 6 days ago', (done) => {
      
      const newWeek = lastWeek(moment('2018-01-01','YYYY-MM-DD'));
      
      assert.equal(newWeek.startDate, '2017-12-26T00:00:00Z', 'date strings should match');
      assert.equal(newWeek.endDate, '2018-01-02T00:00:00Z', 'date strings should match');
    
      done();
    });

  });
});
'use strict';

const assert = require('chai').assert;

const dates = require('../helpers/dates');

describe('DATES module', () => {

  describe('match()', () => {

    it('should identify two dates that are the same', () => {
      const dateA = new Date;
      const dateB = new Date;

      assert.equal(dates.match(dateA, dateB), true, 'should match two dates that are the same');
    });

    it('should identify two dates that are the same day but with different times', () => {
      const dateA = new Date('December 31, 1975, 11:15:30 GMT+11:00');
      const dateB = new Date('December 31, 1975, 12:15:30 GMT+11:00');

      assert.equal(dates.match(dateA, dateB), true, 'should match two dates that are the same');
    });

    it('should identify two dates that aren\'t the same', () => {
      const dateA = new Date(2017, 10, 1);
      const dateB = new Date(2017, 9, 1);

      assert.equal(dates.match(dateA, dateB), false, 'Expected false');
    });

  });
});
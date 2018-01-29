'use strict';

const moment = require('moment');

const prependZero = (val) => val.toString().length < 2 ? `0${val}` : val;

exports.tsFormat = () => (new Date()).toISOString();

exports.fileDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${prependZero(date.getMonth()+1)}-`;
};

/**
 * takes two dates and matches if day, month and year are the same
 * @param {Date} dateA 
 * @param {Date} dateB
 * @return {Boolean} 
 */
exports.match = (dateA, dateB) => {
  if (dateA.getUTCDate() !== dateB.getUTCDate() ||
      dateA.getUTCMonth() !== dateB.getUTCMonth() ||
      dateA.getUTCFullYear() !== dateB.getUTCFullYear()) {
    return false;
  } else {
    return true;
  }
};

/**
 * Returns object with startDate and endDate that encompasses
 * last 7 days including today
 * @param {Date} [target] - the current date from which to calculate 7 days
 * @return {{startDate: String, endDate: String}}
 */
exports.lastWeek = (target=moment()) => {
  
  const endDate = target.add(1, 'days').utc().format();
  const startDate = target.add(-7, 'days').utc().format();

  console.log(startDate);
  console.log(endDate);

  return {
    startDate: startDate,
    endDate: endDate,
  };
};
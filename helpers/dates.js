'use strict';

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
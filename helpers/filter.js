'use strict';

/**
 * takes a string value and returns a 
 * mongodb prepared array filter 
 * @function
 * @param {String} s - string in the form 'item,item,...'
 * @return {Array} - returns an array
 */
module.exports.createArray = (s) => {
  const arr = s.split(',');
  return {
    $all: arr
  };
};
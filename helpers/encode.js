'use strict';

/**
 *  encode formdata to be sent in POST request
 *  @function formData
 *  @param {Object} data - takes object that represents form data to encode
 *  @return {String} - represents url encoded form data
 */
module.exports.formData = function(data) {
  let formBody = [];
  for (var property in data) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
};
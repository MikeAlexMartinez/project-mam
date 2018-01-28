'use strict';

const v = require('validator');

/**
 * takes an email address and returns an object
 * @param {String} email - the email address being verified
 * @return {Object.{}}
 */
module.exports.cleanseEmail = function(email) {
  if ( typeof email !== 'string' || !(v.isEmail(email)) ) {
    return '';
  }

  return v.normalizeEmail(email);

}

module.exports.cleanString = function(message) {

  if (typeof message !== 'string' || !message) return '';

  return v.rtrim(v.ltrim(v.escape(message)));
}

module.exports.messageLength = function(message) {
  return message.length < 601 && message.length >= 1;
}
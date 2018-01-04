'use strict';

const prependZero = (val) => val.toString().length < 2 ? `0${val}` : val;

exports.tsFormat = () => (new Date()).toISOString();

exports.fileDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${prependZero(date.getMonth()+1)}-`;
};
